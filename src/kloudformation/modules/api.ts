import {Authorizer} from "../../aws/apigateway/Authorizer";
import {BasePathMapping} from "../../aws/apigateway/BasePathMapping";
import {Deployment} from "../../aws/apigateway/Deployment";
import {Method} from "../../aws/apigateway/Method";
import {Resource} from "../../aws/apigateway/Resource";
import {RestApi} from "../../aws/apigateway/RestApi";
import {Permission} from "../../aws/lambda/Permission";
import {AWS} from "../aws";
import {join, joinWith, Value} from "../Value";


export class Path {
  
  constructor(
    private readonly aws: AWS,
    public api: Api,
    public resources: Resource[],
    public parent?: Path,
    public methods: Method[] = [],
    public optionsMethod?: Method,
    public paths: Path[] = []
  ) {}
  
  route(): string {
    const parentPath = this.parent ? (this.parent.route() + '/') : ''
    return parentPath + this.resources.map(it => it.pathPart).join('/')
  }
  
  path(path: string): Path {
    const resources = Path.resources(this.aws, this.api, path, this.resources[this.resources.length - 1]);
    const p = new Path(this.aws, this.api, resources, this).options();
    this.paths.push(p);
    return p;
  }
  
  private longPath(parts: string[], info: PathInfo): Path {
    if(parts.length === 0) {
      (info.methods ?? []).forEach(method => this.method(method).options());
      if(info.paths) {
        Object.keys(info.paths).map(path => this.paths.push(Path.longPath(this.aws, this.api, path, info.paths![path], this)));
      }
      if(info.options && info.methods && info.methods.length > 0) {
        const {origin, headers, credentials} = info.options
        this.options(origin, headers, credentials)
      }
      return this;
    } else {
      const nextPart = Path.longPath(this.aws, this.api, '/' + parts.join('/'), info, this);
      this.paths.push(nextPart);
      return nextPart;
    }
  }
  
  private pathLogicalNames(): string {
    const resources = this.resources.map(it => it.pathPart.toString().startsWith('{') ? (it.pathPart.toString().substring(1, it.pathPart.toString().length-1) + 'Var') : it.pathPart.toString()).join('');
    return (this.parent?.pathLogicalNames() ?? '') + resources;
  }
  
  private logicalName(): string {
    return this.api.name.replace(/[^\w]+/g, '') + this.pathLogicalNames();
  }
  
  method(method: string): Path {
    const apiMethod = this.aws.apigatewayMethod({
      _logicalName: this.aws.logicalName(`Method${this.logicalName()}${method}`),
      httpMethod: method,
      resourceId: this.resources[this.resources.length - 1],
      restApiId: this.api.restApi,
      apiKeyRequired: false,
      ...(this.api.authorizer ? { authorizationType: 'COGNITO_USER_POOLS', authorizerId: this.api.authorizer}: { authorizationType: 'NONE' }),
      ...(this.api.lambdaArn ? { integration: {
          integrationHttpMethod: 'POST',
          type: 'AWS_PROXY',
          uri: joinWith(':', 'arn', {Ref: 'AWS::Partition'}, 'apigateway', {Ref: 'AWS::Region'},
            join('lambda:path/2015-03-31/functions/', this.api.lambdaArn, '/invocations')
          ),
        } } : {}),
      methodResponses: [],
      requestParameters: {}
    });
    this.methods.push(apiMethod);
    this.api.deployment._dependsOn = [...(this.api.deployment._dependsOn ?? []), apiMethod]
    return this;
  }
  
  options(origin: string = '*', headers: string[] = [], credentials: boolean = true): Path {
      const corsOrigin = 'method.response.header.Access-Control-Allow-Origin'
      const corsHeaders = 'method.response.header.Access-Control-Allow-Headers'
      const corsMethods = 'method.response.header.Access-Control-Allow-Methods'
      const corsCredentials = 'method.response.header.Access-Control-Allow-Credentials'
      const methods = this.methods.map(it => it.httpMethod).join();
      if (this.optionsMethod) {
        this.optionsMethod.integration!.integrationResponses![0].responseParameters = {
          _nocaps: '',
          [corsOrigin]: `'${origin}'`,
          [corsHeaders]: `'${headers.join() || '*'}'`,
          [corsMethods]: `'${methods}'`,
          [corsCredentials]: `'${credentials}'`
        }
      } else {
        this.optionsMethod = this.aws.apigatewayMethod({
          _logicalName: this.aws.logicalName(`Method${this.logicalName()}Options`),
          httpMethod: 'OPTIONS',
          resourceId: this.resources[this.resources.length - 1],
          restApiId: this.api.restApi,
          authorizationType: 'NONE',
          methodResponses: [{
            statusCode: '200',
            responseModels: {},
            responseParameters: {
              _nocaps: '',
              [corsOrigin]: true,
              [corsHeaders]: true,
              [corsMethods]: true,
              [corsCredentials]: true
            }
          }],
          requestParameters: {},
          integration: {
            type: 'MOCK',
            requestTemplates: {
              _nocaps: '',
              'application/json': '{statusCode:200}'
            },
            contentHandling: 'CONVERT_TO_TEXT',
            integrationResponses: [
              {
                statusCode: '200',
                responseParameters: {
                  _nocaps: '',
                  [corsOrigin]: `'${origin}'`,
                  [corsHeaders]: `'${headers.join() || '*'}'`,
                  [corsMethods]: `'${methods}'`,
                  [corsCredentials]: `'${credentials}'`
                },
                responseTemplates: {
                  _nocaps: '',
                  'application/json': '#set($origin = $input.params("Origin"))\n#if($origin == "") #set($origin = $input.params("origin")) #end\n#if($origin == "*") #set($context.responseOverride.header.Access-Control-Allow-Origin = $origin) #end'
                }
              }
            ]
          }
        })
      }
    return this;
  }
  
