import { IEffectsAction } from 'redux-effects-promise';

import {
  ACTION_PREFIX,
  IErrorWrapper,
  IInfoWrapper,
  INotificationWrapper,
} from '../definitions.interface';

/**
 * @redux-entity
 * @stable [12.06.2020]
 */
export interface IReduxNotificationEntity<TError = string>
  extends IErrorWrapper<TError>,
    IInfoWrapper {
}

/**
 * @flux-entity
 * @stable [12.06.2020]
 */
export interface IFluxNotificationEntity
  extends IReduxNotificationEntity<string | Error | IEffectsAction> {
}

/**
 * @redux-holder-entity
 * @stable [12.06.2020]
 */
export interface IReduxNotificationHolderEntity<TEntity = IReduxNotificationEntity>
  extends INotificationWrapper<TEntity> {
}

/**
 * @initial-redux-entity
 * @stable [31.07.2020]
 */
export const INITIAL_REDUX_NOTIFICATION_ENTITY = Object.freeze<IReduxNotificationEntity>({
  error: null,
  info: null,
});

/**
 * @stable [12.06.2020]
 */
export const $_RAC_NOTIFICATION_INFO_ACTION_TYPE = `${ACTION_PREFIX}notification.info`;
export const $_RAC_NOTIFICATION_ERROR_ACTION_TYPE = `${ACTION_PREFIX}notification.error`;
export const $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE = `${ACTION_PREFIX}notification.clear`;
