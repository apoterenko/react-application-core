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
import { IErrorWrapper } from '../definitions.interface';

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
   * @stable [23.01.2021]
   * @param payload
   */
  public static buildPlainErrorAction(payload: string | IEffectsAction): IEffectsAction<IFluxNotificationEntity> {
    return {
      type: $_RAC_NOTIFICATION_ERROR_ACTION_TYPE,
      data: {
        error: TypeUtils.isString(payload)
          ? payload as string
          : Selectors.error(payload as IErrorWrapper<string>),
      },
    };
  }

  /**
   * @stable [13.02.2020]
   * @returns {IEffectsAction}
   */
  public static buildPlainClearAction(): IEffectsAction {
    return {type: $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE};
  }
}
