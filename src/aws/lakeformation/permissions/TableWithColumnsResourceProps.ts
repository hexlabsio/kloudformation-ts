import { Value } from '../../../kloudformation/Value';
import { ColumnWildcardProps } from './ColumnWildcardProps';

export function tableWithColumnsResourceProps(tableWithColumnsResourcePropsProps: TableWithColumnsResourceProps): TableWithColumnsResourceProps { return (tableWithColumnsResourcePropsProps) }

export interface TableWithColumnsResourceProps {
    columnNames?: Value<Value<string>[]>;
    databaseName?: Value<string>;
    name?: Value<string>;
    columnWildcard?: ColumnWildcardProps;
}