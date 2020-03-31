import { Value } from '../../../kloudformation/Value';
import { StorageInfoProps } from './StorageInfoProps';

export function brokerNodeGroupInfoProps(brokerNodeGroupInfoPropsProps: BrokerNodeGroupInfoProps): BrokerNodeGroupInfoProps { return (brokerNodeGroupInfoPropsProps) }

export interface BrokerNodeGroupInfoProps {
    clientSubnets: Value<Value<string>[]>;
    instanceType: Value<string>;
    securityGroups?: Value<Value<string>[]>;
    storageInfo?: StorageInfoProps;
    brokerAZDistribution?: Value<string>;
}