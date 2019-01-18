import * as R from 'ramda';
import { injectable } from 'inversify';

import { TransportFactory } from './transport.factory';
import { ITransportRequestEntity, ITransportRequestParamsEntity } from './transport.interface';
import { defValuesFilter, orDefault} from '../util';

@injectable()
export class RestTransportFactory extends TransportFactory {

  protected getRequestData(req: ITransportRequestEntity): ITransportRequestParamsEntity | Blob {
    return req.formData || orDefault(!R.isNil(req.params), () => defValuesFilter(req.params), {}); // TODO
  }

  protected getResponseData(res): any { // TODO
    return {data: {result: res.data}} as any;
  }
}
