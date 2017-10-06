import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import { DI_TYPES, lazyInject, provideInSingleton } from '../di';

import { IRouter, ROUTER_NAVIGATE_ACTION_TYPE } from './router.interface';
import { RouterActionBuilder } from './router-action.builder';

@provideInSingleton(RouterEffects)
export class RouterEffects {

  @lazyInject(DI_TYPES.Router) private router: IRouter;

  @EffectsService.effects(ROUTER_NAVIGATE_ACTION_TYPE)
  public routerNavigate(action: IEffectsAction): void {
    if (typeof action.data === 'string') {
      this.router.push(action.data);
    } else {
      this.router.push(action.data.path, action.data.state);
    }
  }

  @EffectsService.effects(RouterActionBuilder.buildNavigateBackActionType())
  public routerBack(): void {
    this.router.goBack();
  }
}
