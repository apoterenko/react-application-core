import { IEffectsAction } from 'redux-effects-promise';

import { injectable } from 'inversify';

import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { lazyInject, DI_TYPES } from '../di';
import { ISettingsEntity } from '../settings';
import {
  IApplicationTransportErrorInterceptor,
  ITransportRawResponseError,
} from './transport.interface';

@injectable()
export class TransportErrorInterceptor implements IApplicationTransportErrorInterceptor {
  @lazyInject(DI_TYPES.Settings) private settings: ISettingsEntity;

  public intercept(payload): IEffectsAction[] | IEffectsAction {
    const error = payload.error as ITransportRawResponseError;
    if (error.response) {
      switch (error.response.status) {
        case 500:
          return ApplicationActionBuilder.buildCustomErrorAction(
            this.settings.messages.serviceTemporarilyUnavailableMessage
          );
      }
    }
    return null;
  }
}
