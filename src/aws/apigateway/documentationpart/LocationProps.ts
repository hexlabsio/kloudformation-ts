import { Value } from '../../../kloudformation/Value';

export interface LocationProps {
  method?: Value<string>
  name?: Value<string>
  path?: Value<string>
  statusCode?: Value<string>
  type?: Value<string>
}