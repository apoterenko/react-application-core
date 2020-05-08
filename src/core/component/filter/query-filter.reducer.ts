import { IEffectsAction } from 'redux-effects-promise';

import { toSection } from '../../util';
import {
  IFluxQueryEntity,
  INITIAL_REDUX_ACTIVE_QUERY_ENTITY,
  IReduxActiveQueryEntity,
} from '../../definition';
import { FilterActionBuilder } from '../../action';

/**
 * @reducer
 * @stable [08.05.2020]
 *
 * @param {IReduxActiveQueryEntity} state
 * @param {IEffectsAction} action
 * @returns {IReduxActiveQueryEntity}
 */
export const queryFilterReducer = (state: IReduxActiveQueryEntity = INITIAL_REDUX_ACTIVE_QUERY_ENTITY,
                                   action: IEffectsAction): IReduxActiveQueryEntity => {
  const section = toSection(action);
  const actionData: IFluxQueryEntity = action.data;

  switch (action.type) {
    case FilterActionBuilder.buildActivateActionType(section):
      return {
        ...state,
        active: true,
      };
    case FilterActionBuilder.buildChangeActionType(section):
      return {
        ...state,
        query: actionData.query,
      };
    case FilterActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_REDUX_ACTIVE_QUERY_ENTITY,
      };
  }
  return state;
};
