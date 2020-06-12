import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE,
  $_RAC_NOTIFICATION_ERROR_ACTION_TYPE,
  $_RAC_NOTIFICATION_INFO_ACTION_TYPE,
  IFluxNotificationEntity,
} from '../definition';
import {
  Selectors,
  TypeUtils,
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
    const notificationEntity: IFluxNotificationEntity = {info};
    return {type: $_RAC_NOTIFICATION_INFO_ACTION_TYPE, data: notificationEntity};
  }

  /**
   * @stable [13.02.2020]
   * @param {string | IEffectsAction} error
   * @returns {IEffectsAction}
   */
  public static buildPlainErrorAction(error: string | IEffectsAction): IEffectsAction {
    const notificationEntity: IFluxNotificationEntity = {
      error: TypeUtils.isString(error)
        ? error as string
        : Selectors.error(error as IEffectsAction),
    };
    return {type: $_RAC_NOTIFICATION_ERROR_ACTION_TYPE, data: notificationEntity};
  }

  /**
   * @stable [13.02.2020]
   * @returns {IEffectsAction}
   */
  public static buildPlainClearAction(): IEffectsAction {
    return {type: $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE};
  }
}
