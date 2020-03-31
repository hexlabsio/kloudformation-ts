import { Value } from '../../../kloudformation/Value';

export function resourcesVpcConfigProps(resourcesVpcConfigPropsProps: ResourcesVpcConfigProps): ResourcesVpcConfigProps { return (resourcesVpcConfigPropsProps) }

export interface ResourcesVpcConfigProps {
    subnetIds: Value<Value<string>[]>;
    securityGroupIds?: Value<Value<string>[]>;
}