import { AnyAction, Reducer } from 'redux';

import {
  defaultLayoutReducer,
  notificationReducer,
} from '../component/reducers';
import { dictionariesReducer } from '../dictionary';
import { PERMISSIONS_DESTROY_ACTION_TYPE, PERMISSIONS_UPDATE_ACTION_TYPE } from '../permissions';
import { stackReducer } from './stack';
import { channelsReducers } from '../channel';
import { makeEntityReducer } from '../store/store.support';
import { IStackEntity, ILayoutEntity } from '../definition';
import { $RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY } from '../definition';
import { asyncLibReducer } from '../async-lib';

// TODO refactoring
export const defaultReducers = {
  asyncLibs: asyncLibReducer,
  dictionaries: dictionariesReducer,
  permissions: makeEntityReducer({
    select: PERMISSIONS_UPDATE_ACTION_TYPE,
    destroy: PERMISSIONS_DESTROY_ACTION_TYPE,
  }),
  user: makeEntityReducer($RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY),
  layout: defaultLayoutReducer,
  stack: stackReducer,
  notification: notificationReducer,
  ...channelsReducers,
};
