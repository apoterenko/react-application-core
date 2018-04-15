import { EffectsService, IEffectsAction } from 'redux-effects-promise';
import { Actions } from 'react-native-router-flux';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { isString } from '../util';
import { provideInSingleton } from '../di';
import {
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_NAVIGATE_ACTION_TYPE,
} from './router.interface';
import { INavigateEntity } from '../entities-definitions.interface';

@provideInSingleton(RnRouterEffects)
export class RnRouterEffects {
  private static logger = LoggerFactory.makeLogger(RnRouterEffects);

  /* @stable - 15.04.2018 */
  @EffectsService.effects(ROUTER_NAVIGATE_ACTION_TYPE)
  public $onNavigate(action: IEffectsAction): void {
    const path = this.toPath(action).path;
    const routerCallback = Actions[path];

    if (R.isNil(routerCallback)) {
      RnRouterEffects.logger.warn(`[$RnRouterEffects][$onNavigate] Router callback is not defined. Path: ${path}`);
    } else {
      RnRouterEffects.logger.debug(`[$RnRouterEffects][$onNavigate] Path: ${path}`);
      routerCallback.call(Actions);
    }
  }

  /* @stable - 15.04.2018 */
  @EffectsService.effects(ROUTER_BACK_ACTION_TYPE)
  public $onBack(): void {
    RnRouterEffects.logger.debug('[$RnRouterEffects][$onBack]');

    Actions.pop();
  }

  private toPath(action: IEffectsAction): INavigateEntity<string> {
    const payloadAsString: string = action.data;
    if (isString(payloadAsString)) {
      return {path: payloadAsString};
    }
    return action.data;
  }
}
