import { AnyAction } from 'redux';
import { EffectsAction } from 'redux-effects-promise';

import { convertError } from 'core/error';

import {
  NOTIFICATION_ERROR_ACTION_TYPE,
} from './notification.interface';

export class NotificationActionBuilder {

  public static buildNotificationErrorAction(action: AnyAction): EffectsAction {
    return EffectsAction.create(NOTIFICATION_ERROR_ACTION_TYPE, { error: convertError(action.error) });
  }
}
