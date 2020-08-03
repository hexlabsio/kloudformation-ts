import { Value } from '../../../kloudformation/Value';

export interface ConditionProps {
  lt?: Value<number>
  gte?: Value<number>
  neq?: Value<Value<string>[]>
  eq?: Value<Value<string>[]>
  lte?: Value<number>
}