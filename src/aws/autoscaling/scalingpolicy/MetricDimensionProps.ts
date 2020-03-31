import { Value } from '../../../kloudformation/Value';

export function metricDimensionProps(metricDimensionPropsProps: MetricDimensionProps): MetricDimensionProps { return (metricDimensionPropsProps) }

export interface MetricDimensionProps {
    name: Value<string>;
    value: Value<string>;
}