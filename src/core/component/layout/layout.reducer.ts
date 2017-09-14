import { AnyAction } from 'redux';

import { IKeyValue } from 'core/definition.interface';

import {
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
  IApplicationLayoutState,
  INITIAL_APPLICATION_LAYOUT_STATE,
} from './layout.interface';

export function layoutReducer(state: IApplicationLayoutState = INITIAL_APPLICATION_LAYOUT_STATE,
                              action: AnyAction): IKeyValue {
  switch (action.type) {
    case `${LAYOUT_MODE_UPDATE_ACTION_TYPE}`:
      return {
        mode: action.data.mode,
      };
  }
  return state;
}
