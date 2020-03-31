import { Value } from '../../kloudformation/Value';
import { HttpConfigProps } from './datasource/HttpConfigProps';
import { RelationalDatabaseConfigProps } from './datasource/RelationalDatabaseConfigProps';
import { LambdaConfigProps } from './datasource/LambdaConfigProps';
import { DynamoDBConfigProps } from './datasource/DynamoDBConfigProps';
import { ElasticsearchConfigProps } from './datasource/ElasticsearchConfigProps';
import { KloudResource } from '../../kloudformation/KloudResource';
import { Attribute } from '../../kloudformation/Attribute';

export type DataSourceAttributes = { DataSourceArn: Attribute<string>; Name: Attribute<string> }
export function dataSource(dataSourceProps: DataSource): DataSource & { attributes: DataSourceAttributes } { return ({ ...dataSourceProps, _logicalType: 'AWS::AppSync::DataSource', attributes: { DataSourceArn: 'DataSourceArn', Name: 'Name' } }) }

export interface DataSource extends KloudResource {
    type: Value<string>;
    apiId: Value<string>;
    name: Value<string>;
    description?: Value<string>;
    serviceRoleArn?: Value<string>;
    httpConfig?: HttpConfigProps;
    relationalDatabaseConfig?: RelationalDatabaseConfigProps;
    lambdaConfig?: LambdaConfigProps;
    dynamoDBConfig?: DynamoDBConfigProps;
    elasticsearchConfig?: ElasticsearchConfigProps;
}