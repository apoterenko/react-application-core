import { AnyAction } from 'redux';

import { toSection } from '../../util';
import {
  INITIAL_APPLICATION_FILTER_STATE,
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_CHANGE_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
} from './filter.interface';
import { IQueryFilterEntity } from '../../entities-definitions.interface';

export function filterReducer(state: IQueryFilterEntity = INITIAL_APPLICATION_FILTER_STATE,
                              action: AnyAction): IQueryFilterEntity {
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
