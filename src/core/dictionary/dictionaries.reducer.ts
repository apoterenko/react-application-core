import { AnyAction } from 'redux';

import { toSection } from '../util';
import { DictionariesActionBuilder } from './dictionaries-action.builder';
import {
  $RAC_DICTIONARIES_DESTROY_ACTION_TYPE,
  IDictionariesEntity,
  INITIAL_DICTIONARIES_ENTITY,
  ISectionDataEntity,
} from '../definition';

/**
 * @stable [05.12.2019]
 * @param {IDictionariesEntity} state
 * @param {AnyAction} action
 * @returns {IDictionariesEntity}
 */
export const dictionariesReducer = (state: IDictionariesEntity = INITIAL_DICTIONARIES_ENTITY,
                                    action: AnyAction): IDictionariesEntity => {
  const section = toSection(action);
  const actionData: ISectionDataEntity = action.data;

  switch (action.type) {
    case $RAC_DICTIONARIES_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_DICTIONARIES_ENTITY,
      };
    case DictionariesActionBuilder.buildLoadActionType(section):
      return {
        ...state,
        [section]: {
          data: null,
          loading: true,
        },
      };
    case DictionariesActionBuilder.buildSetActionType(section):
      return {
        ...state,
        [section]: {
          data: actionData.data,
        },
      };
    case DictionariesActionBuilder.buildLoadDoneActionType(section):
      return {
        ...state,
        [section]: {
          data: actionData,  // Data from redux-effects-promise
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
};
