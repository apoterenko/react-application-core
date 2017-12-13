import { AnyAction } from 'redux';

import {
  IApplicationRootState,
  INITIAL_APPLICATION_ROOT_STATE,
} from './root.interface';
import { RootActionBuilder } from './root-action.builder';

export function rootReducer(state: IApplicationRootState = INITIAL_APPLICATION_ROOT_STATE,
                            action: AnyAction): IApplicationRootState {
  switch (action.type) {
    case RootActionBuilder.buildPathUpdateActionType():
      return {
        ...state,
        path: action.data.path,
      };
  }
  return state;
}
