import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { AnyT } from '../definition.interface';
import { PERMISSION_UPDATE_ACTION_TYPE } from './permission.interface';

export class PermissionActionBuilder {

  public static buildUpdateAction(data: AnyT): IEffectsAction {
    return EffectsAction.create(PERMISSION_UPDATE_ACTION_TYPE, data);
  }
}
