import { IEffectsAction } from 'redux-effects-promise';

import { IGenericTabPanelEntity } from '../../definition';
import { IPayloadWrapper } from '../../definitions.interface';
import { TabPanelActionBuilder } from './tabpanel-action.builder';
import { toSection } from '../../util';

/**
 * @stable [30.08.2018]
 * @param {ITabPanelEntity} state
 * @param {IEffectsAction} action
 * @returns {ITabPanelEntity}
 */
export const tabPanelReducer = (state: IGenericTabPanelEntity = {},
                                action: IEffectsAction): IGenericTabPanelEntity => {
  const section = toSection(action);
  switch (action.type) {
    case TabPanelActionBuilder.buildDestroyActionType(section):
      return {};
    case TabPanelActionBuilder.buildActivateActionType(section):
      const payloadWrapper: IPayloadWrapper<number> = action.data;
      return {
        ...state,
        activeValue: payloadWrapper.payload,
      };
  }
  return state;
};
