import { AnyAction } from 'redux';

import {
  $RAC_ASYNC_LIB_LOAD_ACTION_TYPE,
  $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE,
  IAsyncLibPayloadEntity,
  IAsyncLibsEntity,
  INITIAL_ASYNC_LIBS_ENTITY,
} from '../definition';

/**
 * @stable [08.01.2020]
 * @param {IAsyncLibsEntity} state
 * @param {AnyAction} action
 * @returns {IAsyncLibsEntity}
 */
export const asyncLibReducer = (state: IAsyncLibsEntity = INITIAL_ASYNC_LIBS_ENTITY,
                                action: AnyAction): IAsyncLibsEntity => {
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
