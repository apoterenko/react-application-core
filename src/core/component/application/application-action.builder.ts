import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  APPLICATION_AFTER_INIT_ACTION_TYPE,
  APPLICATION_AFTER_LOGIN_ACTION_TYPE,
  APPLICATION_AFTER_LOGOUT_ACTION_TYPE,
  APPLICATION_AUTHORIZED_ACTION_TYPE,
  APPLICATION_INIT_ACTION_TYPE,
  APPLICATION_LOGOUT_ACTION_TYPE,
  APPLICATION_MOUNT_ACTION_TYPE,
  APPLICATION_PATH_ACTION_TYPE,
  APPLICATION_UNAUTHORIZED_ACTION_TYPE,
} from './application.interface';
import {
  $APPLICATION_SECTION,
  $RAC_APPLICATION_CUSTOM_ERROR_ACTION_TYPE,
  $RAC_APPLICATION_NOT_READY_ACTION_TYPE,
  $RAC_APPLICATION_PREPARE_ACTION_TYPE,
  $RAC_APPLICATION_READY_ACTION_TYPE,
  IApplicationFluxTokenEntity,
} from '../../definition';

// TODO Move
export class ApplicationActionBuilder {

  /**
   * @stable [28.11.2019]
   * @param {string} error
   * @returns {IEffectsAction}
   */
  public static buildCustomErrorAction(error: string): IEffectsAction {
    return EffectsAction.create($RAC_APPLICATION_CUSTOM_ERROR_ACTION_TYPE).setError(error);
  }

  /**
   * @stable [18.11.2019]
   * @returns {IEffectsAction}
   */
  public static buildPrepareAction(): IEffectsAction {
    return EffectsAction.create($RAC_APPLICATION_PREPARE_ACTION_TYPE);
  }

  /**
   * @stable [18.11.2019]
   * @returns {IEffectsAction}
   */
  public static buildReadyAction(): IEffectsAction {
    return EffectsAction.create($RAC_APPLICATION_READY_ACTION_TYPE);
  }

  /**
   * @stable [18.11.2019]
   * @returns {IEffectsAction}
   */
  public static buildNotReadyAction(): IEffectsAction {
    return EffectsAction.create($RAC_APPLICATION_NOT_READY_ACTION_TYPE);
  }

  /**
   * @stable [16.03.2020]
   * @param {IApplicationFluxTokenEntity} payload
   * @returns {IEffectsAction}
   */
  public static buildAfterLoginAction(payload: IApplicationFluxTokenEntity): IEffectsAction {
    return EffectsAction.create(this.buildAfterLoginActionType(), payload);
  }

  /**
   * @stable [16.03.2020]
   * @param {IApplicationFluxTokenEntity} payload
   * @returns {IEffectsAction}
   */
  public static buildAuthorizedAction(payload?: IApplicationFluxTokenEntity): IEffectsAction {
    return EffectsAction.create(this.buildAuthorizedActionType(), payload);
  }

  public static buildUnauthorizedAction(): IEffectsAction {
    return EffectsAction.create(this.buildUnauthorizedActionType());
  }

  public static buildAfterLogoutAction(): IEffectsAction {
    return EffectsAction.create(this.buildAfterLogoutActionType());
  }

  public static buildAfterInitAction(): IEffectsAction {
    return EffectsAction.create(this.buildAfterInitActionType());
  }

  /**
   * @stable [23.10.2018]
   * @returns {string}
   */
  public static buildPathActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_PATH_ACTION_TYPE}`;
  }

  public static buildAuthorizedActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_AUTHORIZED_ACTION_TYPE}`;
  }

  /**
   * @stable [17.11.2019]
   * @returns {string}
   */
  public static buildUnauthorizedActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_UNAUTHORIZED_ACTION_TYPE}`;
  }

  public static buildInitActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_INIT_ACTION_TYPE}`;
  }

  public static buildAfterInitActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_AFTER_INIT_ACTION_TYPE}`;
  }

  /**
   * @stable [17.11.2019]
   * @returns {string}
   */
  public static buildLogoutActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_LOGOUT_ACTION_TYPE}`;
  }

  public static buildMountActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_MOUNT_ACTION_TYPE}`;
  }

  /**
   * @stable [17.11.2019]
   * @returns {string}
   */
  public static buildAfterLogoutActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_AFTER_LOGOUT_ACTION_TYPE}`;
  }

  public static buildAfterLoginActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_AFTER_LOGIN_ACTION_TYPE}`;
  }
}
