import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { History } from 'history';
import { LoggerFactory } from 'ts-smart-logger';

import { DI_TYPES, lazyInject, provideInSingleton } from '../di';
import {
  IRouter,
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_REPLACE_ACTION_TYPE,
  ROUTER_BACK_ACTION_TYPE,
} from './router.interface';

@provideInSingleton(RouterEffects)
export class RouterEffects {
  private static logger = LoggerFactory.makeLogger(RouterEffects);

  @lazyInject(DI_TYPES.Router) private router: IRouter;

  @EffectsService.effects(ROUTER_NAVIGATE_ACTION_TYPE)
  public $onNavigate(action: IEffectsAction): void {
    const pathAndState = this.toPathAndState(action);

    RouterEffects.logger.debug(
        `[$RouterEffects][$onNavigate] Path: ${pathAndState.path}, state: ${pathAndState.state}`
    );
    this.router.push(pathAndState.path, pathAndState.state);
  }

  @EffectsService.effects(ROUTER_REPLACE_ACTION_TYPE)
  public $onReplace(action: IEffectsAction): void {
    const pathAndState = this.toPathAndState(action);

    RouterEffects.logger.debug(
        `[$RouterEffects][$onReplace] Path: ${pathAndState.path}, state: ${pathAndState.state}`
    );
    this.router.replace(pathAndState.path, pathAndState.state);
  }

  @EffectsService.effects(ROUTER_BACK_ACTION_TYPE)
  public $onBack(): void {
    RouterEffects.logger.debug('[$RouterEffects][$onBack]');

    this.router.goBack();
  }

  private toPathAndState(action: IEffectsAction): { path: History.Path, state?: History.LocationState } {
    if (typeof action.data === 'string') {
      return {path: action.data};
    }
    return {path: action.data.path, state: action.data.state};
  }
}
