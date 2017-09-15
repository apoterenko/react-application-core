import { IEffectsAction } from 'redux-effects-promise';

import { IAttributedEntity, } from 'core/definition.interface';
import { toSection } from 'core/store';

import {
  LIST_UPDATE_ACTION_TYPE,
  INITIAL_APPLICATION_LIST_STATE,
  LIST_DESELECT_ACTION_TYPE,
  LIST_DESTROY_ACTION_TYPE,
  LIST_LOAD_ACTION_TYPE,
  LIST_LOAD_DONE_ACTION_TYPE,
  LIST_LOAD_ERROR_ACTION_TYPE,
  LIST_LOCK_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
  IApplicationListState,
} from './list.interface';

export function listReducer(state: IApplicationListState = INITIAL_APPLICATION_LIST_STATE,
                            action: IEffectsAction): IApplicationListState {
  const section = toSection(action);
  switch (action.type) {
    case `${section}.${LIST_LOAD_ACTION_TYPE}`:
      return {
        ...state,
        progress: true,
      };
    case `${section}.${LIST_LOCK_ACTION_TYPE}`:
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
    case `${section}.${LIST_SELECT_ACTION_TYPE}`:
      return {
        ...state,
        selected: action.data.selected,
      };
    case `${section}.${LIST_DESELECT_ACTION_TYPE}`:
      return {
        ...state,
        selected: null,
      };
    case `${section}.${LIST_UPDATE_ACTION_TYPE}`:
      if (state.data && state.data.length) {
        const record = action.data as IAttributedEntity;
        return {
          ...state,
          data: state.data.map((item) => (
              item.id === record.id
                  ? {...item, ...record.data}
                  : item
          )),
        };
      }
      break;
  }
  return state;
}
