import { Value } from '../../../kloudformation/Value';

export function endpointDetailsProps(endpointDetailsPropsProps: EndpointDetailsProps): EndpointDetailsProps { return (endpointDetailsPropsProps) as unknown as EndpointDetailsProps }

export interface EndpointDetailsProps {
    addressAllocationIds?: Value<Value<string>[]>;
    vpcId?: Value<string>;
    vpcEndpointId?: Value<string>;
    subnetIds?: Value<Value<string>[]>;
}