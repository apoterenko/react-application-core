import {
  IReduxNotificationHolderEntity,
} from '../../definition';

export const notificationMapper = (state: IReduxNotificationHolderEntity): IReduxNotificationHolderEntity => ({
  notification: {
    ...state.notification,
  },
});
