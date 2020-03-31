import { Value } from '../../../kloudformation/Value';

export function accountAggregationSourceProps(accountAggregationSourcePropsProps: AccountAggregationSourceProps): AccountAggregationSourceProps { return (accountAggregationSourcePropsProps) }

export interface AccountAggregationSourceProps {
    accountIds: Value<Value<string>[]>;
    allAwsRegions?: Value<boolean>;
    awsRegions?: Value<Value<string>[]>;
}