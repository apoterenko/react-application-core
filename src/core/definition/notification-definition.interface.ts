import { IErrorEntity } from './error-definition.interface';
import {
  IInfoWrapper,
  INotificationWrapper,
} from '../definitions.interface';

/**
 * @stable [24.09.2019]
 */
export interface INotificationEntity
  extends IErrorEntity,
    IInfoWrapper {
}

/**
 * @stable [24.09.2019]
 */
export interface INotificationWrapperEntity
  extends INotificationWrapper<INotificationEntity> {
}

/**
 * @stable [24.09.2019]
 */
export const INITIAL_NOTIFICATION_ENTITY = Object.freeze<INotificationEntity>({
  error: null,
  info: null,
});
