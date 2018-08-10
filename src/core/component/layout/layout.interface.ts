import { ILayoutEntity } from '../../entities-definitions.interface';
import { ACTION_PREFIX } from '../../definitions.interface';

export const LAYOUT_FULL_MODE = 'full';
export const LAYOUT_MINIMAL_MODE = 'minimal';

/**
 * @stable [10.08.2018]
 * @type {{mode: string}}
 */
export const INITIAL_APPLICATION_LAYOUT_STATE: ILayoutEntity = {
  x: 0,
  y: 0,
  mode: LAYOUT_FULL_MODE,
};

export const LAYOUT_UPDATE_ACTION_TYPE = `${ACTION_PREFIX}layout.update`;
export const LAYOUT_DESTROY_ACTION_TYPE = `${ACTION_PREFIX}layout.destroy`;
