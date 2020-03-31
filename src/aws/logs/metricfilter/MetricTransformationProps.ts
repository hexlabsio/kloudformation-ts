import { Value } from '../../../kloudformation/Value';

export function metricTransformationProps(metricTransformationPropsProps: MetricTransformationProps): MetricTransformationProps { return (metricTransformationPropsProps) }

export interface MetricTransformationProps {
    metricName: Value<string>;
    metricNamespace: Value<string>;
    metricValue: Value<string>;
    defaultValue?: Value<number>;
}