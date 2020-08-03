import { ByteMatchStatementProps } from './ByteMatchStatementProps';
import { SqliMatchStatementProps } from './SqliMatchStatementProps';
import { XssMatchStatementProps } from './XssMatchStatementProps';
import { SizeConstraintStatementProps } from './SizeConstraintStatementProps';
import { GeoMatchStatementProps } from './GeoMatchStatementProps';
import { IPSetReferenceStatementProps } from './IPSetReferenceStatementProps';
import { RegexPatternSetReferenceStatementProps } from './RegexPatternSetReferenceStatementProps';
import { RateBasedStatementOneProps } from './RateBasedStatementOneProps';
import { AndStatementOneProps } from './AndStatementOneProps';
import { OrStatementOneProps } from './OrStatementOneProps';
import { NotStatementOneProps } from './NotStatementOneProps';

export interface StatementOneProps {
  byteMatchStatement?: ByteMatchStatementProps
  sqliMatchStatement?: SqliMatchStatementProps
  xssMatchStatement?: XssMatchStatementProps
  sizeConstraintStatement?: SizeConstraintStatementProps
  geoMatchStatement?: GeoMatchStatementProps
  iPSetReferenceStatement?: IPSetReferenceStatementProps
  regexPatternSetReferenceStatement?: RegexPatternSetReferenceStatementProps
  rateBasedStatement?: RateBasedStatementOneProps
  andStatement?: AndStatementOneProps
  orStatement?: OrStatementOneProps
  notStatement?: NotStatementOneProps
}