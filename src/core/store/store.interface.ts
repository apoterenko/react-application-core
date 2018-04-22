import { AnyAction } from 'redux';

import { rootReducer } from '../component/root';
import { userReducer } from '../user';
import { layoutReducer } from '../component/layout';
import { notificationReducer } from '../notification';
import { dictionariesReducer } from '../dictionary';
import { applicationReducer } from '../component/application';
import { permissionsReducer } from '../permissions';
import { stackReducer } from './stack';
import { channelsReducers } from '../channel';
import { universalDefaultReducers } from './universal-default-reducers.interface';

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
