import { Value } from '../../../kloudformation/Value';

export function vPCProps(vPCPropsProps: VPCProps): VPCProps { return (vPCPropsProps) }

export interface VPCProps {
    vPCId: Value<string>;
    vPCRegion: Value<string>;
}