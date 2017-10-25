import { AnyAction } from 'redux';

import {
  IApplicationUserState,
  INITIAL_USER_STATE,
  USER_UPDATE_ACTION_TYPE,
  USER_DESTROY_ACTION_TYPE,
} from './user.interface';

export function userReducer(state: IApplicationUserState = INITIAL_USER_STATE,
                            action: AnyAction): IApplicationUserState {
  switch (action.type) {
    case USER_UPDATE_ACTION_TYPE:
      return {
        ...state,
        ...action.data,
      };
    case USER_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_USER_STATE,
      };
  }
  return state;
}
