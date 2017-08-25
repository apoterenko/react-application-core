import { AnyAction } from 'redux';

import { IApplicationUserState, INITIAL_USER_STATE } from './user.interface';

export function userReducer(state: IApplicationUserState = INITIAL_USER_STATE,
                            action: AnyAction): IApplicationUserState {
  switch (action.type) {
    case `user.update`:
      return {
          ...action.data
      };
  }
  return state;
}
