import { Value } from '../../kloudformation/Value';
import { TargetProps } from './maintenancewindowtask/TargetProps';
import { TaskInvocationParametersProps } from './maintenancewindowtask/TaskInvocationParametersProps';
import { LoggingInfoProps } from './maintenancewindowtask/LoggingInfoProps';
import { KloudResource } from '../../kloudformation/KloudResource';

export type MaintenanceWindowTaskAttributes = {  }
export function maintenanceWindowTask(maintenanceWindowTaskProps: MaintenanceWindowTask): MaintenanceWindowTask & { attributes: MaintenanceWindowTaskAttributes } { return ({ ...maintenanceWindowTaskProps, _logicalType: 'AWS::SSM::MaintenanceWindowTask', attributes: {  } }) }

export interface MaintenanceWindowTask extends KloudResource {
    maxErrors: Value<string>;
    priority: Value<number>;
    maxConcurrency: Value<string>;
    targets: TargetProps[];
    taskArn: Value<string>;
    windowId: Value<string>;
    taskType: Value<string>;
    description?: Value<string>;
    serviceRoleArn?: Value<string>;
    name?: Value<string>;
    taskInvocationParameters?: TaskInvocationParametersProps;
    taskParameters?: Value<any>;
    loggingInfo?: LoggingInfoProps;
}