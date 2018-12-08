import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import {
  STACK_LOCK_ACTION_TYPE,
  STACK_REMOVE_ACTION_TYPE,
} from './stack.interface';

export class StackActionBuilder {

  public static buildLockAction(nextSection: string): IEffectsAction {
    return EffectsAction.create(STACK_LOCK_ACTION_TYPE, nextSection);
  }

  public static buildRemoveAction(...sections: string[]): IEffectsAction {
    return EffectsAction.create(STACK_REMOVE_ACTION_TYPE, sections);
  }
}
