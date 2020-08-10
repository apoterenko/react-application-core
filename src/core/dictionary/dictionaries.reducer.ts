import { IEffectsAction } from 'redux-effects-promise';

import { toSection } from '../util';
import { DictionariesActionBuilder } from '../action';
import {
  IFluxSectionDataEntity,
  INITIAL_REDUX_DICTIONARIES_ENTITY,
  IReduxDictionariesEntity,
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
          progress: true,
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
          progress: false,
        },
      };
    case DictionariesActionBuilder.buildLoadErrorActionType(section):
      return {
        ...state,
        [section]: {
          ...state[section],
          progress: false,
        },
      };
  }
  return state;
};
