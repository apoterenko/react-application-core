import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { convertError } from '../error';

import { NOTIFICATION_ERROR_ACTION_TYPE } from './notification.interface';

export class NotificationActionBuilder {

  public static buildErrorAction(action: IEffectsAction): IEffectsAction {
    return EffectsAction.create(NOTIFICATION_ERROR_ACTION_TYPE, {
      error: convertError(action.error),
    });
  }
}
