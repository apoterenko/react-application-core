import { IEffectsAction } from 'redux-effects-promise';

import { toSection } from '../../util';
import { IPayloadWrapper } from '../../definitions.interface';
import { TabPanelActionBuilder } from './tabpanel-action.builder';
import { ITabPanelEntity } from '../../entities-definitions.interface';

/**
 * @stable [30.08.2018]
 * @param {ITabPanelEntity} state
 * @param {IEffectsAction} action
 * @returns {ITabPanelEntity}
 */
export function tabPanelReducer(state: ITabPanelEntity = {},
                                action: IEffectsAction): ITabPanelEntity {
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
}
