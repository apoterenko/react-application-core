import { EffectsActionBuilder } from 'redux-effects-promise';

import { IApplicationEntity } from '../../entities-definitions.interface';
import { IApplicationConfiguration, IDefaultConnectorConfiguration } from '../../configurations-definitions.interface';

/* @stable - 15.04.2018 */
export interface IApplicationContainerProps extends IApplicationEntity,
                                                    IApplicationConfiguration {
}

/* @stable - 15.04.2018 */
export const APPLICATION_SECTIONS = new Map<string, IDefaultConnectorConfiguration>();

/* @stable - 11.04.2018 */
export const INITIAL_APPLICATION_STATE: IApplicationEntity = {
  ready: true,      // By default the application is ready (there are no the async dependencies)
  progress: false,
  error: null,
};

/* @stable - 15.04.2018 */
export const APPLICATION_SECTION = 'application';
export const APPLICATION_INIT_ACTION_TYPE = `init`;
export const APPLICATION_CUSTOM_ERROR_ACTION_TYPE = `custom.error`;
export const APPLICATION_PREPARE_ACTION_TYPE = `prepare`;
export const APPLICATION_PREPARE_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(APPLICATION_PREPARE_ACTION_TYPE);
export const APPLICATION_PREPARE_AFTER_ACTION_TYPE = `${APPLICATION_PREPARE_ACTION_TYPE}.after`;
export const APPLICATION_PREPARE_AFTER_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(APPLICATION_PREPARE_AFTER_ACTION_TYPE);
export const APPLICATION_LOGOUT_ACTION_TYPE = `logout`;
export const APPLICATION_AFTER_LOGOUT_ACTION_TYPE = `after.logout`;
export const APPLICATION_UPDATE_TOKEN_ACTION_TYPE = `update.token`;
export const APPLICATION_DESTROY_TOKEN_ACTION_TYPE = `destroy.token`;
export const APPLICATION_READY_ACTION_TYPE = `ready`;
export const APPLICATION_NOT_READY_ACTION_TYPE = `not.ready`;
