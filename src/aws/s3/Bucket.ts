import { AccelerateConfigurationProps } from './bucket/AccelerateConfigurationProps';
import { Value } from '../../kloudformation/Value';
import { AnalyticsConfigurationProps } from './bucket/AnalyticsConfigurationProps';
import { BucketEncryptionProps } from './bucket/BucketEncryptionProps';
import { CorsConfigurationProps } from './bucket/CorsConfigurationProps';
import { InventoryConfigurationProps } from './bucket/InventoryConfigurationProps';
import { LifecycleConfigurationProps } from './bucket/LifecycleConfigurationProps';
import { LoggingConfigurationProps } from './bucket/LoggingConfigurationProps';
import { MetricsConfigurationProps } from './bucket/MetricsConfigurationProps';
import { NotificationConfigurationProps } from './bucket/NotificationConfigurationProps';
import { ObjectLockConfigurationProps } from './bucket/ObjectLockConfigurationProps';
import { PublicAccessBlockConfigurationProps } from './bucket/PublicAccessBlockConfigurationProps';
import { ReplicationConfigurationProps } from './bucket/ReplicationConfigurationProps';
import { Tag } from '../Tag';
import { VersioningConfigurationProps } from './bucket/VersioningConfigurationProps';
import { WebsiteConfigurationProps } from './bucket/WebsiteConfigurationProps';
import { KloudResource } from '../../kloudformation/KloudResource';
import { Attribute } from '../../kloudformation/Attribute';

export type BucketAttributes = { Arn: Attribute<string>; DomainName: Attribute<string>; DualStackDomainName: Attribute<string>; RegionalDomainName: Attribute<string>; WebsiteURL: Attribute<string> }
export function bucket(bucketProps: Bucket): Bucket & { attributes: BucketAttributes } { return ({ ...bucketProps, _logicalType: 'AWS::S3::Bucket', attributes: { Arn: 'Arn', DomainName: 'DomainName', DualStackDomainName: 'DualStackDomainName', RegionalDomainName: 'RegionalDomainName', WebsiteURL: 'WebsiteURL' } }) }

export interface Bucket extends KloudResource {
    accelerateConfiguration?: AccelerateConfigurationProps;
    accessControl?: Value<string>;
    analyticsConfigurations?: AnalyticsConfigurationProps[];
    bucketEncryption?: BucketEncryptionProps;
    bucketName?: Value<string>;
    corsConfiguration?: CorsConfigurationProps;
    inventoryConfigurations?: InventoryConfigurationProps[];
    lifecycleConfiguration?: LifecycleConfigurationProps;
    loggingConfiguration?: LoggingConfigurationProps;
    metricsConfigurations?: MetricsConfigurationProps[];
    notificationConfiguration?: NotificationConfigurationProps;
    objectLockConfiguration?: ObjectLockConfigurationProps;
    objectLockEnabled?: Value<boolean>;
    publicAccessBlockConfiguration?: PublicAccessBlockConfigurationProps;
    replicationConfiguration?: ReplicationConfigurationProps;
    tags?: Tag[];
    versioningConfiguration?: VersioningConfigurationProps;
    websiteConfiguration?: WebsiteConfigurationProps;
}