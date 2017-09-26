import { AnyAction } from 'redux';

import {
  IApplicationUserState,
  INITIAL_USER_STATE,
  USER_UPDATE_ACTION_TYPE,
} from './user.interface';

export function userReducer(state: IApplicationUserState = INITIAL_USER_STATE,
                            action: AnyAction): IApplicationUserState {
  switch (action.type) {
    case USER_UPDATE_ACTION_TYPE:
      return {
          ...action.data,
      };
  }
  return state;
}
