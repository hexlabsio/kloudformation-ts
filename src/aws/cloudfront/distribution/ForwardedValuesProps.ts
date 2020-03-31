import { Value } from '../../../kloudformation/Value';
import { CookiesProps } from './CookiesProps';

export function forwardedValuesProps(forwardedValuesPropsProps: ForwardedValuesProps): ForwardedValuesProps { return (forwardedValuesPropsProps) }

export interface ForwardedValuesProps {
    queryString: Value<boolean>;
    cookies?: CookiesProps;
    headers?: Value<Value<string>[]>;
    queryStringCacheKeys?: Value<Value<string>[]>;
}