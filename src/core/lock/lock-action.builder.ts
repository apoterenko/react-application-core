import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import { AnyT } from '../definition.interface';
import { LOCK_ACTION_TYPE, LOCK_DESTROY_ACTION_TYPE } from './lock.interface';

export class LockActionBuilder {

  public static buildAction(data: AnyT): IEffectsAction {
    return EffectsAction.create(LOCK_ACTION_TYPE, data);
  }

  public static buildDestroyAction(): IEffectsAction {
    return EffectsAction.create(LOCK_DESTROY_ACTION_TYPE);
  }
}
