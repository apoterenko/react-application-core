import {
  IApplicationEntity,
  IContainerProps,
} from '../../definition';

/**
 * @stable [30.11.2019]
 */
export interface IApplicationContainerProps
  extends IContainerProps,
    IApplicationEntity {
}

/**
 * @stable [02.07.2018]
 */
export const APPLICATION_INIT_ACTION_TYPE = 'init';
export const APPLICATION_MOUNT_ACTION_TYPE = 'mount';
export const APPLICATION_AFTER_INIT_ACTION_TYPE = `after.${APPLICATION_INIT_ACTION_TYPE}`;
export const APPLICATION_LOGOUT_ACTION_TYPE = 'logout';
export const APPLICATION_AFTER_LOGOUT_ACTION_TYPE = `after.${APPLICATION_LOGOUT_ACTION_TYPE}`;
export const APPLICATION_LOGIN_ACTION_TYPE = 'login';
export const APPLICATION_AFTER_LOGIN_ACTION_TYPE = `after.${APPLICATION_LOGIN_ACTION_TYPE}`;
export const APPLICATION_PATH_ACTION_TYPE = 'path';
export const APPLICATION_AUTHORIZED_ACTION_TYPE = 'authorized';
export const APPLICATION_UNAUTHORIZED_ACTION_TYPE = 'unauthorized';
