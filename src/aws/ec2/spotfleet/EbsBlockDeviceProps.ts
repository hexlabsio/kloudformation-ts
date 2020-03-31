import { Value } from '../../../kloudformation/Value';

export function ebsBlockDeviceProps(ebsBlockDevicePropsProps: EbsBlockDeviceProps): EbsBlockDeviceProps { return (ebsBlockDevicePropsProps) }

export interface EbsBlockDeviceProps {
    deleteOnTermination?: Value<boolean>;
    encrypted?: Value<boolean>;
    iops?: Value<number>;
    snapshotId?: Value<string>;
    volumeSize?: Value<number>;
    volumeType?: Value<string>;
}