import { EffectsAction } from 'redux-effects-promise';

import { ROUTER_NAVIGATE_ACTION_TYPE } from './router.interface';

export class RouterAction extends EffectsAction {

  static createAction(data?: any): RouterAction {
    return new RouterAction(ROUTER_NAVIGATE_ACTION_TYPE, data);
  }
}
