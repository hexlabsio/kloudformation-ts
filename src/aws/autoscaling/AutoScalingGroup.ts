import { Value } from '../../kloudformation/Value';
import { LaunchTemplateSpecificationProps } from './autoscalinggroup/LaunchTemplateSpecificationProps';
import { LifecycleHookSpecificationProps } from './autoscalinggroup/LifecycleHookSpecificationProps';
import { MetricsCollectionProps } from './autoscalinggroup/MetricsCollectionProps';
import { MixedInstancesPolicyProps } from './autoscalinggroup/MixedInstancesPolicyProps';
import { NotificationConfigurationProps } from './autoscalinggroup/NotificationConfigurationProps';
import { TagPropertyProps } from './autoscalinggroup/TagPropertyProps';
import { KloudResource } from '../../kloudformation/KloudResource';

export type AutoScalingGroupAttributes = {  }
export function autoScalingGroup(autoScalingGroupProps: AutoScalingGroup): AutoScalingGroup & { attributes: AutoScalingGroupAttributes } { return ({ ...autoScalingGroupProps, _logicalType: 'AWS::AutoScaling::AutoScalingGroup', attributes: {  } }) }

export interface AutoScalingGroup extends KloudResource {
    maxSize: Value<string>;
    minSize: Value<string>;
    autoScalingGroupName?: Value<string>;
    availabilityZones?: Value<Value<string>[]>;
    cooldown?: Value<string>;
    desiredCapacity?: Value<string>;
    healthCheckGracePeriod?: Value<number>;
    healthCheckType?: Value<string>;
    instanceId?: Value<string>;
    launchConfigurationName?: Value<string>;
    launchTemplate?: LaunchTemplateSpecificationProps;
    lifecycleHookSpecificationList?: LifecycleHookSpecificationProps[];
    loadBalancerNames?: Value<Value<string>[]>;
    maxInstanceLifetime?: Value<number>;
    metricsCollection?: MetricsCollectionProps[];
    mixedInstancesPolicy?: MixedInstancesPolicyProps;
    notificationConfigurations?: NotificationConfigurationProps[];
    placementGroup?: Value<string>;
    serviceLinkedRoleARN?: Value<string>;
    tags?: TagPropertyProps[];
    targetGroupARNs?: Value<Value<string>[]>;
    terminationPolicies?: Value<Value<string>[]>;
    vPCZoneIdentifier?: Value<Value<string>[]>;
}