import { Value } from '../../../kloudformation/Value';
import { CrossRegionCopyRetainRuleProps } from './CrossRegionCopyRetainRuleProps';

export interface CrossRegionCopyRuleProps {
  targetRegion: Value<string>
  encrypted: Value<boolean>
  cmkArn?: Value<string>
  retainRule?: CrossRegionCopyRetainRuleProps
  copyTags?: Value<boolean>
}