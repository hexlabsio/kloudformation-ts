import {Role} from "../../aws/iam/Role";
import {Function as LambdaFunction} from "../../aws/lambda/Function";
import {CodeProps} from "../../aws/lambda/function/CodeProps";
import {Permission} from "../../aws/lambda/Permission";
import {Subscription} from "../../aws/sns/Subscription";
import {AWS} from "../aws";
import {iamPolicy} from "../iam/PolicyDocument";
import {normalize} from "../kloudformation";
import {join, joinWith, Value} from "../Value";

export class Lambda {
  role: Role;
  lambda: LambdaFunction;
  permissions: Permission[];
  subscriptions: Subscription[];
  name: string;
  
  constructor(private readonly aws: AWS, name: string, role: Role, lambda: LambdaFunction) {
    this.aws = aws;
    this.name = name;
    this.role = role;
    this.lambda = lambda;
    this.permissions = [];
    this.subscriptions = [];
  }
  
  grantInvoke(toArn: Value<string>, principal: Value<string>, sourceAccount?: Value<string>): Lambda{
    this.permissions.push(Lambda.grantInvoke(this.aws, this.lambda.attributes.Arn, toArn, principal, sourceAccount));
    return this;
  }
  
  static grantInvoke(aws: AWS, lambdaName: Value<string>,  toArn: Value<string>, principal: Value<string>, sourceAccount?: Value<string>): Permission {
    return aws.lambdaPermission({
      action: 'lambda:InvokeFunction',
      functionName: lambdaName,
      principal,
      sourceArn: toArn,
      sourceAccount
    });
  }
  
  snsTrigger(topicArn: Value<string>, sourceAccount?: Value<string>): Lambda {
    const [permission, subscription] = Lambda.snsTrigger(this.aws, this.lambda.attributes.Arn, topicArn, sourceAccount);
    permission._logicalName = `${this.aws.logicalName(this.lambda._logicalName + 'Permission')}`;
    subscription._logicalName = `${this.aws.logicalName(this.lambda._logicalName + 'Subscription')}`;
    this.permissions.push(permission);
    this.subscriptions.push(subscription);
    return this;
  }
  
  private static snsTrigger(aws: AWS, lambdaArn: Value<string>, topicArn: Value<string>, sourceAccount?: Value<string>): [Permission, Subscription] {
    const permission = Lambda.grantInvoke(aws, lambdaArn, topicArn, 'sns.amazonaws.com', sourceAccount);
    const subscription = aws.snsSubscription({
      protocol: 'lambda',
      topicArn: topicArn,
      endpoint: lambdaArn
    });
    return [permission, subscription];
  }
  
  static create(aws: AWS, name: string, code: CodeProps, handler: Value<string>, runtime: LambdaFunction['runtime'], extra?: Partial<LambdaFunction>): Lambda {
    const normalName = normalize(name);
    const role = aws.iamRole({
      _logicalName: `${normalName}Role`,
      path: '/',
      assumeRolePolicyDocument: iamPolicy({
        statement: [{action: 'sts:AssumeRole', effect: 'Allow', principal: { Service: ['lambda.amazonaws.com'] }}],
        version: '2012-10-17',
      }),
      policies: [{
        policyName: 'LogAccess',
        policyDocument: iamPolicy({
          version: '2012-10-17',
          statement: [
            {action: 'logs:CreateLogGroup', effect: 'Allow', resource: [joinWith(':', 'arn', {Ref: 'AWS::Partition'}, 'logs', {Ref: 'AWS::Region'}, {Ref: 'AWS::AccountId'}, '*')]},
            {action: ['logs:CreateLogStream', 'logs:PutLogEvents'], effect: 'Allow', resource: [joinWith(':', 'arn', {Ref: 'AWS::Partition'}, 'logs', {Ref: 'AWS::Region'}, {Ref: 'AWS::AccountId'}, 'log-group', join('/aws/lambda/', name, ':*'))]}
          ],
        })
      }]
    });
    const lambda = aws.lambdaFunction({ _logicalName: `${normalName}Function`, ...extra, code, handler, role: role.attributes.Arn, runtime, functionName: name,  });
    return new Lambda(aws, normalName, role, lambda);
  }
}
