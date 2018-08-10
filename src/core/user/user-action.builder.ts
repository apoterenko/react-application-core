import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import { IPayloadWrapper } from '../definitions.interface';
import {
  USER_UPDATE_ACTION_TYPE,
  USER_DESTROY_ACTION_TYPE,
} from './user.interface';
import { IUserEntity } from '../entities-definitions.interface';

export class UserActionBuilder {

  /**
   * @stable [11.08.2018]
   * @param {IPayloadWrapper<IUserEntity>} data
   * @returns {IEffectsAction}
   */
  public static buildUpdateAction(data: IPayloadWrapper<IUserEntity>): IEffectsAction {
    return EffectsAction.create(USER_UPDATE_ACTION_TYPE, data);
  }

  /**
   * @stable [11.08.2018]
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(): IEffectsAction {
    return EffectsAction.create(USER_DESTROY_ACTION_TYPE);
  }
}
