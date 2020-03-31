import { Value } from '../../../kloudformation/Value';

export function loggingPropertiesProps(loggingPropertiesPropsProps: LoggingPropertiesProps): LoggingPropertiesProps { return (loggingPropertiesPropsProps) }

export interface LoggingPropertiesProps {
    bucketName: Value<string>;
    s3KeyPrefix?: Value<string>;
}