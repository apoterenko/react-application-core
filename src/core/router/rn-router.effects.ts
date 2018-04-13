import { EffectsService, IEffectsAction } from 'redux-effects-promise';
import { Actions } from 'react-native-router-flux';
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

    RnRouterEffects.logger.debug(`[$RnRouterEffects][$onNavigate] Path: ${path}`);
    Actions[path]();
  }

  @EffectsService.effects(ROUTER_BACK_ACTION_TYPE)
  public $onBack(): void {
    RnRouterEffects.logger.debug('[$RnRouterEffects][$onBack]');

    Actions.pop();
  }
}
