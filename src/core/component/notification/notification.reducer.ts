import { IEffectsAction } from 'redux-effects-promise';

import {
  $RAC_NOTIFICATION_CLEAR_ACTION_TYPE,
  $RAC_NOTIFICATION_ERROR_ACTION_TYPE,
  $RAC_NOTIFICATION_INFO_ACTION_TYPE,
  INITIAL_NOTIFICATION_ENTITY,
  INotificationEntity,
} from '../../definition';
import { convertError } from '../../error'; // TODO Move to mapper

/**
 * @stable [13.02.2020]
 * @param {INotificationEntity} state
 * @param {IEffectsAction} action
 * @returns {INotificationEntity}
 */
export const notificationReducer = (state: INotificationEntity = INITIAL_NOTIFICATION_ENTITY,
                                    action: IEffectsAction): INotificationEntity => {
  const notificationEntity: INotificationEntity = action.data;
  switch (action.type) {
    case $RAC_NOTIFICATION_INFO_ACTION_TYPE:
      return {
        ...state,
        info: notificationEntity.info,
      };
    case $RAC_NOTIFICATION_ERROR_ACTION_TYPE:
      return {
        ...state,
        error: convertError(notificationEntity.error).message,
      };
    case $RAC_NOTIFICATION_CLEAR_ACTION_TYPE:
      return {
        ...INITIAL_NOTIFICATION_ENTITY,
      };
  }
  return state;
};
