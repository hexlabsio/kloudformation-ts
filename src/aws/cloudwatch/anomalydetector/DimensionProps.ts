import { Value } from '../../../kloudformation/Value';

export function dimensionProps(dimensionPropsProps: DimensionProps): DimensionProps { return (dimensionPropsProps) as unknown as DimensionProps }

export interface DimensionProps {
    value: Value<string>;
    name: Value<string>;
}