import { Value } from '../../../kloudformation/Value';

export function tierProps(tierPropsProps: TierProps): TierProps { return (tierPropsProps) as unknown as TierProps }

export interface TierProps {
    name?: Value<string>;
    type?: Value<string>;
    version?: Value<string>;
}