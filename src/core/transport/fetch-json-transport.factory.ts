import { injectable } from 'inversify';
import * as URI from 'urijs';

import {
  ITransportFactory,
  ITransportRequestEntity,
} from '../definition';
import { DI_TYPES, lazyInject } from '../di';
import { ISettings } from '../settings';
import { IKeyValue } from '../definitions.interface';

// TODO
@injectable()
export class FetchJsonTransportFactory implements ITransportFactory {
  @lazyInject(DI_TYPES.Settings) private settings: ISettings;

  public request(req: ITransportRequestEntity): Promise<any> {
    const uri0 = new URI(req.url || this.settings.transport.apiUrl);
    if (req.noCache !== true) {
      uri0.addSearch('_dc', Date.now());
    }
    uri0.path(req.name);
    return fetch(uri0.valueOf())
        .then((response) => response.json())
        .then((result) => ({result}));
  }

  public cancelRequest(req: ITransportRequestEntity): void {
    throw new Error('Unsupported operation');
  }

  public toRequestParams(req: ITransportRequestEntity): IKeyValue {
    throw new Error('Unsupported operation');
  }
}
