import { Value } from '../../../kloudformation/Value';

export function environmentVariableProps(environmentVariablePropsProps: EnvironmentVariableProps): EnvironmentVariableProps { return (environmentVariablePropsProps) as unknown as EnvironmentVariableProps }

export interface EnvironmentVariableProps {
    value: Value<string>;
    name: Value<string>;
    type?: Value<string>;
}