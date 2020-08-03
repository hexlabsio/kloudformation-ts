import { MaintenanceWindowRunCommandParametersProps } from './MaintenanceWindowRunCommandParametersProps';
import { MaintenanceWindowAutomationParametersProps } from './MaintenanceWindowAutomationParametersProps';
import { MaintenanceWindowStepFunctionsParametersProps } from './MaintenanceWindowStepFunctionsParametersProps';
import { MaintenanceWindowLambdaParametersProps } from './MaintenanceWindowLambdaParametersProps';

export interface TaskInvocationParametersProps {
  maintenanceWindowRunCommandParameters?: MaintenanceWindowRunCommandParametersProps
  maintenanceWindowAutomationParameters?: MaintenanceWindowAutomationParametersProps
  maintenanceWindowStepFunctionsParameters?: MaintenanceWindowStepFunctionsParametersProps
  maintenanceWindowLambdaParameters?: MaintenanceWindowLambdaParametersProps
}