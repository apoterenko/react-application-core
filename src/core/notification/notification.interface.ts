export interface IApplicationNotificationState {
  error?: string;
  info?: string;
}

export const INITIAL_APPLICATION_NOTIFICATION_STATE: IApplicationNotificationState = {
  error: null,
  info: null,
};

export const NOTIFICATION_INFO_ACTION_TYPE = 'notification.info';
export const NOTIFICATION_ERROR_ACTION_TYPE = 'notification.error';
export const NOTIFICATION_CLEAR_ACTION_TYPE = 'notification.clear';
