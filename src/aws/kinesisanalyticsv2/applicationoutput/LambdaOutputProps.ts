import { Value } from '../../../kloudformation/Value';

export function lambdaOutputProps(lambdaOutputPropsProps: LambdaOutputProps): LambdaOutputProps { return (lambdaOutputPropsProps) }

export interface LambdaOutputProps {
    resourceARN: Value<string>;
}