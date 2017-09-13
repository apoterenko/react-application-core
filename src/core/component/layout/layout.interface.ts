export const LAYOUT_FULL_MODE = 'full';
export const LAYOUT_MINIMAL_MODE = 'minimal';

export interface IApplicationLayoutState {
  mode: 'full' | 'minimal';
}

export const INITIAL_APPLICATION_LAYOUT_STATE: IApplicationLayoutState = {
  mode: LAYOUT_FULL_MODE,
};

export const LAYOUT_SECTION = 'layout';
export const LAYOUT_MODE_UPDATE_ACTION_TYPE = 'mode.update';
