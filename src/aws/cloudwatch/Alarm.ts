import { Value } from '../../kloudformation/Value';
import { DimensionProps } from './alarm/DimensionProps';
import { MetricDataQueryProps } from './alarm/MetricDataQueryProps';
import { KloudResource } from '../../kloudformation/KloudResource';
import { Attribute } from '../../kloudformation/Attribute';

export type AlarmAttributes = { Arn: Attribute<string> }
export function alarm(alarmProps: Alarm): Alarm & { attributes: AlarmAttributes } { return ({ ...alarmProps, _logicalType: 'AWS::CloudWatch::Alarm', attributes: { Arn: 'Arn' } }) }

export interface Alarm extends KloudResource {
    comparisonOperator: Value<string>;
    evaluationPeriods: Value<number>;
    actionsEnabled?: Value<boolean>;
    alarmActions?: Value<Value<string>[]>;
    alarmDescription?: Value<string>;
    alarmName?: Value<string>;
    datapointsToAlarm?: Value<number>;
    dimensions?: DimensionProps[];
    evaluateLowSampleCountPercentile?: Value<string>;
    extendedStatistic?: Value<string>;
    insufficientDataActions?: Value<Value<string>[]>;
    metricName?: Value<string>;
    metrics?: MetricDataQueryProps[];
    namespace?: Value<string>;
    oKActions?: Value<Value<string>[]>;
    period?: Value<number>;
    statistic?: Value<string>;
    threshold?: Value<number>;
    thresholdMetricId?: Value<string>;
    treatMissingData?: Value<string>;
    unit?: Value<string>;
}