import { Value } from '../../../kloudformation/Value';

export function accessLoggingPolicyProps(accessLoggingPolicyPropsProps: AccessLoggingPolicyProps): AccessLoggingPolicyProps { return (accessLoggingPolicyPropsProps) }

export interface AccessLoggingPolicyProps {
    enabled: Value<boolean>;
    s3BucketName: Value<string>;
    emitInterval?: Value<number>;
    s3BucketPrefix?: Value<string>;
}