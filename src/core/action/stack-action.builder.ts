import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $RAC_STACK_LOCK_ACTION_TYPE,
  $RAC_STACK_POP_ACTION_TYPE,
  $RAC_STACK_PUSH_ACTION_TYPE,
  $RAC_STACK_REMOVE_ACTION_TYPE,
  IFluxStackEntity,
} from '../definition';

export class StackActionBuilder {

  /**
   * @stable [19.12.2019]
   * @param {IFluxStackEntity} data
   * @returns {IEffectsAction}
   */
  public static buildPushPlainAction(data: IFluxStackEntity): IEffectsAction {
    return {type: $RAC_STACK_PUSH_ACTION_TYPE, data};
  }

  /**
   * @stable [19.12.2019]
   * @param {IFluxStackEntity} data
   * @returns {IEffectsAction}
   */
  public static buildPopPlainAction(data: IFluxStackEntity): IEffectsAction {
    return {type: $RAC_STACK_POP_ACTION_TYPE, data};
  }

  /**
   * @stable [19.12.2019]
   * @param {string} nextSection
   * @returns {IEffectsAction}
   */
  public static buildLockAction(nextSection: string): IEffectsAction {
    return EffectsAction.create($RAC_STACK_LOCK_ACTION_TYPE, nextSection);
  }

  public static buildRemoveAction(...sections: string[]): IEffectsAction {
    return EffectsAction.create($RAC_STACK_REMOVE_ACTION_TYPE, sections);
  }
}
