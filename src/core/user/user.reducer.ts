import { AnyAction } from 'redux';

import {
  IApplicationUserState,
  USER_UPDATE_ACTION_TYPE,
  USER_DESTROY_ACTION_TYPE,
} from './user.interface';

export function userReducer(state: IApplicationUserState = {},
                            action: AnyAction): IApplicationUserState {
  switch (action.type) {
    case USER_UPDATE_ACTION_TYPE:
      return {
        ...state,
        ...action.data,
      };
    case USER_DESTROY_ACTION_TYPE:
      return {};
  }
  return state;
}
