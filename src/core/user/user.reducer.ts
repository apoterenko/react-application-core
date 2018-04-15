import { AnyAction } from 'redux';

import { IUserEntity } from '../entities-definitions.interface';
import { USER_UPDATE_ACTION_TYPE, USER_DESTROY_ACTION_TYPE } from './user.interface';

export function userReducer(state: IUserEntity = {},
                            action: AnyAction): IUserEntity {
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
