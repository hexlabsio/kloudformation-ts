import { DefaultRetentionProps } from './DefaultRetentionProps';

export function objectLockRuleProps(objectLockRulePropsProps: ObjectLockRuleProps): ObjectLockRuleProps { return (objectLockRulePropsProps) as unknown as ObjectLockRuleProps }

export interface ObjectLockRuleProps {
    defaultRetention?: DefaultRetentionProps;
}