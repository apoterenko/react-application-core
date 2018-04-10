import { AnyAction } from 'redux';

import { IKeyValue, IUserWrapper, IDictionariesWrapper } from '../definitions.interface';
import {
  IApplicationRootState,
  IApplicationRootWrapperState,
  rootReducer,
} from '../component/root';

import { IApplicationUserState, userReducer } from '../user';
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
import { dictionariesReducer } from '../dictionary';
import {
  applicationReadyReducer,
  IApplicationReadyState,
} from '../component/application';
import { permissionsReducer, IApplicationPermissionsState } from '../permissions';
import { stackReducer, IApplicationStackWrapperState } from './stack';
import { channelReducer, channelsReducers } from '../channel';
import { filter } from './reducer.filter';
import { IChannelWrapperEntity } from '../entities-definitions.interface';
import { universalDefaultReducers } from './universal-default-reducers.interface';

export interface IApplicationState<TDictionaries>
    extends IDictionariesWrapper<TDictionaries>,
            IApplicationTransportWrapperState,
            IApplicationNotificationWrapperState,
            IUserWrapper<IApplicationUserState>,
            IApplicationLayoutWrapperState,
            IApplicationRootWrapperState,
            IApplicationStackWrapperState,
            IChannelWrapperEntity {
  applicationReady: IApplicationReadyState;
}

/* @stable - 01.04.2018 */
export interface IDefaultApplicationState extends IApplicationState<{}> {
}

export const defaultReducers = {
  applicationReady: applicationReadyReducer,
  dictionaries: dictionariesReducer,
  permissions: permissionsReducer,
  root: rootReducer,
  user: userReducer,
  layout: layoutReducer,
  stack: stackReducer,
  notification: notificationReducer,
  ...universalDefaultReducers,
  ...channelsReducers,
};
