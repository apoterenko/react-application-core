import {
  IDictionariesWrapper,
} from '../definitions.interface';
import {
  rootReducer,
} from '../component/root';
import { userReducer } from '../user';
import {
  layoutReducer,
} from '../component/layout';
import {
  notificationReducer,
} from '../notification';
import { dictionariesReducer } from '../dictionary';
import {
  applicationReducer,
} from '../component/application';
import { permissionsReducer } from '../permissions';
import { stackReducer } from './stack';
import { channelsReducers } from '../channel';
import {
  IUserWrapperEntity,
  IChannelWrapperEntity,
  IApplicationWrapperEntity,
  IStackWrapperEntity,
  ILayoutWrapperEntity,
  ITransportWrapperEntity,
  IRootWrapperEntity,
  INotificationWrapperEntity,
} from '../entities-definitions.interface';
import { universalDefaultReducers } from './universal-default-reducers.interface';

export interface IApplicationState<TDictionaries>
    extends IDictionariesWrapper<TDictionaries>,
            IApplicationWrapperEntity,
            IRootWrapperEntity,
            IUserWrapperEntity,
            ILayoutWrapperEntity,
            ITransportWrapperEntity,
            IStackWrapperEntity,
            INotificationWrapperEntity,
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
