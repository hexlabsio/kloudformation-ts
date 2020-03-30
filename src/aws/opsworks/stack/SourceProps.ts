import { Value } from '../../../kloudformation/Value';

export function sourceProps(sourcePropsProps: SourceProps): SourceProps { return (sourcePropsProps) as unknown as SourceProps }

export interface SourceProps {
    password?: Value<string>;
    revision?: Value<string>;
    sshKey?: Value<string>;
    type?: Value<string>;
    url?: Value<string>;
    username?: Value<string>;
}