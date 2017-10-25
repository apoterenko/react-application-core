import { AnyAction } from 'redux';

import { AnyT, IKeyValue } from '../definition.interface';
import { IApplicationRootState, INITIAL_APPLICATION_ROOT_STATE, rootReducer } from '../component/root';
import { IApplicationPermissionsState, INITIAL_PERMISSION_STATE, permissionReducer } from '../permission';
import { IApplicationUserState, userReducer } from '../user';
import { IApplicationLayoutState, INITIAL_APPLICATION_LAYOUT_STATE, layoutReducer } from '../component/layout';
import {
  IApplicationTransportState,
  INITIAL_APPLICATION_TRANSPORT_STATE,
  transportReducer,
} from '../transport';
import {
  IApplicationNotificationState,
  notificationReducer,
  INITIAL_APPLICATION_NOTIFICATION_STATE,
} from '../notification';
import { dictionariesReducer, IApplicationDictionariesState } from '../dictionary';
import {
  applicationReadyReducer,
  IApplicationReadyState,
  INITIAL_APPLICATION_READY_STATE,
} from '../component/application';

export interface IApplicationState<TDictionariesState extends IApplicationDictionariesState,
                                   TPermissionState extends IApplicationPermissionsState<TPermissions>,
                                   TPermissions> {
  applicationReady: IApplicationReadyState;
  root: IApplicationRootState;
  permission: TPermissionState;
  user: IApplicationUserState;
  layout: IApplicationLayoutState;
  notification: IApplicationNotificationState;
  dictionaries: TDictionariesState;
  transport: IApplicationTransportState;
}

export type ApplicationStateT = IApplicationState<IApplicationDictionariesState,
                                                  IApplicationPermissionsState<{}>,
                                                  {}>;

export const INITIAL_APPLICATION_STATE: IApplicationState<IApplicationDictionariesState,
                                                          IApplicationPermissionsState<AnyT>,
                                                          AnyT> = {
  applicationReady: INITIAL_APPLICATION_READY_STATE,
  permission: INITIAL_PERMISSION_STATE,
  root: INITIAL_APPLICATION_ROOT_STATE,
  layout: INITIAL_APPLICATION_LAYOUT_STATE,
  notification: INITIAL_APPLICATION_NOTIFICATION_STATE,
  transport: INITIAL_APPLICATION_TRANSPORT_STATE,
  dictionaries: {},
  user: {},
};

export const defaultReducers = {
  applicationReady: applicationReadyReducer,
  permission: permissionReducer,
  root: rootReducer,
  user: userReducer,
  layout: layoutReducer,
  notification: notificationReducer,
  dictionaries: dictionariesReducer,
  transport: transportReducer,
};
