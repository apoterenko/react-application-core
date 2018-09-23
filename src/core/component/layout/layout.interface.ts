import { ILayoutEntity, LayoutModeEnum } from '../../entities-definitions.interface';
import { ACTION_PREFIX } from '../../definitions.interface';

/**
 * @stable [23.09.2018]
 */
export const INITIAL_APPLICATION_LAYOUT_STATE: ILayoutEntity = {
  x: 0,
  y: 0,
  mode: LayoutModeEnum.FULL,
  expandedGroups: {},
};

export const LAYOUT_XY_UPDATE_ACTION_TYPE = `${ACTION_PREFIX}layout.xy.update`;
export const LAYOUT_MODE_UPDATE_ACTION_TYPE = `${ACTION_PREFIX}layout.mode.update`;
export const LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE = `${ACTION_PREFIX}layout.expanded.groups.update`;
export const LAYOUT_DESTROY_ACTION_TYPE = `${ACTION_PREFIX}layout.destroy`;
