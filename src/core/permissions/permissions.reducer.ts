import { AnyAction } from 'redux';

import { clone } from '../util';
import {
  IApplicationPermissionsState,
  INITIAL_PERMISSION_STATE,
  PERMISSIONS_DESTROY_ACTION_TYPE,
  PERMISSIONS_UPDATE_ACTION_TYPE,
} from './permissions.interface';

export function permissionsReducer<TPermissions>(
    state: IApplicationPermissionsState<TPermissions> = INITIAL_PERMISSION_STATE,
    action: AnyAction,
): IApplicationPermissionsState<TPermissions> {
  switch (action.type) {
    case PERMISSIONS_DESTROY_ACTION_TYPE:
      return {
        ...INITIAL_PERMISSION_STATE,
      };
    case PERMISSIONS_UPDATE_ACTION_TYPE:
      return {
        ...state,
        permissions: clone(action.data),
      };
  }
  return state;
}
