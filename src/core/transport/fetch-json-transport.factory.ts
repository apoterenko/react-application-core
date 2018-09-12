import { injectable } from 'inversify';
import * as URI from 'urijs';

import {
  IApplicationTransportFactory,
  ITransportRawResponse,
  ITransportRequestEntity,
  ITransportRequestParamsEntity,
} from './transport.interface';
import { DI_TYPES, lazyInject } from '../di';
import { IApplicationSettings } from '../settings';

@injectable()
export class FetchJsonTransportFactory implements IApplicationTransportFactory {
  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;

  public request(req: ITransportRequestEntity): Promise<ITransportRawResponse> {
    const uri0 = new URI(req.url || this.settings.apiUrl);
    if (req.noCache !== true) {
      uri0.addSearch('_dc', Date.now());
    }
    uri0.path(req.name);
    return fetch(uri0.valueOf())
        .then((response) => response.json())
        .then((result) => ({data: {result}} as ITransportRawResponse));
  }

  public cancelRequest(operationId: string): void {
    throw new Error('Unsupported operation');
  }

  public toRequestParams(req: ITransportRequestEntity): ITransportRequestParamsEntity {
    throw new Error('Unsupported operation');
  }
}
