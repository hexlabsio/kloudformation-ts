import { Value } from '../../../kloudformation/Value';

export function portMappingProps(portMappingPropsProps: PortMappingProps): PortMappingProps { return (portMappingPropsProps) as unknown as PortMappingProps }

export interface PortMappingProps {
    port: Value<number>;
    protocol: Value<string>;
}