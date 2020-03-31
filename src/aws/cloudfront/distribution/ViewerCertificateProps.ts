import { Value } from '../../../kloudformation/Value';

export function viewerCertificateProps(viewerCertificatePropsProps: ViewerCertificateProps): ViewerCertificateProps { return (viewerCertificatePropsProps) }

export interface ViewerCertificateProps {
    iamCertificateId?: Value<string>;
    sslSupportMethod?: Value<string>;
    minimumProtocolVersion?: Value<string>;
    cloudFrontDefaultCertificate?: Value<boolean>;
    acmCertificateArn?: Value<string>;
}