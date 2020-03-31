import { Value } from '../../../kloudformation/Value';

export function routeSettingsProps(routeSettingsPropsProps: RouteSettingsProps): RouteSettingsProps { return (routeSettingsPropsProps) }

export interface RouteSettingsProps {
    loggingLevel?: Value<string>;
    dataTraceEnabled?: Value<boolean>;
    throttlingBurstLimit?: Value<number>;
    detailedMetricsEnabled?: Value<boolean>;
    throttlingRateLimit?: Value<number>;
}