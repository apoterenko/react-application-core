import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import {
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_NAVIGATE_BACK_ACTION_TYPE,
} from './router.interface';

export class RouterActionBuilder {
  public static buildNavigateAction(path: string): IEffectsAction {
    return EffectsAction.create(ROUTER_NAVIGATE_ACTION_TYPE, path);
  }

  public static buildNavigateBackAction(): IEffectsAction {
    return EffectsAction.create(ROUTER_NAVIGATE_BACK_ACTION_TYPE);
  }
}
