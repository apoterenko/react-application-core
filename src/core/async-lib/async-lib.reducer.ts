import { IEffectsAction } from 'redux-effects-promise';

import {
  $RAC_ASYNC_LIB_LOAD_ACTION_TYPE,
  $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE,
  IAsyncLibEntity,
  INITIAL_REDUX_ASYNC_LIBS_ENTITY,
  IReduxAsyncLibsEntity,
} from '../definition';
import {
  ObjectUtils,
  Selectors,
} from '../util';

/**
 * @reducer
 * @stable [30.04.2021]
 * @param state
 * @param action
 */
export const asyncLibReducer = (state: IReduxAsyncLibsEntity = INITIAL_REDUX_ASYNC_LIBS_ENTITY,
                                action: IEffectsAction): IReduxAsyncLibsEntity => {
  const {
    alias,
  } = Selectors.payloadFromAction<IAsyncLibEntity>(action) || ObjectUtils.EMPTY_OBJECT as IAsyncLibEntity;

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
