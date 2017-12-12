import { AnyAction } from 'redux';

import { IKeyValue } from '../definition.interface';
import {
  IApplicationRootState,
  IApplicationRootWrapperState,
  rootReducer,
} from '../component/root';
import { IApplicationPermissionsState, permissionReducer } from '../permission';
import { IApplicationUserWrapperState, IApplicationUserState, userReducer } from '../user';
import {
  IApplicationLayoutState,
  IApplicationLayoutWrapperState,
  layoutReducer,
} from '../component/layout';
import {
  IApplicationTransportState,
  IApplicationTransportWrapperState,
  transportReducer,
} from '../transport';
import {
  IApplicationNotificationState,
  IApplicationNotificationWrapperState,
  notificationReducer,
} from '../notification';
import {
  dictionariesReducer,
  IApplicationDictionariesState,
  IApplicationDictionariesWrapperState
} from '../dictionary';
import {
  applicationReadyReducer,
  IApplicationReadyState,
} from '../component/application';
import { IApplicationLockWrapperState, IApplicationLockState, lockReducer } from '../lock';

export interface IApplicationState<TDictionariesState extends IApplicationDictionariesState,
                                   TPermissionState extends IApplicationPermissionsState<TPermissions>,
                                   TPermissions>
    extends IApplicationDictionariesWrapperState,
            IApplicationTransportWrapperState,
            IApplicationNotificationWrapperState,
            IApplicationUserWrapperState,
            IApplicationLayoutWrapperState,
            IApplicationRootWrapperState,
            IApplicationLockWrapperState {
  applicationReady: IApplicationReadyState;
  permission: TPermissionState;
}

export type ApplicationStateT = IApplicationState<IApplicationDictionariesState,
                                                  IApplicationPermissionsState<{}>,
                                                  {}>;

export const defaultReducers = {
  applicationReady: applicationReadyReducer,
  dictionaries: dictionariesReducer,
  permission: permissionReducer,
  root: rootReducer,
  user: userReducer,
  layout: layoutReducer,
  lock: lockReducer,
  notification: notificationReducer,
  transport: transportReducer,
};
