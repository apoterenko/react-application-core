import { IEffectsAction } from 'redux-effects-promise';

import {
  $RAC_NOTIFICATION_CLEAR_ACTION_TYPE,
  $RAC_NOTIFICATION_ERROR_ACTION_TYPE,
  $RAC_NOTIFICATION_INFO_ACTION_TYPE,
  INITIAL_NOTIFICATION_ENTITY,
  IGenericNotificationEntity,
} from '../../definition';
import {
  selectData,
  asErrorMessage,
} from '../../util';

/**
 * @stable [13.02.2020]
 * @param {IGenericNotificationEntity} state
 * @param {IEffectsAction} action
 * @returns {IGenericNotificationEntity}
 */
export const notificationReducer = (state: IGenericNotificationEntity = INITIAL_NOTIFICATION_ENTITY,
                                    action: IEffectsAction): IGenericNotificationEntity => {
  const notificationEntity = selectData<IGenericNotificationEntity>(action);
  switch (action.type) {
    case $RAC_NOTIFICATION_INFO_ACTION_TYPE:
      return {
        ...state,
        info: notificationEntity.info,
      };
    case $RAC_NOTIFICATION_ERROR_ACTION_TYPE:
      return {
        ...state,
        error: asErrorMessage(notificationEntity.error).message,
      };
    case $RAC_NOTIFICATION_CLEAR_ACTION_TYPE:
      return {
        ...INITIAL_NOTIFICATION_ENTITY,
      };
  }
  return state;
};
