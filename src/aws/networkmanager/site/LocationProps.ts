import { Value } from '../../../kloudformation/Value';

export function locationProps(locationPropsProps: LocationProps): LocationProps { return (locationPropsProps) as unknown as LocationProps }

export interface LocationProps {
    address?: Value<string>;
    latitude?: Value<string>;
    longitude?: Value<string>;
}