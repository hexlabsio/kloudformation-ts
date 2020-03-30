import { Value } from '../../../kloudformation/Value';

export function deviceRegistryEnrichProps(deviceRegistryEnrichPropsProps: DeviceRegistryEnrichProps): DeviceRegistryEnrichProps { return (deviceRegistryEnrichPropsProps) as unknown as DeviceRegistryEnrichProps }

export interface DeviceRegistryEnrichProps {
    attribute?: Value<string>;
    next?: Value<string>;
    thingName?: Value<string>;
    roleArn?: Value<string>;
    name?: Value<string>;
}