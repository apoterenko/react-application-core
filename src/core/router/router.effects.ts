import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { History } from 'history';

import { DI_TYPES, lazyInject, provideInSingleton } from '../di';
import {
  IRouter,
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_REPLACE_ACTION_TYPE,
} from './router.interface';
import { RouterActionBuilder } from './router-action.builder';

@provideInSingleton(RouterEffects)
export class RouterEffects {

  @lazyInject(DI_TYPES.Router) private router: IRouter;

  @EffectsService.effects(ROUTER_NAVIGATE_ACTION_TYPE)
  public $onNavigate(action: IEffectsAction): void {
    const pathAndState = this.toPathAndState(action);
    this.router.push(pathAndState.path, pathAndState.state);
  }

  @EffectsService.effects(ROUTER_REPLACE_ACTION_TYPE)
  public $onReplace(action: IEffectsAction): void {
    const pathAndState = this.toPathAndState(action);
    this.router.replace(pathAndState.path, pathAndState.state);
  }

  @EffectsService.effects(RouterActionBuilder.buildNavigateBackActionType())
  public $onBack(): void {
    this.router.goBack();
  }

  private toPathAndState(action: IEffectsAction): { path: History.Path, state?: History.LocationState } {
    if (typeof action.data === 'string') {
      return {path: action.data};
    }
    return {path: action.data.path, state: action.data.state};
  }
}
