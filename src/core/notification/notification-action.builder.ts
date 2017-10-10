import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import {
  NOTIFICATION_ERROR_ACTION_TYPE,
  NOTIFICATION_INFO_ACTION_TYPE,
} from './notification.interface';

export class NotificationActionBuilder {

  public static buildErrorAction(error: string): IEffectsAction {
    return EffectsAction.create(NOTIFICATION_ERROR_ACTION_TYPE, { error });
  }

  public static buildInfoAction(info: string): IEffectsAction {
    return EffectsAction.create(NOTIFICATION_INFO_ACTION_TYPE, { info });
  }
}
