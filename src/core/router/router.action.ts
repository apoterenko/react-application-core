import { EffectsAction } from 'redux-effects-promise';

import { ROUTER_BACK_ACTION_TYPE, ROUTER_NAVIGATE_ACTION_TYPE } from './router.interface';

export class RouterAction extends EffectsAction {

  public static createAction(data?: any): RouterAction {
    return new RouterAction(ROUTER_NAVIGATE_ACTION_TYPE, data);
  }

  public static createBackAction(): RouterAction {
    return new RouterAction(ROUTER_BACK_ACTION_TYPE);
  }
}
