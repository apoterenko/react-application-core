import { EffectsActionBuilder } from 'redux-effects-promise';

import { ACTION_PREFIX } from '../../definitions.interface';
import { IApplicationEntity } from '../../entities-definitions.interface';
import { IApplicationConfiguration, IConnectorConfiguration } from '../../configurations-definitions.interface';

/**
 * @stable [02.07.2018]
 */
export interface IApplicationContainerProps extends IApplicationEntity,
                                                    IApplicationConfiguration {
}

/**
 * @stable [02.07.2018]
 */
export const APPLICATION_SECTIONS = new Map<string, IConnectorConfiguration>();

/**
 * @stable [23.06.2018]
 */
export const INITIAL_APPLICATION_STATE: IApplicationEntity = {
  ready: false,         // By default the application is not ready because an async token
  authorized: false,    // By default the application is not authorized because an async token
  progress: false,
  error: null,
  path: null,
};

/**
 * @stable [02.07.2018]
 */
export const APPLICATION_SECTION = 'application';
export const $APPLICATION_SECTION = `${ACTION_PREFIX}${APPLICATION_SECTION}`;
export const APPLICATION_INIT_ACTION_TYPE = 'init';
export const APPLICATION_MOUNT_ACTION_TYPE = 'mount';
export const APPLICATION_AFTER_INIT_ACTION_TYPE = `after.${APPLICATION_INIT_ACTION_TYPE}`;
export const APPLICATION_CUSTOM_ERROR_ACTION_TYPE = 'custom.error';
export const APPLICATION_PREPARE_ACTION_TYPE = 'prepare';
export const APPLICATION_PREPARE_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(APPLICATION_PREPARE_ACTION_TYPE);
export const APPLICATION_PREPARE_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(APPLICATION_PREPARE_ACTION_TYPE);
export const APPLICATION_PREPARE_DONE_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(APPLICATION_PREPARE_DONE_ACTION_TYPE);
export const APPLICATION_LOGOUT_ACTION_TYPE = 'logout';
export const APPLICATION_AFTER_LOGOUT_ACTION_TYPE = `after.${APPLICATION_LOGOUT_ACTION_TYPE}`;
export const APPLICATION_LOGIN_ACTION_TYPE = 'login';
export const APPLICATION_AFTER_LOGIN_ACTION_TYPE = `after.${APPLICATION_LOGIN_ACTION_TYPE}`;
export const APPLICATION_READY_ACTION_TYPE = 'ready';
export const APPLICATION_NOT_READY_ACTION_TYPE = `not.${APPLICATION_READY_ACTION_TYPE}`;
export const APPLICATION_PATH_ACTION_TYPE = 'path';
export const APPLICATION_AUTHORIZED_ACTION_TYPE = 'authorized';
export const APPLICATION_UNAUTHORIZED_ACTION_TYPE = 'unauthorized';
