import { AnyAction } from 'redux';

import {
  IApplicationPermissionState,
  INITIAL_PERMISSION_STATE,
  PERMISSION_AUTHORIZED_UPDATE_ACTION_TYPE,
  PERMISSION_DESTROY_ACTION_TYPE,
  PERMISSION_PERMISSIONS_UPDATE_ACTION_TYPE,
} from './permission.interface';

export function permissionReducer<TPermissions>(
    state: IApplicationPermissionState<TPermissions> = INITIAL_PERMISSION_STATE,
    action: AnyAction
): IApplicationPermissionState<TPermissions> {
  switch (action.type) {
    case PERMISSION_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_PERMISSION_STATE
      };
    case PERMISSION_PERMISSIONS_UPDATE_ACTION_TYPE:
      return {
        ...state,
        permissions: action.data
      };
    case PERMISSION_AUTHORIZED_UPDATE_ACTION_TYPE:
      return {
        ...state,
        authorized: action.data
      }
  }
  return state;
}
