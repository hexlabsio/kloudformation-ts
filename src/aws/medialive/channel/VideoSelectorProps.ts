import { VideoSelectorSettingsProps } from './VideoSelectorSettingsProps';
import { Value } from '../../../kloudformation/Value';

export function videoSelectorProps(videoSelectorPropsProps: VideoSelectorProps): VideoSelectorProps { return (videoSelectorPropsProps) }

export interface VideoSelectorProps {
    selectorSettings?: VideoSelectorSettingsProps;
    colorSpace?: Value<string>;
    colorSpaceUsage?: Value<string>;
}