import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import {
  APPLICATION_READY_ACTION_TYPE,
  APPLICATION_NOT_READY_ACTION_TYPE,
  APPLICATION_SECTION,
  APPLICATION_AFTER_INIT_ACTION_TYPE,
  APPLICATION_INIT_ACTION_TYPE,
  APPLICATION_UPDATE_TOKEN_ACTION_TYPE,
  APPLICATION_LOGOUT_ACTION_TYPE,
  APPLICATION_AFTER_LOGOUT_ACTION_TYPE,
  APPLICATION_DESTROY_TOKEN_ACTION_TYPE,
  APPLICATION_PREPARE_ACTION_TYPE,
  APPLICATION_PREPARE_ERROR_ACTION_TYPE,
  APPLICATION_PREPARE_DONE_ACTION_TYPE,
} from './application.interface';

export class ApplicationActionBuilder {

  public static buildPrepareAction(): IEffectsAction {
    return EffectsAction.create(this.buildPrepareActionType());
  }

  public static buildReadyAction(): IEffectsAction {
    return EffectsAction.create(this.buildReadyActionType());
  }

  public static buildUpdateTokenAction(): IEffectsAction {
    return EffectsAction.create(this.buildUpdateTokenActionType());
  }

  public static buildDestroyTokenAction(): IEffectsAction {
    return EffectsAction.create(this.buildDestroyTokenActionType());
  }

  public static buildAfterInitAction(): IEffectsAction {
    return EffectsAction.create(this.buildAfterInitActionType());
  }

  public static buildAfterLogoutAction(): IEffectsAction {
    return EffectsAction.create(this.buildAfterLogoutActionType());
  }

  public static buildUpdateTokenActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_UPDATE_TOKEN_ACTION_TYPE}`;
  }

  public static buildDestroyTokenActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_DESTROY_TOKEN_ACTION_TYPE}`;
  }

  public static buildReadyActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_READY_ACTION_TYPE}`;
  }

  public static buildNotReadyActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_NOT_READY_ACTION_TYPE}`;
  }

  public static buildPrepareActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_PREPARE_ACTION_TYPE}`;
  }

  public static buildPrepareDoneActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_PREPARE_DONE_ACTION_TYPE}`;
  }

  public static buildPrepareErrorActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_PREPARE_ERROR_ACTION_TYPE}`;
  }

  public static buildInitActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_INIT_ACTION_TYPE}`;
  }

  public static buildAfterInitActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_AFTER_INIT_ACTION_TYPE}`;
  }

  public static buildLogoutActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_LOGOUT_ACTION_TYPE}`;
  }

  public static buildAfterLogoutActionType(): string {
    return `${APPLICATION_SECTION}.${APPLICATION_AFTER_LOGOUT_ACTION_TYPE}`;
  }
}
