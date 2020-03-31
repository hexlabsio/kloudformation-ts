import { Value } from '../../../kloudformation/Value';

export function fastRestoreRuleProps(fastRestoreRulePropsProps: FastRestoreRuleProps): FastRestoreRuleProps { return (fastRestoreRulePropsProps) }

export interface FastRestoreRuleProps {
    intervalUnit?: Value<string>;
    availabilityZones?: Value<Value<string>[]>;
    count?: Value<number>;
    interval?: Value<number>;
}