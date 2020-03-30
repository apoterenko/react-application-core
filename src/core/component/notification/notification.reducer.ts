import { IEffectsAction } from 'redux-effects-promise';

import {
  $RAC_NOTIFICATION_CLEAR_ACTION_TYPE,
  $RAC_NOTIFICATION_ERROR_ACTION_TYPE,
  $RAC_NOTIFICATION_INFO_ACTION_TYPE,
  INITIAL_NOTIFICATION_ENTITY,
  INotificationEntity,
} from '../../definition';
import { mapErrorObject } from '../../error'; // TODO Move to mapper
import { selectData } from '../../util';

/**
 * @stable [13.02.2020]
 * @param {INotificationEntity} state
 * @param {IEffectsAction} action
 * @returns {INotificationEntity}
 */
export const notificationReducer = (state: INotificationEntity = INITIAL_NOTIFICATION_ENTITY,
                                    action: IEffectsAction): INotificationEntity => {
  const notificationEntity = selectData<INotificationEntity>(action);
  switch (action.type) {
    case $RAC_NOTIFICATION_INFO_ACTION_TYPE:
      return {
        ...state,
        info: notificationEntity.info,
      };
    case $RAC_NOTIFICATION_ERROR_ACTION_TYPE:
      return {
        ...state,
        error: mapErrorObject(notificationEntity.error).message,
      };
    case $RAC_NOTIFICATION_CLEAR_ACTION_TYPE:
      return {
        ...INITIAL_NOTIFICATION_ENTITY,
      };
  }
  return state;
};
