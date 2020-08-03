import { Value } from '../../kloudformation/Value';
import { Attribute } from '../../kloudformation/Attribute';
import { KloudResource } from '../../kloudformation/KloudResource';
export type CertificateAuthorityActivationAttributes = { CompleteCertificateChain: Attribute<string> }
export function certificateAuthorityActivation(certificateAuthorityActivationProps: CertificateAuthorityActivation): CertificateAuthorityActivation & {attributes: CertificateAuthorityActivationAttributes} { return ({ ...certificateAuthorityActivationProps, _logicalType: 'AWS::ACMPCA::CertificateAuthorityActivation', attributes: { CompleteCertificateChain: 'CompleteCertificateChain' } }) }
   
export interface CertificateAuthorityActivation extends KloudResource {
  certificateAuthorityArn: Value<string>
  certificate: Value<string>
  certificateChain?: Value<string>
  status?: Value<string>
}