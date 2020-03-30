import { Value } from '../../../kloudformation/Value';

export function lustreConfigurationProps(lustreConfigurationPropsProps: LustreConfigurationProps): LustreConfigurationProps { return (lustreConfigurationPropsProps) as unknown as LustreConfigurationProps }

export interface LustreConfigurationProps {
    importPath?: Value<string>;
    weeklyMaintenanceStartTime?: Value<string>;
    importedFileChunkSize?: Value<number>;
    deploymentType?: Value<string>;
    exportPath?: Value<string>;
    perUnitStorageThroughput?: Value<number>;
}