import { Value } from '../../../kloudformation/Value';

export function encryptionConfigurationProps(encryptionConfigurationPropsProps: EncryptionConfigurationProps): EncryptionConfigurationProps { return (encryptionConfigurationPropsProps) }

export interface EncryptionConfigurationProps {
    encryptionOption: Value<string>;
    kmsKey?: Value<string>;
}