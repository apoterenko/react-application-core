import { IEffectsAction } from 'redux-effects-promise';

import { toSection } from '../../util';
import {
  IGenericActiveQueryEntity,
  INITIAL_ACTIVE_QUERY_ENTITY,
  IQueryFluxEntity,
} from '../../definition';
import { FilterActionBuilder } from '../../action';

/**
 * @reducer
 * @stable [27.04.2020]
 *
 * @param {IGenericActiveQueryEntity} state
 * @param {IEffectsAction} action
 * @returns {IGenericActiveQueryEntity}
 */
export const filterReducer = (state: IGenericActiveQueryEntity = INITIAL_ACTIVE_QUERY_ENTITY,
                              action: IEffectsAction): IGenericActiveQueryEntity => {
  const section = toSection(action);
  const actionData = action.data;

  switch (action.type) {
    case FilterActionBuilder.buildActivateActionType(section):
      return {
        ...state,
        active: true,
      };
    case FilterActionBuilder.buildChangeActionType(section):
      return {
        ...state,
        query: (actionData as IQueryFluxEntity).query,
      };
    case FilterActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_ACTIVE_QUERY_ENTITY,
      };
  }
  return state;
};
