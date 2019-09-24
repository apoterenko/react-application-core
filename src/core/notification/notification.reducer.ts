import { AnyAction } from 'redux';

import { IKeyValue } from '../definitions.interface';
import {
  INITIAL_NOTIFICATION_ENTITY,
  INotificationEntity,
} from '../definition';
import { convertError } from '../error';
import {
  NOTIFICATION_INFO_ACTION_TYPE,
  NOTIFICATION_ERROR_ACTION_TYPE,
  NOTIFICATION_CLEAR_ACTION_TYPE,
} from './notification.interface';

export function notificationReducer(state: INotificationEntity = INITIAL_NOTIFICATION_ENTITY,
                                    action: AnyAction): IKeyValue {
  switch (action.type) {
    case NOTIFICATION_INFO_ACTION_TYPE:
      return {
        info: action.data.info,
      };
    case NOTIFICATION_ERROR_ACTION_TYPE:
      return {
        error: convertError(action.data.error).message,
      };
    case NOTIFICATION_CLEAR_ACTION_TYPE:
      return {
          ...INITIAL_NOTIFICATION_ENTITY,
      };
  }
  return state;
}
