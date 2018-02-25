import { AnyAction } from 'redux';

import { IKeyValue } from '../definition.interface';
import {
  IApplicationRootState,
  IApplicationRootWrapperState,
  rootReducer,
} from '../component/root';

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
import { permissionsReducer, IApplicationPermissionsState } from '../permissions';
import { stackReducer, IApplicationStackWrapperState } from './stack';

export interface IApplicationState<TDictionariesState extends IApplicationDictionariesState>
    extends IApplicationDictionariesWrapperState,
            IApplicationTransportWrapperState,
            IApplicationNotificationWrapperState,
            IApplicationUserWrapperState,
            IApplicationLayoutWrapperState,
            IApplicationRootWrapperState,
            IApplicationStackWrapperState {
  applicationReady: IApplicationReadyState;
}

export type ApplicationStateT = IApplicationState<IApplicationDictionariesState>;

export const defaultReducers = {
  applicationReady: applicationReadyReducer,
  dictionaries: dictionariesReducer,
  permissions: permissionsReducer,
  root: rootReducer,
  user: userReducer,
  layout: layoutReducer,
  stack: stackReducer,
  notification: notificationReducer,
  transport: transportReducer,
};
