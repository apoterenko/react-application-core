import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import {
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_REPLACE_ACTION_TYPE,
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_REWRITE_ACTION_TYPE,
} from '../definition';

export class RouterActionBuilder {

  /**
   * @stable [03.06.2018]
   * @param {string} path
   * @returns {IEffectsAction}
   */
  public static buildNavigateAction(path: string): IEffectsAction {
    return EffectsAction.create(ROUTER_NAVIGATE_ACTION_TYPE, path);
  }

  public static buildRewriteAction(path: string): IEffectsAction {
    return EffectsAction.create(ROUTER_REWRITE_ACTION_TYPE, path);
  }

  public static buildReplaceAction(path: string): IEffectsAction {
    return EffectsAction.create(ROUTER_REPLACE_ACTION_TYPE, path);
  }

  public static buildNavigateBackAction(): IEffectsAction {
    return EffectsAction.create(ROUTER_BACK_ACTION_TYPE);
  }
}
