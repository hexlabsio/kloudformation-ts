import { Value } from '../../../kloudformation/Value';

export function productionVariantProps(productionVariantPropsProps: ProductionVariantProps): ProductionVariantProps { return (productionVariantPropsProps) }

export interface ProductionVariantProps {
    modelName: Value<string>;
    variantName: Value<string>;
    initialInstanceCount: Value<number>;
    instanceType: Value<string>;
    initialVariantWeight: Value<number>;
    acceleratorType?: Value<string>;
}