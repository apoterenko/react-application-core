import {
  IReduxHolderNotificationEntity,
} from '../../definition';

export const notificationMapper = (state: IReduxHolderNotificationEntity): IReduxHolderNotificationEntity => ({
  notification: {
    ...state.notification,
  },
});
