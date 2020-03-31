import { Value } from '../../../kloudformation/Value';

export function snsActionProps(snsActionPropsProps: SnsActionProps): SnsActionProps { return (snsActionPropsProps) }

export interface SnsActionProps {
    roleArn: Value<string>;
    targetArn: Value<string>;
    messageFormat?: Value<string>;
}