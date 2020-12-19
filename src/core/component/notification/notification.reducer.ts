import { IEffectsAction } from 'redux-effects-promise';

import {
  $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE,
  $_RAC_NOTIFICATION_ERROR_ACTION_TYPE,
  $_RAC_NOTIFICATION_INFO_ACTION_TYPE,
  INITIAL_REDUX_NOTIFICATION_ENTITY,
  IReduxNotificationEntity,
} from '../../definition';
import {
  asErrorMessage,
  Selectors,
} from '../../util';

/**
 * @stable [13.02.2020]
 * @param {IReduxNotificationEntity} state
 * @param {IEffectsAction} action
 * @returns {IReduxNotificationEntity}
 */
export const notificationReducer = (state: IReduxNotificationEntity = INITIAL_REDUX_NOTIFICATION_ENTITY,
                                    action: IEffectsAction): IReduxNotificationEntity => {
  const notificationEntity = Selectors.data<IReduxNotificationEntity>(action);
  switch (action.type) {
    case $_RAC_NOTIFICATION_INFO_ACTION_TYPE:
      return {
        ...state,
        info: notificationEntity.info,
      };
    case $_RAC_NOTIFICATION_ERROR_ACTION_TYPE:
      return {
        ...state,
        error: asErrorMessage(notificationEntity.error).message,
      };
    case $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE:
      return {
        ...INITIAL_REDUX_NOTIFICATION_ENTITY,
      };
  }
  return state;
};
