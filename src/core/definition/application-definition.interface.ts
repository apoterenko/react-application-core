import { EffectsActionBuilder } from 'redux-effects-promise';

import { ILifeCycleEntity } from './entity-definition.interface';
import {
  ACTION_PREFIX,
  IApplicationWrapper,
  IAuthorizedWrapper,
  IPathWrapper,
  IReadyWrapper,
  IBasenameWrapper,
} from '../definitions.interface';

/**
 * @stable [24.09.2019]
 */
export interface IUniversalApplicationEntity
  extends ILifeCycleEntity,
    IAuthorizedWrapper,
    IReadyWrapper,
    IPathWrapper {
}

/**
 * @stable [30.11.2019]
 */
export interface IApplicationEntity
  extends IUniversalApplicationEntity,
    IBasenameWrapper {
}

/**
 * @stable [24.09.2019]
 */
export interface IUniversalApplicationWrapperEntity
  extends IApplicationWrapper<IUniversalApplicationEntity> {
}

/**
 * @stable [24.09.2019]
 */
export const INITIAL_UNIVERSAL_APPLICATION_ENTITY = Object.freeze<IUniversalApplicationEntity>({
  ready: false,         // By default the application is not ready because an async token
  authorized: false,    // By default the application is not authorized because an async token
  progress: false,
  error: null,
  path: null,
});

/**
 * @stable [18.11.2019]
 */
export const APPLICATION_SECTION = 'application';
export const $APPLICATION_SECTION = `${ACTION_PREFIX}${APPLICATION_SECTION}`;
/**/
const APPLICATION_PREPARE_ACTION_TYPE = 'prepare';
export const $RAC_APPLICATION_PREPARE_ACTION_TYPE = `${$APPLICATION_SECTION}.${APPLICATION_PREPARE_ACTION_TYPE}`;
export const $RAC_APPLICATION_PREPARE_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType($RAC_APPLICATION_PREPARE_ACTION_TYPE);
/**/
const APPLICATION_READY_ACTION_TYPE = 'ready';
export const $RAC_APPLICATION_READY_ACTION_TYPE = `${$APPLICATION_SECTION}.${APPLICATION_READY_ACTION_TYPE}`;
/**/
const APPLICATION_NOT_READY_ACTION_TYPE = 'not.ready';
export const $RAC_APPLICATION_NOT_READY_ACTION_TYPE = `${$APPLICATION_SECTION}.${APPLICATION_NOT_READY_ACTION_TYPE}`;
/**/
export const APPLICATION_CUSTOM_ERROR_ACTION_TYPE = 'custom.error';
export const $RAC_APPLICATION_CUSTOM_ERROR_ACTION_TYPE = `${$APPLICATION_SECTION}.${APPLICATION_CUSTOM_ERROR_ACTION_TYPE}`;
