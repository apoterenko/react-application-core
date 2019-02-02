import { ITransportCancelTokenEntity } from '../../transport.interface';

/**
 * @stable [01.02.2019]
 */
export interface ITransportRequestProvider {
  provideCancelToken?(): ITransportCancelTokenEntity;
  provideRequest<TRequest, TResponse>(req: TRequest): Promise<TResponse>;
}
