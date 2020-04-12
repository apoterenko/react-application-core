import { IEffectsAction } from 'redux-effects-promise';

import {
  IActiveValueFluxEntity,
  IGenericTabPanelEntity,
  INITIAL_TAB_PANEL_ENTITY,
} from '../../definition';
import { TabPanelActionBuilder } from '../../action';
import { toSection } from '../../util';

/**
 * @stable [12.04.2020]
 * @param {IGenericTabPanelEntity} state
 * @param {IEffectsAction} action
 * @returns {IGenericTabPanelEntity}
 */
export const tabPanelReducer = (state: IGenericTabPanelEntity = INITIAL_TAB_PANEL_ENTITY,
                                action: IEffectsAction): IGenericTabPanelEntity => {
  const section = toSection(action);
  const activeValueFluxEntity: IActiveValueFluxEntity = action.data;

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
