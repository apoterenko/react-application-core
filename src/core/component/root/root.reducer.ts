import { AnyAction } from 'redux';

import {
  IApplicationRootState,
  INITIAL_APPLICATION_ROOT_STATE,
  ROOT_PATH_UPDATE_ACTION_TYPE,
  ROOT_SECTION,
} from './root.interface';

export function rootReducer(state: IApplicationRootState = INITIAL_APPLICATION_ROOT_STATE,
                            action: AnyAction): IApplicationRootState {
  switch (action.type) {
    case `${ROOT_SECTION}.${ROOT_PATH_UPDATE_ACTION_TYPE}`:
      return {
        ...state,
        path: action.data.path,
      };
  }
  return state;
}
