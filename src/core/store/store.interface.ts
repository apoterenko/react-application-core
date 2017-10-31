import { AnyAction } from 'redux';

import { AnyT, IKeyValue } from '../definition.interface';
import { IApplicationRootState, rootReducer } from '../component/root';
import { IApplicationPermissionsState, permissionReducer } from '../permission';
import { IApplicationUserState, userReducer } from '../user';
import { IApplicationLayoutState, layoutReducer } from '../component/layout';
import {
  IApplicationTransportState,
  transportReducer,
} from '../transport';
import {
  IApplicationNotificationState,
  notificationReducer,
} from '../notification';
import { dictionariesReducer, IApplicationDictionariesState } from '../dictionary';
import {
  applicationReadyReducer,
  IApplicationReadyState,
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
