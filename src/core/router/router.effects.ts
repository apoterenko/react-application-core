import { EffectsAction, EffectsService } from 'redux-effects-promise';

import { DI_TYPES, lazyInject, provide } from 'core/di';

import { IRouter, ROUTER_NAVIGATE_BACK_ACTION_TYPE, ROUTER_NAVIGATE_ACTION_TYPE } from './router.interface';

@provide(RouterEffects)
export class RouterEffects {

  @lazyInject(DI_TYPES.Router) private router: IRouter;

  @EffectsService.effects(ROUTER_NAVIGATE_ACTION_TYPE)
  public routerNavigate(action: EffectsAction): void {
    if (typeof action.data === 'string') {
      this.router.push(action.data);
    } else {
      this.router.push(action.data.path, action.data.state);
    }
  }

  @EffectsService.effects(ROUTER_NAVIGATE_BACK_ACTION_TYPE)
  public routerBack(): void {
    this.router.goBack();
  }
}
