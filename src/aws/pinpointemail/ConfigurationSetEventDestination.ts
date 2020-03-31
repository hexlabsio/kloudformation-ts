import { Value } from '../../kloudformation/Value';
import { EventDestinationProps } from '../ses/configurationseteventdestination/EventDestinationProps';
import { KloudResource } from '../../kloudformation/KloudResource';

export type ConfigurationSetEventDestinationAttributes = {  }
export function configurationSetEventDestination(configurationSetEventDestinationProps: ConfigurationSetEventDestination): ConfigurationSetEventDestination & { attributes: ConfigurationSetEventDestinationAttributes } { return ({ ...configurationSetEventDestinationProps, _logicalType: 'AWS::PinpointEmail::ConfigurationSetEventDestination', attributes: {  } }) }

export interface ConfigurationSetEventDestination extends KloudResource {
    eventDestinationName: Value<string>;
    configurationSetName: Value<string>;
    eventDestination?: EventDestinationProps;
}