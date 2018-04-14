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
  IApplicationTransportWrapperState,
} from '../transport';
import {
  IApplicationNotificationState,
  IApplicationNotificationWrapperState,
  notificationReducer,
} from '../notification';
import { dictionariesReducer } from '../dictionary';
import {
  applicationReducer,
} from '../component/application';
import { permissionsReducer, IApplicationPermissionsState } from '../permissions';
import { stackReducer, IApplicationStackWrapperState } from './stack';
import { channelsReducers } from '../channel';
import { IChannelWrapperEntity, IApplicationWrapperEntity } from '../entities-definitions.interface';
import { universalDefaultReducers } from './universal-default-reducers.interface';

export interface IApplicationState<TDictionaries>
    extends IDictionariesWrapper<TDictionaries>,
            IApplicationTransportWrapperState,
            IApplicationNotificationWrapperState,
            IUserWrapper<IApplicationUserState>,
            IApplicationWrapperEntity,
            IApplicationLayoutWrapperState,
            IApplicationRootWrapperState,
            IApplicationStackWrapperState,
            IChannelWrapperEntity {
}

/* @stable - 01.04.2018 */
export interface IDefaultApplicationState extends IApplicationState<{}> {
}

export const defaultReducers = {
  application: applicationReducer,
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
