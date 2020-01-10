import { AnyAction, Reducer } from 'redux';

import { notificationReducer } from '../notification';
import { dictionariesReducer } from '../dictionary';
import { PERMISSIONS_DESTROY_ACTION_TYPE, PERMISSIONS_UPDATE_ACTION_TYPE } from '../permissions';
import { stackReducer } from './stack';
import { channelsReducers } from '../channel';
import { makeEntityReducerFactory } from '../store/store.support';
import { defaultLayoutReducer } from '../component/layout/default/default-layout.reducer';
import { IStackEntity, ILayoutEntity } from '../definition';
import { $RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY } from '../definition';
import { asyncLibReducer } from '../async-lib';

// TODO refactoring
export const defaultReducers = {
  asyncLibs: asyncLibReducer,
  dictionaries: dictionariesReducer,
  permissions: makeEntityReducerFactory({
    select: PERMISSIONS_UPDATE_ACTION_TYPE,
    destroy: PERMISSIONS_DESTROY_ACTION_TYPE,
  }),
  user: makeEntityReducerFactory($RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY),
  layout: defaultLayoutReducer,
  stack: stackReducer,
  notification: notificationReducer,
  ...channelsReducers,
};
