import Axios from 'axios/dist/axios';
import { injectable } from 'inversify';

import {
  IApplicationTransportRequestFactory,
  IApplicationTransportCancelToken,
} from './transport.interface';

@injectable()
export class TransportRequestFactory implements IApplicationTransportRequestFactory {

  public request<TRequest, TResponse>(req: TRequest): Promise<TResponse> {
    return Axios.request(req);
  }

  public get cancelToken(): IApplicationTransportCancelToken {
    return Axios.CancelToken.source();
  }
}
