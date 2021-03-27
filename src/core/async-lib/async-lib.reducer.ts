import { IEffectsAction } from 'redux-effects-promise';

import {
  $RAC_ASYNC_LIB_LOAD_ACTION_TYPE,
  $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE,
  IAsyncLibFluxEntity,
  INITIAL_REDUX_ASYNC_LIBS_ENTITY,
  IReduxAsyncLibsEntity,
} from '../definition';
import { ObjectUtils } from '../util';

/**
 * @reducer
 * @stable [27.03.2021]
 * @param state
 * @param action
 */
export const asyncLibReducer = (state: IReduxAsyncLibsEntity = INITIAL_REDUX_ASYNC_LIBS_ENTITY,
                                action: IEffectsAction): IReduxAsyncLibsEntity => {
  const fluxEntity: IAsyncLibFluxEntity = action.data;
  const {
    alias,
  } = fluxEntity?.payload || ObjectUtils.EMPTY_OBJECT;

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
