import { Value } from '../../../kloudformation/Value';

export function metricDimensionProps(metricDimensionPropsProps: MetricDimensionProps): MetricDimensionProps { return (metricDimensionPropsProps) as unknown as MetricDimensionProps }

export interface MetricDimensionProps {
    key: Value<string>;
    value: Value<string>;
}