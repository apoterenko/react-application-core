import { AnyAction } from 'redux';

import {
  LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
  LAYOUT_DESTROY_ACTION_TYPE,
  LAYOUT_XY_UPDATE_ACTION_TYPE,
} from '../layout.interface';
import { IPayloadWrapper, StringNumberT } from '../../../definitions.interface';
import {
  IGenericLayoutEntity,
  INITIAL_LAYOUT_ENTITY,
  IXYPayloadEntity,
  LayoutModesEnum,
} from '../../../definition';

/**
 * @stable [23.09.2018]
 * @param {IGenericLayoutEntity} state
 * @param {AnyAction} action
 * @returns {IGenericLayoutEntity}
 */
export const defaultLayoutReducer = (state: IGenericLayoutEntity = INITIAL_LAYOUT_ENTITY,
                                     action: AnyAction): IGenericLayoutEntity => {
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
      const xyPayloadWrapper: IXYPayloadEntity = action.data;
      return {
        ...state,
        ...xyPayloadWrapper.payload,
      };
    case LAYOUT_MODE_UPDATE_ACTION_TYPE:
      const modePayloadWrapper: IPayloadWrapper<LayoutModesEnum> = action.data;
      return {
        ...state,
        mode: modePayloadWrapper.payload === LayoutModesEnum.FULL ? LayoutModesEnum.MINIMAL : LayoutModesEnum.FULL,
      };
    case LAYOUT_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_LAYOUT_ENTITY,
      };
  }
  return state;
};
