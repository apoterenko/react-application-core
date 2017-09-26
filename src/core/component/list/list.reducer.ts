import { IEffectsAction } from 'redux-effects-promise';

import { toSection } from 'core/store';

import { ListActionBuilder } from './list-action.builder';
import {
  INITIAL_APPLICATION_LIST_STATE,
  LIST_DESTROY_ACTION_TYPE,
  LIST_LOAD_DONE_ACTION_TYPE,
  LIST_LOAD_ERROR_ACTION_TYPE,
  IApplicationListState,
} from './list.interface';

export function listReducer(state: IApplicationListState = INITIAL_APPLICATION_LIST_STATE,
                            action: IEffectsAction): IApplicationListState {
  const section = toSection(action);
  const payload = action.data && action.data.payload;

  switch (action.type) {
    case ListActionBuilder.buildLoadActionType(section):
      return {
        ...state,
        progress: true,
      };
    case ListActionBuilder.buildLockActionType(section):
      return {
        ...state,
        locked: true,
      };
    case `${section}.${LIST_DESTROY_ACTION_TYPE}`:
      return state.locked
          ? {
            ...state,
            locked: false,
          }
          : {
            ...INITIAL_APPLICATION_LIST_STATE,
          };
    case `${section}.${LIST_LOAD_DONE_ACTION_TYPE}`:
      return {
        ...state,
        progress: false,
        data: action.data,
      };
    case `${section}.${LIST_LOAD_ERROR_ACTION_TYPE}`:
      return {
        ...state,
        progress: false,
      };
    case ListActionBuilder.buildSelectActionType(section):
      return {
        ...state,
        selected: action.data.selected,
      };
    case ListActionBuilder.buildDeselectActionType(section):
      return {
        ...state,
        selected: null,
      };
    case ListActionBuilder.buildUpdateActionType(section):
      if (state.data && state.data.length) {
        return {
          ...state,
          data: state.data.map((item) => (
              item.id === payload.id
                  ? {...item, ...payload.changes}
                  : item
          )),
        };
      }
      break;
    case ListActionBuilder.buildInsertActionType(section):
      return {
        ...state,
        data: (state.data || []).concat({ ...payload.changes }),
      };
    default:
      return state;
  }
}
