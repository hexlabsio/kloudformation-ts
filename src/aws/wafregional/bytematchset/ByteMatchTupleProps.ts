import { Value } from '../../../kloudformation/Value';
import { FieldToMatchProps } from './FieldToMatchProps';

export function byteMatchTupleProps(byteMatchTuplePropsProps: ByteMatchTupleProps): ByteMatchTupleProps { return (byteMatchTuplePropsProps) as unknown as ByteMatchTupleProps }

export interface ByteMatchTupleProps {
    positionalConstraint: Value<string>;
    textTransformation: Value<string>;
    fieldToMatch: FieldToMatchProps;
    targetString?: Value<string>;
    targetStringBase64?: Value<string>;
}