import { Value } from '../../../kloudformation/Value';
import { ClientPolicyProps } from './ClientPolicyProps';

export function virtualServiceBackendProps(virtualServiceBackendPropsProps: VirtualServiceBackendProps): VirtualServiceBackendProps { return (virtualServiceBackendPropsProps) as unknown as VirtualServiceBackendProps }

export interface VirtualServiceBackendProps {
    virtualServiceName: Value<string>;
    clientPolicy?: ClientPolicyProps;
}