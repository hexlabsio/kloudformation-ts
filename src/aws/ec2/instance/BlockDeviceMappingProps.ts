import { Value } from '../../../kloudformation/Value';
import { EbsProps } from './EbsProps';
import { NoDeviceProps } from './NoDeviceProps';

export function blockDeviceMappingProps(blockDeviceMappingPropsProps: BlockDeviceMappingProps): BlockDeviceMappingProps { return (blockDeviceMappingPropsProps) }

export interface BlockDeviceMappingProps {
    deviceName: Value<string>;
    ebs?: EbsProps;
    noDevice?: NoDeviceProps;
    virtualName?: Value<string>;
}