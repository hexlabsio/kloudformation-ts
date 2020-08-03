import { Value } from '../../../kloudformation/Value';
import { InputFormatConfigurationProps } from './InputFormatConfigurationProps';
import { OutputFormatConfigurationProps } from './OutputFormatConfigurationProps';
import { SchemaConfigurationProps } from './SchemaConfigurationProps';

export interface DataFormatConversionConfigurationProps {
  enabled?: Value<boolean>
  inputFormatConfiguration?: InputFormatConfigurationProps
  outputFormatConfiguration?: OutputFormatConfigurationProps
  schemaConfiguration?: SchemaConfigurationProps
}