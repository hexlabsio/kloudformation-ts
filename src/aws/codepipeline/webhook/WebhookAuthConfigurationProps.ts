import { Value } from '../../../kloudformation/Value';

export function webhookAuthConfigurationProps(webhookAuthConfigurationPropsProps: WebhookAuthConfigurationProps): WebhookAuthConfigurationProps { return (webhookAuthConfigurationPropsProps) }

export interface WebhookAuthConfigurationProps {
    allowedIPRange?: Value<string>;
    secretToken?: Value<string>;
}