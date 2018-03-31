import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { AnyT } from '../definitions.interface';
import { PERMISSIONS_UPDATE_ACTION_TYPE } from './permissions.interface';

export class PermissionsActionBuilder {

  public static buildUpdateAction(data: AnyT): IEffectsAction {
    return EffectsAction.create(PERMISSIONS_UPDATE_ACTION_TYPE, data);
  }
}
