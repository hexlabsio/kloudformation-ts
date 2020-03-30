import { ByteMatchStatementProps } from './ByteMatchStatementProps';
import { SqliMatchStatementProps } from './SqliMatchStatementProps';
import { XssMatchStatementProps } from './XssMatchStatementProps';
import { SizeConstraintStatementProps } from './SizeConstraintStatementProps';
import { GeoMatchStatementProps } from './GeoMatchStatementProps';
import { RuleGroupReferenceStatementProps } from './RuleGroupReferenceStatementProps';
import { IPSetReferenceStatementProps } from './IPSetReferenceStatementProps';
import { RegexPatternSetReferenceStatementProps } from './RegexPatternSetReferenceStatementProps';
import { ManagedRuleGroupStatementProps } from './ManagedRuleGroupStatementProps';
import { RateBasedStatementTwoProps } from './RateBasedStatementTwoProps';
import { AndStatementTwoProps } from './AndStatementTwoProps';
import { OrStatementTwoProps } from './OrStatementTwoProps';
import { NotStatementTwoProps } from './NotStatementTwoProps';

export function statementTwoProps(statementTwoPropsProps: StatementTwoProps): StatementTwoProps { return (statementTwoPropsProps) as unknown as StatementTwoProps }

export interface StatementTwoProps {
    byteMatchStatement?: ByteMatchStatementProps;
    sqliMatchStatement?: SqliMatchStatementProps;
    xssMatchStatement?: XssMatchStatementProps;
    sizeConstraintStatement?: SizeConstraintStatementProps;
    geoMatchStatement?: GeoMatchStatementProps;
    ruleGroupReferenceStatement?: RuleGroupReferenceStatementProps;
    iPSetReferenceStatement?: IPSetReferenceStatementProps;
    regexPatternSetReferenceStatement?: RegexPatternSetReferenceStatementProps;
    managedRuleGroupStatement?: ManagedRuleGroupStatementProps;
    rateBasedStatement?: RateBasedStatementTwoProps;
    andStatement?: AndStatementTwoProps;
    orStatement?: OrStatementTwoProps;
    notStatement?: NotStatementTwoProps;
}