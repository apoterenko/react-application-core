import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import { AnyT } from '../definitions.interface';

import { USER_UPDATE_ACTION_TYPE } from './user.interface';

export class UserActionBuilder {

  public static buildUpdateAction(data: AnyT): IEffectsAction {
    return EffectsAction.create(USER_UPDATE_ACTION_TYPE, data);
  }
}
