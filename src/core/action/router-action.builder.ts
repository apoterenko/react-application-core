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
  IFluxNavigateEntity,
} from '../definition';

export class RouterActionBuilder {

  /**
   * @stable [17.02.2021]
   * @param depth
   */
  public static buildNavigateBackPlainAction(depth?: number): IEffectsAction<IFluxNavigateEntity> {
    return {type: $RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE, data: {depth}};
  }

  /**
   * @stable [17.02.2021]
   * @param path
   */
  public static buildNavigatePlainAction(path: string): IEffectsAction<IFluxNavigateEntity> {
    return {type: $RAC_ROUTER_NAVIGATE_ACTION_TYPE, data: {path}};
  }

  /**
   * @stable [17.02.2021]
   * @param path
   */
  public static buildRewritePlainAction(path: string): IEffectsAction<IFluxNavigateEntity> {
    return {type: $RAC_ROUTER_REWRITE_ACTION_TYPE, data: {path}};
  }

  /**
   * @stable [17.02.2021]
   * @param path
   */
  public static buildReplacePlainAction(path: string): IEffectsAction<IFluxNavigateEntity> {
    return {type: $RAC_ROUTER_REPLACE_ACTION_TYPE, data: {path}};
  }

  /**
   * @stable [17.02.2021]
   * @param path
   */
  public static buildNavigateAction(path: string): IEffectsAction {
    const plainAction = this.buildNavigatePlainAction(path);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [17.02.2021]
   * @param path
   */
  public static buildRewriteAction(path: string): IEffectsAction {
    const plainAction = this.buildRewritePlainAction(path);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [17.02.2021]
   * @param path
   */
  public static buildReplaceAction(path: string): IEffectsAction {
    const plainAction = this.buildReplacePlainAction(path);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [17.02.2021]
   */
  public static buildBackAction(): IEffectsAction {
    return EffectsAction.create($RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE);
  }

  /**
   * @stable [17.02.2021]
   */
  public static buildReloadAction(): IEffectsAction {
    return EffectsAction.create($RAC_ROUTER_RELOAD_ACTION_TYPE);
  }
}
