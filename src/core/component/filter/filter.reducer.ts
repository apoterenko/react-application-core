import { AnyAction } from 'redux';

import { toSection } from '../../util';
import {
  FILTER_CHANGE_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
} from './filter.interface';
import {
  IGenericActiveQueryEntity,
  INITIAL_ACTIVE_QUERY_ENTITY,
} from '../../definition';
import { IQueryWrapper } from '../../definitions.interface';
import { FilterActionBuilder } from './filter-action.builder';

export function filterReducer(state: IGenericActiveQueryEntity = INITIAL_ACTIVE_QUERY_ENTITY,
                              action: AnyAction): IGenericActiveQueryEntity {
  const section = toSection(action);
  switch (action.type) {
    case FilterActionBuilder.buildActivateActionType(section):
      return {
        ...state,
        active: true,
      };
    case `${section}.${FILTER_CHANGE_ACTION_TYPE}`:
      const data: IQueryWrapper = action.data;
      return {
        ...state,
        query: data.query,
      };
    case `${section}.${FILTER_DESTROY_ACTION_TYPE}`:
      return {
        ...INITIAL_ACTIVE_QUERY_ENTITY,
      };
  }
  return state;
}
