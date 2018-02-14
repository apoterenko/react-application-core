import { IEffectsAction } from 'redux-effects-promise';

import { injectable } from 'inversify';

import { ApplicationActionBuilder } from '../component/application';
import { lazyInject, DI_TYPES } from '../di';
import { IApplicationSettings } from '../settings';
import {
  IApplicationTransportErrorInterceptor,
  ITransportErrorPayload,
  ITransportRawResponseError,
} from './transport.interface';

@injectable()
export class TransportErrorInterceptor implements IApplicationTransportErrorInterceptor {
  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;

  public intercept(payload: ITransportErrorPayload): IEffectsAction[] | IEffectsAction {
    const error = payload.error as ITransportRawResponseError;
    if (error.response) {
      switch (error.response.status) {
        case 500:
          return ApplicationActionBuilder.buildCustomErrorAction(
            this.settings.messages.serviceTemporarilyUnavailable
          );
      }
    }
    return null;
  }
}
