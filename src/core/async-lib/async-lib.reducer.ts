import { AnyAction } from 'redux';

import {
  $RAC_ASYNC_LIB_LOAD_ACTION_TYPE,
  $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE,
  IAsyncLibPayloadEntity,
  INITIAL_REDUX_ASYNC_LIBS_ENTITY,
  IReduxAsyncLibsEntity,
} from '../definition';

/**
 * @stable [08.01.2020]
 * @param {IReduxAsyncLibsEntity} state
 * @param {AnyAction} action
 * @returns {IReduxAsyncLibsEntity}
 */
export const asyncLibReducer = (state: IReduxAsyncLibsEntity = INITIAL_REDUX_ASYNC_LIBS_ENTITY,
                                action: AnyAction): IReduxAsyncLibsEntity => {
  const actionData: IAsyncLibPayloadEntity = action.data;

  switch (action.type) {
    case $RAC_ASYNC_LIB_LOAD_ACTION_TYPE:
      return {
        ...state,
        [actionData.alias]: {
          data: false,
          loading: true,
        },
      };
    case $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE:
      return {
        ...state,
        [actionData.alias]: {
          data: true,
          loading: false,
        },
      };
  }
  return state;
};
