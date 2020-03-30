import { Value } from '../../../kloudformation/Value';
import { StepAdjustmentProps } from './StepAdjustmentProps';

export function stepScalingPolicyConfigurationProps(stepScalingPolicyConfigurationPropsProps: StepScalingPolicyConfigurationProps): StepScalingPolicyConfigurationProps { return (stepScalingPolicyConfigurationPropsProps) as unknown as StepScalingPolicyConfigurationProps }

export interface StepScalingPolicyConfigurationProps {
    adjustmentType?: Value<string>;
    cooldown?: Value<number>;
    metricAggregationType?: Value<string>;
    minAdjustmentMagnitude?: Value<number>;
    stepAdjustments?: StepAdjustmentProps[];
}