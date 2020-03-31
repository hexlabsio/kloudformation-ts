import { GrpcRouteActionProps } from './GrpcRouteActionProps';
import { GrpcRouteMatchProps } from './GrpcRouteMatchProps';
import { GrpcRetryPolicyProps } from './GrpcRetryPolicyProps';

export function grpcRouteProps(grpcRoutePropsProps: GrpcRouteProps): GrpcRouteProps { return (grpcRoutePropsProps) }

export interface GrpcRouteProps {
    action: GrpcRouteActionProps;
    match: GrpcRouteMatchProps;
    retryPolicy?: GrpcRetryPolicyProps;
}