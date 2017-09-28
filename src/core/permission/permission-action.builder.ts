import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { AnyT } from '../definition.interface';

import {
  PERMISSION_AUTHORIZED_UPDATE_ACTION_TYPE,
  PERMISSION_PERMISSIONS_UPDATE_ACTION_TYPE,
} from './permission.interface';

export class PermissionActionBuilder {

  public static buildAuthorizedUpdateAction(): IEffectsAction {
    return EffectsAction.create(PERMISSION_AUTHORIZED_UPDATE_ACTION_TYPE, true);
  }

  public static buildPermissionsUpdateAction(data: AnyT): IEffectsAction {
    return EffectsAction.create(PERMISSION_PERMISSIONS_UPDATE_ACTION_TYPE, data);
  }
}
