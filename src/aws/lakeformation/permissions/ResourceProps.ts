import { DataLocationResourceProps } from './DataLocationResourceProps';
import { TableWithColumnsResourceProps } from './TableWithColumnsResourceProps';
import { TableResourceProps } from './TableResourceProps';
import { DatabaseResourceProps } from './DatabaseResourceProps';

export function resourceProps(resourcePropsProps: ResourceProps): ResourceProps { return (resourcePropsProps) as unknown as ResourceProps }

export interface ResourceProps {
    dataLocationResource?: DataLocationResourceProps;
    tableWithColumnsResource?: TableWithColumnsResourceProps;
    tableResource?: TableResourceProps;
    databaseResource?: DatabaseResourceProps;
}