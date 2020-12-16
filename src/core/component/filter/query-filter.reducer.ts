import { IEffectsAction } from 'redux-effects-promise';

import { Selectors } from '../../util';
import {
  IQueryEntity,
  INITIAL_REDUX_QUERY_FILTER_ENTITY,
  IReduxQueryFilterEntity,
} from '../../definition';
import { FilterActionBuilder } from '../../action';

/**
 * @reducer
 * @stable [08.05.2020]
 *
 * @param {IReduxQueryFilterEntity} state
 * @param {IEffectsAction} action
 * @returns {IReduxQueryFilterEntity}
 */
export const queryFilterReducer = (state: IReduxQueryFilterEntity = INITIAL_REDUX_QUERY_FILTER_ENTITY,
                                   action: IEffectsAction): IReduxQueryFilterEntity => {
  const section = Selectors.sectionFromAction(action);
  const actionData: IQueryEntity = action.data;

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
        ...INITIAL_REDUX_QUERY_FILTER_ENTITY,
      };
  }
  return state;
};
