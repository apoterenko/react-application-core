import { INotificationEntity } from '../entities-definitions.interface';

export const INITIAL_APPLICATION_NOTIFICATION_STATE: INotificationEntity = {
  error: null,
  info: null,
};

export const NOTIFICATION_INFO_ACTION_TYPE = 'notification.info';
export const NOTIFICATION_ERROR_ACTION_TYPE = 'notification.error';
export const NOTIFICATION_CLEAR_ACTION_TYPE = 'notification.clear';
