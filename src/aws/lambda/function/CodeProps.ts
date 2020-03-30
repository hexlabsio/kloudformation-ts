import { Value } from '../../../kloudformation/Value';

export function codeProps(codePropsProps: CodeProps): CodeProps { return (codePropsProps) as unknown as CodeProps }

export interface CodeProps {
    s3Bucket?: Value<string>;
    s3Key?: Value<string>;
    s3ObjectVersion?: Value<string>;
    zipFile?: Value<string>;
}