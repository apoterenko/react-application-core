import { AnyAction } from 'redux';

import {
  $RAC_ASYNC_LIB_LOAD_ACTION_TYPE,
  $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE,
  IAsyncLibFluxEntity,
  INITIAL_REDUX_ASYNC_LIBS_ENTITY,
  IReduxAsyncLibsEntity,
} from '../definition';

/**
 * @reducer
 * @stable [26.03.2021]
 * @param state
 * @param action
 */
export const asyncLibReducer = (state: IReduxAsyncLibsEntity = INITIAL_REDUX_ASYNC_LIBS_ENTITY,
                                action: AnyAction): IReduxAsyncLibsEntity => {
  const fluxEntity: IAsyncLibFluxEntity = action.data;
  const {alias} = fluxEntity?.payload || {};

  switch (action.type) {
    case $RAC_ASYNC_LIB_LOAD_ACTION_TYPE:
      return {
        ...state,
        [alias]: {
          data: false,
          loading: true,
        },
      };
    case $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE:
      return {
        ...state,
        [alias]: {
          data: true,
          loading: false,
        },
      };
  }
  return state;
};
