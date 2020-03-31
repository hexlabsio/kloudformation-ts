import { ActionProps } from './ActionProps';
import { Value } from '../../../kloudformation/Value';

export function topicRulePayloadProps(topicRulePayloadPropsProps: TopicRulePayloadProps): TopicRulePayloadProps { return (topicRulePayloadPropsProps) }

export interface TopicRulePayloadProps {
    actions: ActionProps[];
    ruleDisabled: Value<boolean>;
    sql: Value<string>;
    awsIotSqlVersion?: Value<string>;
    description?: Value<string>;
    errorAction?: ActionProps;
}