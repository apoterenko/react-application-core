import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $RAC_ROUTER_NAVIGATE_ACTION_TYPE,
  $RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE,
  $RAC_ROUTER_RELOAD_ACTION_TYPE,
  $RAC_ROUTER_REPLACE_ACTION_TYPE,
  $RAC_ROUTER_REWRITE_ACTION_TYPE,
  INavigateEntity,
} from '../definition';

export class RouterActionBuilder {

  /**
   * @stable [18.12.2019]
   * @param {number} depth
   * @returns {IEffectsAction}
   */
  public static buildNavigateBackPlainAction(depth?: number): IEffectsAction {
    const payload: INavigateEntity = {depth};
    return {type: $RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE, data: payload};
  }

  /**
   * @stable [06.02.2020]
   * @param {string} path
   * @returns {IEffectsAction}
   */
  public static buildNavigatePlainAction(path: string): IEffectsAction {
    return {type: $RAC_ROUTER_NAVIGATE_ACTION_TYPE, data: path};
  }

  /**
   * @stable [03.06.2018]
   * @param {string} path
   * @returns {IEffectsAction}
   */
  public static buildNavigateAction(path: string): IEffectsAction {
    const plainAction = this.buildNavigatePlainAction(path);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [17.11.2019]
   * @param {string} path
   * @returns {IEffectsAction}
   */
  public static buildRewriteAction(path: string): IEffectsAction {
    return EffectsAction.create($RAC_ROUTER_REWRITE_ACTION_TYPE, path);
  }

  /**
   * @stable [17.11.2019]
   * @param {string} path
   * @returns {IEffectsAction}
   */
  public static buildReplaceAction(path: string): IEffectsAction {
    return EffectsAction.create($RAC_ROUTER_REPLACE_ACTION_TYPE, path);
  }

  /**
   * @stable [17.11.2019]
   * @returns {IEffectsAction}
   */
  public static buildBackAction(): IEffectsAction {
    return EffectsAction.create($RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE);
  }

  /**
   * @stable [17.11.2019]
   * @returns {IEffectsAction}
   */
  public static buildReloadAction(): IEffectsAction {
    return EffectsAction.create($RAC_ROUTER_RELOAD_ACTION_TYPE);
  }
}
