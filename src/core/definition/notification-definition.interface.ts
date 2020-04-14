import {
  ACTION_PREFIX,
  IErrorWrapper,
  IInfoWrapper,
  INotificationWrapper,
} from '../definitions.interface';

/**
 * @generic-entity
 * @stable [24.09.2019]
 */
export interface IGenericNotificationEntity
  extends IErrorWrapper<string>,
    IInfoWrapper {
}

/**
 * @wrapper-entity
 * @stable [24.09.2019]
 */
export interface INotificationWrapperEntity<TEntity = IGenericNotificationEntity>
  extends INotificationWrapper<TEntity> {
}

/**
 * @initial-entity
 * @stable [24.09.2019]
 */
export const INITIAL_NOTIFICATION_ENTITY = Object.freeze<IGenericNotificationEntity>({
  error: null,
  info: null,
});

/**
 * @stable [13.02.2020]
 */
export const $RAC_NOTIFICATION_INFO_ACTION_TYPE = `${ACTION_PREFIX}notification.info`;
export const $RAC_NOTIFICATION_ERROR_ACTION_TYPE = `${ACTION_PREFIX}notification.error`;
export const $RAC_NOTIFICATION_CLEAR_ACTION_TYPE = `${ACTION_PREFIX}notification.clear`;
