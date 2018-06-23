import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import { IStringTokenWrapper } from '../../definitions.interface';
import {
  $APPLICATION_SECTION,
  APPLICATION_READY_ACTION_TYPE,
  APPLICATION_PREPARE_DONE_ACTION_TYPE,
  APPLICATION_NOT_READY_ACTION_TYPE,
  APPLICATION_INIT_ACTION_TYPE,
  APPLICATION_LOGOUT_ACTION_TYPE,
  APPLICATION_AFTER_LOGOUT_ACTION_TYPE,
  APPLICATION_PREPARE_ACTION_TYPE,
  APPLICATION_PREPARE_ERROR_ACTION_TYPE,
  APPLICATION_CUSTOM_ERROR_ACTION_TYPE,
  APPLICATION_AFTER_LOGIN_ACTION_TYPE,
  APPLICATION_AUTHORIZED_ACTION_TYPE,
  APPLICATION_UNAUTHORIZED_ACTION_TYPE,
  APPLICATION_MOUNT_ACTION_TYPE,
  APPLICATION_AFTER_INIT_ACTION_TYPE,
  APPLICATION_CLICK_ACTION_TYPE,
  APPLICATION_BLUR_ACTION_TYPE,
} from './application.interface';

export class ApplicationActionBuilder {

  public static buildCustomErrorAction(error: string): IEffectsAction {
    return EffectsAction.create(this.buildCustomErrorActionType()).setError(error);
  }

  public static buildPrepareAction(): IEffectsAction {
    return EffectsAction.create(this.buildPrepareActionType());
  }

  public static buildPrepareDoneAction(): IEffectsAction {
    return EffectsAction.create(this.buildPrepareDoneActionType());
  }

  public static buildReadyAction(): IEffectsAction {
    return EffectsAction.create(this.buildReadyActionType());
  }

  public static buildNotReadyAction(): IEffectsAction {
    return EffectsAction.create(this.buildNotReadyActionType());
  }

  public static buildAfterLoginAction(): IEffectsAction {
    return EffectsAction.create(this.buildAfterLoginActionType());
  }

  public static buildAuthorizedAction(payload?: IStringTokenWrapper): IEffectsAction {
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

  public static buildReadyActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_READY_ACTION_TYPE}`;
  }

  public static buildNotReadyActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_NOT_READY_ACTION_TYPE}`;
  }

  public static buildAuthorizedActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_AUTHORIZED_ACTION_TYPE}`;
  }

  public static buildUnauthorizedActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_UNAUTHORIZED_ACTION_TYPE}`;
  }

  public static buildPrepareActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_PREPARE_ACTION_TYPE}`;
  }

  public static buildPrepareDoneActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_PREPARE_DONE_ACTION_TYPE}`;
  }

  public static buildPrepareErrorActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_PREPARE_ERROR_ACTION_TYPE}`;
  }

  public static buildInitActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_INIT_ACTION_TYPE}`;
  }

  public static buildAfterInitActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_AFTER_INIT_ACTION_TYPE}`;
  }

  public static buildCustomErrorActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_CUSTOM_ERROR_ACTION_TYPE}`;
  }

  public static buildLogoutActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_LOGOUT_ACTION_TYPE}`;
  }

  public static buildMountActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_MOUNT_ACTION_TYPE}`;
  }

  /**
   * @stable [23.06.2018]
   * @returns {string}
   */
  public static buildClickActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_CLICK_ACTION_TYPE}`;
  }

  /**
   * @stable [23.06.2018]
   * @returns {string}
   */
  public static buildBlurActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_BLUR_ACTION_TYPE}`;
  }

  public static buildAfterLogoutActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_AFTER_LOGOUT_ACTION_TYPE}`;
  }

  public static buildAfterLoginActionType(): string {
    return `${$APPLICATION_SECTION}.${APPLICATION_AFTER_LOGIN_ACTION_TYPE}`;
  }
}
