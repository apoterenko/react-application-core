import { AnyAction, Reducer } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';

import {
  defaultLayoutReducer,
  notificationReducer,
} from '../component/reducers';
import { dictionariesReducer } from '../dictionary';
import { PERMISSIONS_DESTROY_ACTION_TYPE, PERMISSIONS_UPDATE_ACTION_TYPE } from '../permissions';
import { stackReducer } from './stack';
import { channelReducer } from '../channel';
import {
  IReduxAsyncLibsEntity,
  IReduxDictionariesEntity,
  IReduxLayoutEntity,
  IReduxNotificationEntity,
  IReduxStackEntity,
} from '../definition';
import { $RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY } from '../definition';
import { asyncLibReducer } from '../async-lib';
import { ReducerUtils } from '../util';

// TODO refactoring
export const defaultReducers = {
  asyncLibs: asyncLibReducer,
  dictionaries: dictionariesReducer,
  permissions: ReducerUtils.entityReducer({
    select: PERMISSIONS_UPDATE_ACTION_TYPE,
    destroy: PERMISSIONS_DESTROY_ACTION_TYPE,
  }),
  user: ReducerUtils.entityReducer($RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY),
  layout: defaultLayoutReducer,
  stack: stackReducer,
  notification: notificationReducer,
  channel: channelReducer,
};
