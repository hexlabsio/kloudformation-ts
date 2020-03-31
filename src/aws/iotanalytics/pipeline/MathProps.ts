import { Value } from '../../../kloudformation/Value';

export function mathProps(mathPropsProps: MathProps): MathProps { return (mathPropsProps) }

export interface MathProps {
    attribute?: Value<string>;
    next?: Value<string>;
    math?: Value<string>;
    name?: Value<string>;
}