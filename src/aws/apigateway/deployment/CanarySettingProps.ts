import { Value } from '../../../kloudformation/Value';

export function canarySettingProps(canarySettingPropsProps: CanarySettingProps): CanarySettingProps { return (canarySettingPropsProps) as unknown as CanarySettingProps }

export interface CanarySettingProps {
    percentTraffic?: Value<number>;
    stageVariableOverrides?: { [key: string]: Value<string> };
    useStageCache?: Value<boolean>;
}