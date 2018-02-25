import { AnyAction } from 'redux';

import { toSection } from '../../store';

import {
  INITIAL_APPLICATION_FILTER_STATE,
  FILTER_ACTIVATE_ACTION_TYPE,
  IApplicationFilterState,
  FILTER_CHANGE_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
} from './filter.interface';

export function filterReducer(state: IApplicationFilterState = INITIAL_APPLICATION_FILTER_STATE,
                              action: AnyAction): IApplicationFilterState {
  const section = toSection(action);
  switch (action.type) {
    case `${section}.${FILTER_ACTIVATE_ACTION_TYPE}`:
      return {
        ...state,
        active: true,
      };
    case `${section}.${FILTER_CHANGE_ACTION_TYPE}`:
      return {
        ...state,
        query: action.data.query,
      };
    case `${section}.${FILTER_DESTROY_ACTION_TYPE}`:
      return {
        ...INITIAL_APPLICATION_FILTER_STATE,
      };
  }
  return state;
}
