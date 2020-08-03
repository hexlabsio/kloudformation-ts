import { Value } from '../../kloudformation/Value';
import { BlockDeviceMappingProps } from './instance/BlockDeviceMappingProps';
import { TimeBasedAutoScalingProps } from './instance/TimeBasedAutoScalingProps';
import { Attribute } from '../../kloudformation/Attribute';
import { KloudResource } from '../../kloudformation/KloudResource';
export type InstanceAttributes = { AvailabilityZone: Attribute<string>;PrivateDnsName: Attribute<string>;PrivateIp: Attribute<string>;PublicDnsName: Attribute<string>;PublicIp: Attribute<string> }
export function instance(instanceProps: Instance): Instance & {attributes: InstanceAttributes} { return ({ ...instanceProps, _logicalType: 'AWS::OpsWorks::Instance', attributes: { AvailabilityZone: 'AvailabilityZone',PrivateDnsName: 'PrivateDnsName',PrivateIp: 'PrivateIp',PublicDnsName: 'PublicDnsName',PublicIp: 'PublicIp' } }) }
   
export interface Instance extends KloudResource {
  agentVersion?: Value<string>
  amiId?: Value<string>
  architecture?: Value<string>
  autoScalingType?: Value<string>
  availabilityZone?: Value<string>
  blockDeviceMappings?: BlockDeviceMappingProps[]
  ebsOptimized?: Value<boolean>
  elasticIps?: Value<Value<string>[]>
  hostname?: Value<string>
  installUpdatesOnBoot?: Value<boolean>
  instanceType: Value<string>
  layerIds: Value<Value<string>[]>
  os?: Value<string>
  rootDeviceType?: Value<string>
  sshKeyName?: Value<string>
  stackId: Value<string>
  subnetId?: Value<string>
  tenancy?: Value<string>
  timeBasedAutoScaling?: TimeBasedAutoScalingProps
  virtualizationType?: Value<string>
  volumes?: Value<Value<string>[]>
}