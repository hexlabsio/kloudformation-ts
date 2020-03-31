import { Value } from '../../../kloudformation/Value';

export function triggerConfigProps(triggerConfigPropsProps: TriggerConfigProps): TriggerConfigProps { return (triggerConfigPropsProps) }

export interface TriggerConfigProps {
    triggerEvents?: Value<Value<string>[]>;
    triggerName?: Value<string>;
    triggerTargetArn?: Value<string>;
}