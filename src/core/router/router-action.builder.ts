import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import {
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_RELOAD_ACTION_TYPE,
  ROUTER_REPLACE_ACTION_TYPE,
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

  /**
   * @stable [17.11.2019]
   * @param {string} path
   * @returns {IEffectsAction}
   */
  public static buildRewriteAction(path: string): IEffectsAction {
    return EffectsAction.create(ROUTER_REWRITE_ACTION_TYPE, path);
  }

  /**
   * @stable [17.11.2019]
   * @param {string} path
   * @returns {IEffectsAction}
   */
  public static buildReplaceAction(path: string): IEffectsAction {
    return EffectsAction.create(ROUTER_REPLACE_ACTION_TYPE, path);
  }

  /**
   * @stable [17.11.2019]
   * @returns {IEffectsAction}
   */
  public static buildBackAction(): IEffectsAction {
    return EffectsAction.create(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * @stable [17.11.2019]
   * @returns {IEffectsAction}
   */
  public static buildReloadAction(): IEffectsAction {
    return EffectsAction.create(ROUTER_RELOAD_ACTION_TYPE);
  }
}
