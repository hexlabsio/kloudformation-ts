import { OnFailureProps } from './OnFailureProps';

export function destinationConfigProps(destinationConfigPropsProps: DestinationConfigProps): DestinationConfigProps { return (destinationConfigPropsProps) }

export interface DestinationConfigProps {
    onFailure: OnFailureProps;
}