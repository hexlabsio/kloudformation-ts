import { Value } from '../../../kloudformation/Value';

export interface KinesisFirehoseOutputProps {
  resourceARN: Value<string>
  roleARN: Value<string>
}