import { AnyAction } from 'redux';

import { toSection } from '../store';
import { excludeFieldsFilter } from '../util';
import {
  IApplicationDictionariesState,
  DICTIONARIES_DESTROY_ACTION_TYPE,
  INITIAL_DICTIONARIES_STATE,
} from './dictionaries.interface';
import { DictionariesActionBuilder } from './dictionaries-action.builder';

export function dictionariesReducer(state: IApplicationDictionariesState = INITIAL_DICTIONARIES_STATE,
                                    action: AnyAction): IApplicationDictionariesState {
  const section = toSection(action);
  switch (action.type) {
    case DICTIONARIES_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_DICTIONARIES_STATE,
      };
    case DictionariesActionBuilder.buildClearActionType(section):
      return excludeFieldsFilter(state, section);
    case DictionariesActionBuilder.buildLoadActionType(section):
      return {
        ...state,
        [section]: {
          data: null,
          loading: true,
        },
      };
    case DictionariesActionBuilder.buildLoadDoneActionType(section):
      return {
        ...state,
        [section]: {
          data: action.data,
          loading: false,
        },
      };
    case DictionariesActionBuilder.buildLoadErrorActionType(section):
      return {
        ...state,
        [section]: {
          ...state[section],
          loading: false,
        },
      };
  }
  return state;
}
