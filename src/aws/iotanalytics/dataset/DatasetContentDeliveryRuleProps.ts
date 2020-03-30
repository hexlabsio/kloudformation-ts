import { DatasetContentDeliveryRuleDestinationProps } from './DatasetContentDeliveryRuleDestinationProps';
import { Value } from '../../../kloudformation/Value';

export function datasetContentDeliveryRuleProps(datasetContentDeliveryRulePropsProps: DatasetContentDeliveryRuleProps): DatasetContentDeliveryRuleProps { return (datasetContentDeliveryRulePropsProps) as unknown as DatasetContentDeliveryRuleProps }

export interface DatasetContentDeliveryRuleProps {
    destination: DatasetContentDeliveryRuleDestinationProps;
    entryName?: Value<string>;
}