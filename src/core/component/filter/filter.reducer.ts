import { AnyAction } from 'redux';

import { toSection } from 'core/store';

import {
  INITIAL_APPLICATION_FILTER_STATE,
  FILTER_ACTIVATE_ACTION_TYPE,
  IApplicationFilterState,
  FILTER_QUERY_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
} from './filter.interface';
import { FilterActionBuilder } from './filter-action.builder';

export function filterReducer(state: IApplicationFilterState = INITIAL_APPLICATION_FILTER_STATE,
                              action: AnyAction): IApplicationFilterState {
  const section = toSection(action);
  switch (action.type) {
    case FilterActionBuilder.buildLockActionType(section):
      return {
        ...state,
        locked: true,
      };
    case `${section}.${FILTER_ACTIVATE_ACTION_TYPE}`:
      return {
        ...state,
        activated: true,
      };
    case `${section}.${FILTER_QUERY_ACTION_TYPE}`:
      return {
        ...state,
        query: action.data.query,
      };
    case `${section}.${FILTER_DESTROY_ACTION_TYPE}`:
      return state.locked
          ? {
            ...state,
            locked: false,
          }
          : {
            ...INITIAL_APPLICATION_FILTER_STATE,
          };
  }
  return state;
}
