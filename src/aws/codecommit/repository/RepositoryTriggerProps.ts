import { Value } from '../../../kloudformation/Value';

export function repositoryTriggerProps(repositoryTriggerPropsProps: RepositoryTriggerProps): RepositoryTriggerProps { return (repositoryTriggerPropsProps) as unknown as RepositoryTriggerProps }

export interface RepositoryTriggerProps {
    events: Value<Value<string>[]>;
    destinationArn: Value<string>;
    name: Value<string>;
    branches?: Value<Value<string>[]>;
    customData?: Value<string>;
}