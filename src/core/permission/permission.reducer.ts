import { AnyAction } from 'redux';

import { clone } from '../util';
import {
  IApplicationPermissionsState,
  INITIAL_PERMISSION_STATE,
  PERMISSION_DESTROY_ACTION_TYPE,
  PERMISSION_UPDATE_ACTION_TYPE,
} from './permission.interface';

export function permissionsReducer<TPermissions>(
    state: IApplicationPermissionsState<TPermissions> = INITIAL_PERMISSION_STATE,
    action: AnyAction,
): IApplicationPermissionsState<TPermissions> {
  switch (action.type) {
    case PERMISSION_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_PERMISSION_STATE,
      };
    case PERMISSION_UPDATE_ACTION_TYPE:
      return {
        ...state,
        permissions: clone(action.data),
      };
  }
  return state;
}
