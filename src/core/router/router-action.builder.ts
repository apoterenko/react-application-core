import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import {
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_BACK,
  ROUTER_REPLACE_ACTION_TYPE,
} from './router.interface';

export class RouterActionBuilder {
  public static buildNavigateAction(path: string): IEffectsAction {
    return EffectsAction.create(ROUTER_NAVIGATE_ACTION_TYPE, path);
  }

  public static buildReplaceAction(path: string): IEffectsAction {
    return EffectsAction.create(ROUTER_REPLACE_ACTION_TYPE, path);
  }

  public static buildNavigateBackActionType(section?: string): string {
    return `${section || ROUTER_NAVIGATE_ACTION_TYPE}.${ROUTER_BACK}`;
  }

  public static buildNavigateBackAction(section?: string): IEffectsAction {
    return EffectsAction.create(this.buildNavigateBackActionType(section));
  }
}
