import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $RAC_NOTIFICATION_CLEAR_ACTION_TYPE,
  $RAC_NOTIFICATION_ERROR_ACTION_TYPE,
  $RAC_NOTIFICATION_INFO_ACTION_TYPE,
  IGenericNotificationEntity,
} from '../definition';
import {
  isString,
  selectErrorFromAction,
} from '../util';

export class NotificationActionBuilder {

  /**
   * @stable [13.02.2020]
   * @param {string | IEffectsAction} error
   * @returns {IEffectsAction}
   */
  public static buildErrorAction(error: string | IEffectsAction): IEffectsAction {
    const plainAction = this.buildPlainErrorAction(error);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [13.02.2020]
   * @param {string} info
   * @returns {IEffectsAction}
   */
  public static buildInfoAction(info: string): IEffectsAction {
    const plainAction = this.buildPlainInfoAction(info);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [13.02.2020]
   * @param {string} info
   * @returns {IEffectsAction}
   */
  public static buildPlainInfoAction(info: string): IEffectsAction {
    const notificationEntity: IGenericNotificationEntity = {info};
    return {type: $RAC_NOTIFICATION_INFO_ACTION_TYPE, data: notificationEntity};
  }

  /**
   * @stable [13.02.2020]
   * @param {string | IEffectsAction} error
   * @returns {IEffectsAction}
   */
  public static buildPlainErrorAction(error: string | IEffectsAction): IEffectsAction {
    const notificationEntity: IGenericNotificationEntity = {
      error: isString(error)
        ? error as string
        : selectErrorFromAction(error as IEffectsAction),
    };
    return {type: $RAC_NOTIFICATION_ERROR_ACTION_TYPE, data: notificationEntity};
  }

  /**
   * @stable [13.02.2020]
   * @returns {IEffectsAction}
   */
  public static buildPlainClearAction(): IEffectsAction {
    return {type: $RAC_NOTIFICATION_CLEAR_ACTION_TYPE};
  }
}
