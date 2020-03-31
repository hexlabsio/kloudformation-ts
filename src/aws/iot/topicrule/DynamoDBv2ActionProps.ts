import { PutItemInputProps } from './PutItemInputProps';
import { Value } from '../../../kloudformation/Value';

export function dynamoDBv2ActionProps(dynamoDBv2ActionPropsProps: DynamoDBv2ActionProps): DynamoDBv2ActionProps { return (dynamoDBv2ActionPropsProps) }

export interface DynamoDBv2ActionProps {
    putItem?: PutItemInputProps;
    roleArn?: Value<string>;
}