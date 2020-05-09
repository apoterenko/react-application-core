import { IEffectsAction } from 'redux-effects-promise';

import {
  selectData,
  toSection,
} from '../util';
import { DictionariesActionBuilder } from '../action';
import {
  INITIAL_REDUX_DICTIONARIES_ENTITY,
  IReduxDictionariesEntity,
  IFluxSectionDataEntity,
} from '../definition';

/**
 * @stable [12.01.2020]
 * @param {IReduxDictionariesEntity} state
 * @param {IEffectsAction} action
 * @returns {IReduxDictionariesEntity}
 */
export const dictionariesReducer = (state: IReduxDictionariesEntity = INITIAL_REDUX_DICTIONARIES_ENTITY,
                                    action: IEffectsAction): IReduxDictionariesEntity => {
  const section = toSection(action);

  switch (action.type) {
    case DictionariesActionBuilder.buildDestroyActionType():
      return {
        ...INITIAL_REDUX_DICTIONARIES_ENTITY,
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
      const actionData: IFluxSectionDataEntity = action.data;
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
          data: action.data,  // Data from redux-effects-promise
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
