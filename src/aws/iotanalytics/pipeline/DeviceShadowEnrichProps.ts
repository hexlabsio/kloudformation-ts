import { Value } from '../../../kloudformation/Value';

export function deviceShadowEnrichProps(deviceShadowEnrichPropsProps: DeviceShadowEnrichProps): DeviceShadowEnrichProps { return (deviceShadowEnrichPropsProps) }

export interface DeviceShadowEnrichProps {
    attribute?: Value<string>;
    next?: Value<string>;
    thingName?: Value<string>;
    roleArn?: Value<string>;
    name?: Value<string>;
}