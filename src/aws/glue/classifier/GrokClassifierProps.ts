import { Value } from '../../../kloudformation/Value';

export function grokClassifierProps(grokClassifierPropsProps: GrokClassifierProps): GrokClassifierProps { return (grokClassifierPropsProps) as unknown as GrokClassifierProps }

export interface GrokClassifierProps {
    grokPattern: Value<string>;
    classification: Value<string>;
    customPatterns?: Value<string>;
    name?: Value<string>;
}