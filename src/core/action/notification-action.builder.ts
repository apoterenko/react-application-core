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

export class NotificationActionBuilder {

  /**
   * @stable [26.01.2021]
   * @param error
   */
  public static buildErrorAction(error: string | Error | IEffectsAction): IEffectsAction {
    const plainAction = this.buildPlainErrorAction(error);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [26.01.2021]
   * @param info
   */
  public static buildInfoAction(info: string): IEffectsAction {
    const plainAction = this.buildPlainInfoAction(info);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [26.01.2021]
   * @param info
   */
  public static buildPlainInfoAction(info: string): IEffectsAction<IFluxNotificationEntity> {
    return {type: $_RAC_NOTIFICATION_INFO_ACTION_TYPE, data: {info}};
  }

  /**
   * @stable [26.01.2021]
   * @param error
   */
  public static buildPlainErrorAction(error: string | Error | IEffectsAction): IEffectsAction<IFluxNotificationEntity> {
    return {type: $_RAC_NOTIFICATION_ERROR_ACTION_TYPE, data: {error}};
  }

  /**
   * @stable [26.01.2021]
   */
  public static buildPlainClearAction(): IEffectsAction {
    return {type: $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE};
  }
}
