import { injectable } from 'inversify';

import { TransportFactory } from './transport.factory';
import { ITransportRequestEntity, ITransportRequestParamsEntity } from './transport.interface';

@injectable()
export class RestTransportFactory extends TransportFactory {

  protected getRequestData(req: ITransportRequestEntity): ITransportRequestParamsEntity | Blob {
    return {};
  }

  protected getResponseData(res): any { // TODO
    return {data: {result: res.data}} as any;
  }
}
