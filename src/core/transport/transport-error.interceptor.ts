import { IEffectsAction } from 'redux-effects-promise';

import { injectable } from 'inversify';

import {
  IApplicationTransportErrorInterceptor,
  ITransportErrorPayload,
} from './transport.interface';

@injectable()
export class TransportErrorInterceptor implements IApplicationTransportErrorInterceptor {

  public intercept(payload: ITransportErrorPayload): IEffectsAction[]|IEffectsAction {
    return null;
  }
}
