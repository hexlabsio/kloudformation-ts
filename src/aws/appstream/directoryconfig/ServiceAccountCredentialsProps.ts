import { Value } from '../../../kloudformation/Value';

export function serviceAccountCredentialsProps(serviceAccountCredentialsPropsProps: ServiceAccountCredentialsProps): ServiceAccountCredentialsProps { return (serviceAccountCredentialsPropsProps) as unknown as ServiceAccountCredentialsProps }

export interface ServiceAccountCredentialsProps {
    accountName: Value<string>;
    accountPassword: Value<string>;
}