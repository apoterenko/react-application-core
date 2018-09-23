import { rootReducer } from '../component/root';
import { notificationReducer } from '../notification';
import { dictionariesReducer } from '../dictionary';
import { permissionsReducer } from '../permissions';
import { stackReducer } from './stack';
import { channelsReducers } from '../channel';
import { entityReducerFactory } from '../store/store.support';
import { USER_UPDATE_ACTION_TYPE, USER_DESTROY_ACTION_TYPE } from '../user/user.interface';
import { defaultLayoutReducer } from '../component/layout/default/default-layout.reducer';

export const defaultReducers = {
  dictionaries: dictionariesReducer,
  permissions: permissionsReducer,
  root: rootReducer,
  user: entityReducerFactory(USER_UPDATE_ACTION_TYPE, USER_DESTROY_ACTION_TYPE),
  layout: defaultLayoutReducer,
  stack: stackReducer,
  notification: notificationReducer,
  ...channelsReducers,
};
