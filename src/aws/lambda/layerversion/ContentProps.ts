import { Value } from '../../../kloudformation/Value';

export function contentProps(contentPropsProps: ContentProps): ContentProps { return (contentPropsProps) }

export interface ContentProps {
    s3Bucket: Value<string>;
    s3Key: Value<string>;
    s3ObjectVersion?: Value<string>;
}