  private static resources(aws: AWS, api: Api, path: string, parent: Value<string>, parentLogicalName?: string): Resource[] {
    const parts = path.startsWith('/') ? path.substring(1).split('/') : path.split('/');
    let previous = parent;
    let pathName = '';
    const resources: Resource[] = [];
    for(const part of parts) {
      pathName += part.startsWith('{') ? (part.substring(1, part.length-1) + 'Var') : part;
      const resource = aws.apigatewayResource({
        parentId: previous,
        restApiId: api.restApi,
        pathPart: part,
        _logicalName: aws.logicalName(`Api${api.name.replace(/[^\w]+/g, '')}${parentLogicalName ?? ''}${pathName}`)
      });
      resources.push(resource);
      previous = resource
    }
    return resources;
  }
  
  static longPath(aws: AWS, api: Api, path: string, info: PathInfo, parent?: Path): Path {
    const parentLogicalName = parent?.pathLogicalNames();
    const newPathResources = Path.resources(aws, api, path, parent?.resources?.[parent.resources.length-1] ?? api.restApi.attributes.RootResourceId, parentLogicalName)
    const infoOptions = info?.options
    const newPath = new Path(aws, api, newPathResources, parent)
    .options(infoOptions?.origin ?? '*', infoOptions?.headers ?? [], infoOptions?.credentials ?? true)
    .longPath([], info);
    newPath.parent = parent;
    return newPath;
  }
  
  static resource(aws: AWS, api: Api, path: string): Path {
    const resources = Path.resources(aws, api, path, api.restApi.attributes.RootResourceId);
    return new Path(aws, api, resources).options()
  }
}

export interface ApiDefinition {
  resources: Array<{path: string, method: string}>;
}

export interface PathInfo { 
  paths?: { [key: string]: PathInfo }, 
  methods?: string[], 
  options?: { origin: string, headers: string[], credentials: boolean }
}

export class Api{
  
  constructor(
    private readonly aws: AWS,
    public readonly name: string,
    public restApi: RestApi,
    public deployment: Deployment,
    public authorizer?: Authorizer,
    public lambdaArn?: Value<string>,
    public lambdaPermission?: Permission,
    public basePathMapping?: BasePathMapping,
    private paths: Path[] = []
  ) {}
  
  pathMethodsFrom(path: Path): Array<{path: string, method: string}> {
    const mainRoutes = path.methods.map(method => ({path: path.route(), method: method.httpMethod.toString()}));
    const subRoutes = path.paths.flatMap(this.pathMethodsFrom.bind(this));
    return [...mainRoutes, ...subRoutes] as Array<{path: string, method: string}>;
  }
  
  definition(): ApiDefinition {
    return { resources: this.paths.flatMap(this.pathMethodsFrom.bind(this)) };
  }
  
  /**
   * @param path Can include variables in { } like a/b/{c}
   */
  path(path: string): Path {
    const p = Path.resource(this.aws, this, path);
    this.paths.push(p);
    return p;
  }
  
  mapTo(basePath: Value<string>, domainName: Value<string>): this {
    this.basePathMapping = this.aws.apigatewayBasePathMapping({
      _dependsOn: [this.deployment],
      restApiId: this.restApi,
      stage: this.deployment.stageName,
      basePath,
      domainName
    });
    return this;
  }
  
  apiFrom(pathInfo: { [key: string]: PathInfo }): this {
    this.paths = Object.keys(pathInfo).map(path => Path.longPath(this.aws, this, path, pathInfo[path]));
    return this;
  }
  
  static create(aws: AWS, name: string, stage: string, providerArns?: Value<string>[], lambdaArn?: Value<string>): Api {
    const restApi = aws.apigatewayRestApi({ name });
    const authorizer = providerArns && providerArns.length > 0 ? aws.apigatewayAuthorizer({
      authorizerResultTtlInSeconds: 300,
      providerARNs: providerArns,
      identitySource: 'method.request.header.Authorization',
      type: 'COGNITO_USER_POOLS',
      restApiId: restApi,
      name: `api-auth-${name}`
    }) : undefined;
    const permission = lambdaArn ? aws.lambdaPermission({
      action: 'lambda:InvokeFunction',
      functionName: lambdaArn!,
      principal: joinWith('.', 'apigateway', {Ref: 'AWS::URLSuffix'}),
      sourceArn: joinWith(':', 'arn', {Ref: 'AWS::Partition'}, 'execute-api', {Ref: 'AWS::Region'}, {Ref: 'AWS::AccountId'}, join(restApi, '/*/*'))
    }): undefined;
    const deployment = aws.apigatewayDeployment({
      restApiId: restApi,
      _logicalName: aws.logicalName('ApiDeployment' + Math.floor(Math.random() * 100000000)),
      stageName: stage
    })
    return new Api(aws, name, restApi, deployment, authorizer, lambdaArn, permission);
  }
}
