import { AnyAction } from 'redux';

import { toSection } from 'core/store/reducer.filter';

import { IApplicationDictionariesState } from './dictionaries.interface';
import { DictionariesActionBuilder } from './dictionaries-action.builder';

export function dictionariesReducer(state: IApplicationDictionariesState = {},
                                    action: AnyAction): IApplicationDictionariesState {
  const section = toSection(action);
  switch (action.type) {
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
