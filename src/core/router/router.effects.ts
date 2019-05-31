import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { History } from 'history';
import { LoggerFactory } from 'ts-smart-logger';

import { isString } from '../util';
import { DI_TYPES, lazyInject, provideInSingleton } from '../di';
import {
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_REPLACE_ACTION_TYPE,
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_REWRITE_ACTION_TYPE,
} from './router.interface';
import {
  IRouterComponentEntity,
  INavigateEntity,
} from '../entities-definitions.interface';

@provideInSingleton(RouterEffects)
export class RouterEffects {
  private static logger = LoggerFactory.makeLogger('RouterEffects');

  @lazyInject(DI_TYPES.Router) private router: IRouterComponentEntity;

  @EffectsService.effects(ROUTER_REWRITE_ACTION_TYPE)
  public $onRewrite(action: IEffectsAction): void {
    this.router.go(-this.router.length);

    const pathAndState = this.toPathAndState(action);
    RouterEffects.logger.debug(
      `[$RouterEffects][$onRewrite] Path: ${pathAndState.path}, state: ${pathAndState.state}`
    );
    this.router.replace(pathAndState.path, pathAndState.state);
  }

  @EffectsService.effects(ROUTER_NAVIGATE_ACTION_TYPE)
  public $onNavigate(action: IEffectsAction): void {
    const pathAndState = this.toPathAndState(action);

    RouterEffects.logger.debug(
        `[$RouterEffects][$onNavigate] Path: ${pathAndState.path}, state: ${pathAndState.state}`
    );
    this.router.push(pathAndState.path, pathAndState.state);
  }

  /**
   * @stable [30.05.2019]
   * @param {IEffectsAction} action
   */
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

  private toPathAndState(action: IEffectsAction): INavigateEntity<History.Path, History.LocationState> {
    const payloadAsString: string = action.data;
    if (isString(payloadAsString)) {
      return {path: payloadAsString};
    }
    return action.data;
  }
}
