import { AnyAction } from 'redux';

import { AnyT } from 'core/definition.interface';
import { IApplicationRootState, INITIAL_APPLICATION_ROOT_STATE, rootReducer } from 'core/component/root';
import { IApplicationPermissionsState, INITIAL_PERMISSION_STATE, permissionReducer } from 'core/permission';
import { IApplicationUserState, INITIAL_USER_STATE, userReducer } from 'core/user';
import { IApplicationLayoutState, INITIAL_APPLICATION_LAYOUT_STATE, layoutReducer } from 'core/component/layout';
import {
  IApplicationNotificationState,
  notificationReducer,
  INITIAL_APPLICATION_NOTIFICATION_STATE,
} from 'core/notification';
import { dictionariesReducer, IApplicationDictionariesState } from 'core/dictionary';

export interface IApplicationState<TDictionariesState extends IApplicationDictionariesState,
                                   TPermissionState extends IApplicationPermissionsState<TPermissions>,
                                   TPermissions> {
  root: IApplicationRootState;
  permission: TPermissionState;
  user: IApplicationUserState;
  layout: IApplicationLayoutState;
  notification: IApplicationNotificationState;
  dictionaries: TDictionariesState;
}

export const INITIAL_APPLICATION_STATE: IApplicationState<AnyT,
                                                          IApplicationPermissionsState<AnyT>,
                                                          AnyT> = {
  permission: INITIAL_PERMISSION_STATE,
  root: INITIAL_APPLICATION_ROOT_STATE,
  user: INITIAL_USER_STATE,
  layout: INITIAL_APPLICATION_LAYOUT_STATE,
  notification: INITIAL_APPLICATION_NOTIFICATION_STATE,
  dictionaries: {},
};

export const defaultReducers = {
  permission: permissionReducer,
  root: rootReducer,
  user: userReducer,
  layout: layoutReducer,
  notification: notificationReducer,
  dictionaries: dictionariesReducer,
};
