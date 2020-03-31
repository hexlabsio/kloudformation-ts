import { Value } from '../../../kloudformation/Value';

export function deviceProps(devicePropsProps: DeviceProps): DeviceProps { return (devicePropsProps) }

export interface DeviceProps {
    thingArn: Value<string>;
    id: Value<string>;
    certificateArn: Value<string>;
    syncShadow?: Value<boolean>;
}