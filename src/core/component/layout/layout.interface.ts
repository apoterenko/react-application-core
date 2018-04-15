import { ILayoutEntity } from '../../entities-definitions.interface';

export const LAYOUT_FULL_MODE = 'full';
export const LAYOUT_MINIMAL_MODE = 'minimal';

export const INITIAL_APPLICATION_LAYOUT_STATE: ILayoutEntity = {
  mode: LAYOUT_FULL_MODE,
};

export const LAYOUT_MODE_UPDATE_ACTION_TYPE = 'layout.mode.update';
