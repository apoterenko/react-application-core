import { AnyAction } from 'redux';

import { ILayoutEntity, LayoutModeEnum, IXYEntity } from '../../../entities-definitions.interface';
import {
  LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
  INITIAL_APPLICATION_LAYOUT_STATE,
  LAYOUT_DESTROY_ACTION_TYPE,
  LAYOUT_XY_UPDATE_ACTION_TYPE,
} from '../layout.interface';
import { IPayloadWrapper, StringNumberT } from '../../../definitions.interface';

/**
 * @stable [23.09.2018]
 * @param {ILayoutEntity} state
 * @param {AnyAction} action
 * @returns {ILayoutEntity}
 */
export const defaultLayoutReducer = (state: ILayoutEntity = INITIAL_APPLICATION_LAYOUT_STATE,
                                     action: AnyAction): ILayoutEntity => {
  switch (action.type) {
    case LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE:
      const expandedGroupPayloadWrapper: IPayloadWrapper<StringNumberT> = action.data;
      return {
        ...state,
        expandedGroups: {
          [expandedGroupPayloadWrapper.payload]: !state.expandedGroups[expandedGroupPayloadWrapper.payload],
        },
      };
    case LAYOUT_XY_UPDATE_ACTION_TYPE:
      const xyPayloadWrapper: IPayloadWrapper<IXYEntity> = action.data;
      return {
        ...state,
        ...xyPayloadWrapper.payload,
      };
    case LAYOUT_MODE_UPDATE_ACTION_TYPE:
      const modePayloadWrapper: IPayloadWrapper<LayoutModeEnum> = action.data;
      return {
        ...state,
        mode: modePayloadWrapper.payload === LayoutModeEnum.FULL ? LayoutModeEnum.MINIMAL : LayoutModeEnum.FULL,
      };
    case LAYOUT_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_APPLICATION_LAYOUT_STATE,
      };
  }
  return state;
};
