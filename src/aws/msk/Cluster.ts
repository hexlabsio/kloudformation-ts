import { BrokerNodeGroupInfoProps } from './cluster/BrokerNodeGroupInfoProps';
import { Value } from '../../kloudformation/Value';
import { EncryptionInfoProps } from './cluster/EncryptionInfoProps';
import { OpenMonitoringProps } from './cluster/OpenMonitoringProps';
import { ClientAuthenticationProps } from './cluster/ClientAuthenticationProps';
import { LoggingInfoProps } from './cluster/LoggingInfoProps';
import { ConfigurationInfoProps } from './cluster/ConfigurationInfoProps';
import { KloudResource } from '../../kloudformation/KloudResource';

export function cluster(clusterProps: Cluster & { logicalName?: string }): Cluster { return ({ ...clusterProps, _logicalType: 'AWS::MSK::Cluster' }) as unknown as Cluster }

export interface Cluster extends KloudResource {
    brokerNodeGroupInfo: BrokerNodeGroupInfoProps;
    kafkaVersion: Value<string>;
    numberOfBrokerNodes: Value<number>;
    clusterName: Value<string>;
    enhancedMonitoring?: Value<string>;
    encryptionInfo?: EncryptionInfoProps;
    openMonitoring?: OpenMonitoringProps;
    clientAuthentication?: ClientAuthenticationProps;
    loggingInfo?: LoggingInfoProps;
    tags?: Value<any>;
    configurationInfo?: ConfigurationInfoProps;
}