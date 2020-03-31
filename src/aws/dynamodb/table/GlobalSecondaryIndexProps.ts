import { Value } from '../../../kloudformation/Value';
import { KeySchemaProps } from './KeySchemaProps';
import { ProjectionProps } from './ProjectionProps';
import { ProvisionedThroughputProps } from '../../cassandra/table/ProvisionedThroughputProps';

export function globalSecondaryIndexProps(globalSecondaryIndexPropsProps: GlobalSecondaryIndexProps): GlobalSecondaryIndexProps { return (globalSecondaryIndexPropsProps) }

export interface GlobalSecondaryIndexProps {
    indexName: Value<string>;
    keySchema: KeySchemaProps[];
    projection: ProjectionProps;
    provisionedThroughput?: ProvisionedThroughputProps;
}