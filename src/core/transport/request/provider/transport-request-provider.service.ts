import Axios from 'axios/dist/axios';
import { injectable } from 'inversify';

import { ITransportRequestProvider } from './transport-request-provider.interface';
import { ITransportCancelTokenEntity } from '../../transport.interface';

@injectable()
export class TransportRequestProvider implements ITransportRequestProvider {

  /**
   * @stable [01.02.2019]
   * @param {TRequest} req
   * @returns {Promise<TResponse>}
   */
  public provideRequest<TRequest, TResponse>(req: TRequest): Promise<TResponse> {
    return Axios.request(req);
  }

  /**
   * @stable [01.02.2019]
   * @returns {ITransportCancelTokenEntity}
   */
  public provideCancelToken(): ITransportCancelTokenEntity {
    return Axios.CancelToken.source();
  }
}
