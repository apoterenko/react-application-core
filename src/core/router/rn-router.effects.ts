import { EffectsService, IEffectsAction } from 'redux-effects-promise';
import { Actions } from 'react-native-router-flux';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import {
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_NAVIGATE_ACTION_TYPE,
} from './router-reducer.interface';
import { provideInSingleton } from '../di';

@provideInSingleton(RnRouterEffects)
export class RnRouterEffects {
  private static logger = LoggerFactory.makeLogger(RnRouterEffects);

  @EffectsService.effects(ROUTER_NAVIGATE_ACTION_TYPE)
  public $onNavigate(action: IEffectsAction): void {
    const path = action.data;
    const routerCallback = Actions[path];

    if (R.isNil(routerCallback)) {
      RnRouterEffects.logger.warn(`[$RnRouterEffects][$onNavigate] Router callback is not defined. Path: ${path}`);
    } else {
      RnRouterEffects.logger.debug(`[$RnRouterEffects][$onNavigate] Path: ${path}`);
      routerCallback.call(Actions);
    }
  }

  @EffectsService.effects(ROUTER_BACK_ACTION_TYPE)
  public $onBack(): void {
    RnRouterEffects.logger.debug('[$RnRouterEffects][$onBack]');

    Actions.pop();
  }
}
