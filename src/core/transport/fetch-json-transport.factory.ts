import { injectable } from 'inversify';

import { IApplicationTransportFactory, ITransportRawResponse, ITransportRequest } from './transport.interface';
import { DI_TYPES, lazyInject } from '../di';
import { IApplicationSettings } from '../settings';
import { AnyT } from '../definition.interface';

@injectable()
export class FetchJsonTransportFactory implements IApplicationTransportFactory {
  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;

  public request(req: ITransportRequest): Promise<AnyT> {
    // TODO urijs
    return fetch(this.settings.apiUrl + req.name + (req.noCache === true ? '' : '?_dc=' + Date.now()))
      .then((response) => response.json())
      .then((json) => ({ data: { result: json } } as ITransportRawResponse));
  }

  public cancelRequest(operationId: string): void {
    throw new Error('Unsupported operation');
  }
}
