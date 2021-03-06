import { IEffectsAction } from 'redux-effects-promise';

import {
  IFluxNumberEntity,
  IGenericTabPanelEntity,
  INITIAL_REDUX_TAB_PANEL_ENTITY,
  IReduxTabPanelEntity,
} from '../../definition';
import { TabPanelActionBuilder } from '../../action';
import { Selectors } from '../../util';

/**
 * @stable [12.04.2020]
 * @param {IGenericTabPanelEntity} state
 * @param {IEffectsAction} action
 * @returns {IGenericTabPanelEntity}
 */
export const tabPanelReducer = (state: IReduxTabPanelEntity = INITIAL_REDUX_TAB_PANEL_ENTITY,
                                action: IEffectsAction): IReduxTabPanelEntity => {
  const section = Selectors.sectionFromAction(action);
  const activeValueFluxEntity: IFluxNumberEntity = action.data;

  switch (action.type) {
    case TabPanelActionBuilder.buildDestroyActionType(section):
      return {};
    case TabPanelActionBuilder.buildActiveValueActionType(section):
      return {
        ...state,
        activeValue: activeValueFluxEntity.payload,
      };
  }
  return state;
};
