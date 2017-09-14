import { AnyAction } from 'redux';

import { IKeyValue } from 'core/definition.interface';

import {
  NOTIFICATION_INFO_ACTION_TYPE,
  NOTIFICATION_ERROR_ACTION_TYPE,
  INITIAL_APPLICATION_NOTIFICATION_STATE,
  NOTIFICATION_CLEAR_ACTION_TYPE,
  IApplicationNotificationState,
} from './notification.interface';

export function notificationReducer(state: IApplicationNotificationState = INITIAL_APPLICATION_NOTIFICATION_STATE,
                                    action: AnyAction): IKeyValue {
  switch (action.type) {
    case `${NOTIFICATION_INFO_ACTION_TYPE}`:
      return {
        info: action.data.info,
      };
    case `${NOTIFICATION_ERROR_ACTION_TYPE}`:
      return {
        error: action.data.error,
      };
    case `${NOTIFICATION_CLEAR_ACTION_TYPE}`:
      return {
          ...INITIAL_APPLICATION_NOTIFICATION_STATE,
      };
  }
  return state;
}
