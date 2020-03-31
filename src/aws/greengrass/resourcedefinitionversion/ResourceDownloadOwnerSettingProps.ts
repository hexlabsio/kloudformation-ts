import { Value } from '../../../kloudformation/Value';

export function resourceDownloadOwnerSettingProps(resourceDownloadOwnerSettingPropsProps: ResourceDownloadOwnerSettingProps): ResourceDownloadOwnerSettingProps { return (resourceDownloadOwnerSettingPropsProps) }

export interface ResourceDownloadOwnerSettingProps {
    groupOwner: Value<string>;
    groupPermission: Value<string>;
}