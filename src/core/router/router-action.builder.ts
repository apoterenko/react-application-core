import { EffectsAction } from 'redux-effects-promise';

import { ROUTER_NAVIGATE_ACTION_TYPE } from './router.interface';

export class RouterActionBuilder {
  public static buildNavigateAction(path: string): EffectsAction {
    return EffectsAction.create(ROUTER_NAVIGATE_ACTION_TYPE, path);
  }
}
