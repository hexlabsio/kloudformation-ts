import { Value } from '../../../kloudformation/Value';

export function locationProps(locationPropsProps: LocationProps): LocationProps { return (locationPropsProps) as unknown as LocationProps }

export interface LocationProps {
    method?: Value<string>;
    name?: Value<string>;
    path?: Value<string>;
    statusCode?: Value<string>;
    type?: Value<string>;
}