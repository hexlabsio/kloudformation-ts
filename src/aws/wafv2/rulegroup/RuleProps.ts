import { Value } from '../../../kloudformation/Value';
import { StatementOneProps } from './StatementOneProps';
import { RuleActionProps } from './RuleActionProps';
import { VisibilityConfigProps } from './VisibilityConfigProps';

export interface RuleProps {
  name: Value<string>
  priority: Value<number>
  statement: StatementOneProps
  action?: RuleActionProps
  visibilityConfig: VisibilityConfigProps
}