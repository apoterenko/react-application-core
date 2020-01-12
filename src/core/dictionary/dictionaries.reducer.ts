import { IEffectsAction } from 'redux-effects-promise';

import {
  selectDataFromAction,
  toSection,
} from '../util';
import { DictionariesActionBuilder } from '../action';
import {
  $RAC_DICTIONARIES_DESTROY_ACTION_TYPE,
  IDictionariesEntity,
  INITIAL_DICTIONARIES_ENTITY,
  ISectionDataEntity,
} from '../definition';

/**
 * @stable [12.01.2020]
 * @param {IDictionariesEntity} state
 * @param {IEffectsAction} action
 * @returns {IDictionariesEntity}
 */
export const dictionariesReducer = (state: IDictionariesEntity = INITIAL_DICTIONARIES_ENTITY,
                                    action: IEffectsAction): IDictionariesEntity => {
  const section = toSection(action);
  const actionData = selectDataFromAction<ISectionDataEntity>(action);

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
