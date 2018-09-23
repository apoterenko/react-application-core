import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import { LAYOUT_DESTROY_ACTION_TYPE } from './layout.interface';

export class LayoutActionBuilder {

  /**
   * @stable [23.09.2018]
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(): IEffectsAction {
    return EffectsAction.create(LAYOUT_DESTROY_ACTION_TYPE);
  }
}
