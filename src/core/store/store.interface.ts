import { AnyAction, Reducer } from 'redux';

import { notificationReducer } from '../notification';
import { dictionariesReducer } from '../dictionary';
import { PERMISSIONS_DESTROY_ACTION_TYPE, PERMISSIONS_UPDATE_ACTION_TYPE } from '../permissions';
import { stackReducer } from './stack';
import { channelsReducers } from '../channel';
import { entityReducerFactory, makeEntityReducerFactory } from '../store/store.support';
import { USER_UPDATE_ACTION_TYPE, USER_DESTROY_ACTION_TYPE } from '../user/user.interface';
import { defaultLayoutReducer } from '../component/layout/default/default-layout.reducer';
import { ILayoutEntity } from '../entities-definitions.interface';
import { IStackEntity } from '../definition';

export const defaultReducers = {
  dictionaries: dictionariesReducer,
  permissions: makeEntityReducerFactory({
    select: PERMISSIONS_UPDATE_ACTION_TYPE,
    destroy: PERMISSIONS_DESTROY_ACTION_TYPE,
  }),
  user: entityReducerFactory(USER_UPDATE_ACTION_TYPE, USER_DESTROY_ACTION_TYPE),
  layout: defaultLayoutReducer,
  stack: stackReducer,
  notification: notificationReducer,
  ...channelsReducers,
};
