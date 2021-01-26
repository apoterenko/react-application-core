import { IEffectsAction } from 'redux-effects-promise';

import {
  $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE,
  $_RAC_NOTIFICATION_ERROR_ACTION_TYPE,
  $_RAC_NOTIFICATION_INFO_ACTION_TYPE,
  INITIAL_REDUX_NOTIFICATION_ENTITY,
  IReduxNotificationEntity,
} from '../../definition';
import {
  ErrorUtils,
  Selectors,
} from '../../util';

/**
 * @stable [26.01.2021]
 * @param state
 * @param action
 */
export const notificationReducer = (state: IReduxNotificationEntity = INITIAL_REDUX_NOTIFICATION_ENTITY,
                                    action: IEffectsAction): IReduxNotificationEntity => {
  const {
    error,
    info,
  } = Selectors.data<IReduxNotificationEntity>(action) || {};

  switch (action.type) {
    case $_RAC_NOTIFICATION_INFO_ACTION_TYPE:
      return {
        ...state,
        info,
      };
    case $_RAC_NOTIFICATION_ERROR_ACTION_TYPE:
      return {
        ...state,
        error: ErrorUtils.asErrorMessage(error).message,
      };
    case $_RAC_NOTIFICATION_CLEAR_ACTION_TYPE:
      return {
        ...INITIAL_REDUX_NOTIFICATION_ENTITY,
      };
  }
  return state;
};
