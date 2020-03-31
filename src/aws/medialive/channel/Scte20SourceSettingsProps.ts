import { Value } from '../../../kloudformation/Value';

export function scte20SourceSettingsProps(scte20SourceSettingsPropsProps: Scte20SourceSettingsProps): Scte20SourceSettingsProps { return (scte20SourceSettingsPropsProps) }

export interface Scte20SourceSettingsProps {
    source608ChannelNumber?: Value<number>;
    convert608To708?: Value<string>;
}