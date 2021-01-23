import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';
import { History } from 'history';
import { LoggerFactory } from 'ts-smart-logger';

import {
  ObjectUtils,
  TypeUtils,
} from '../util';
import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../di';
import {
  $RAC_ROUTER_NAVIGATE_ACTION_TYPE,
  $RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE,
  $RAC_ROUTER_RELOAD_ACTION_TYPE,
  $RAC_ROUTER_REPLACE_ACTION_TYPE,
  $RAC_ROUTER_REWRITE_ACTION_TYPE,
  IDomAccessor,
  IFluxNavigateEntity,
  IRouter,
} from '../definition';

@provideInSingleton(RouterEffects)
export class RouterEffects {
  private static readonly logger = LoggerFactory.makeLogger('RouterEffects');

  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Router) private readonly router: IRouter;

  @EffectsService.effects($RAC_ROUTER_REWRITE_ACTION_TYPE)
  public $onRewrite(action: IEffectsAction): void {
    this.router.go(-this.router.length);

    const pathAndState = this.asFluxEntity(action);
    RouterEffects.logger.debug(
      `[$RouterEffects][$onRewrite] Path: ${pathAndState.path}, state: ${pathAndState.state}`
    );
    this.router.replace(pathAndState.path, pathAndState.state);
  }

  @EffectsService.effects($RAC_ROUTER_NAVIGATE_ACTION_TYPE)
  public $onNavigate(action: IEffectsAction): void {
    const pathAndState = this.asFluxEntity(action);

    RouterEffects.logger.debug(
        `[$RouterEffects][$onNavigate] Path: ${pathAndState.path}, state: ${pathAndState.state}`
    );
    this.router.push(pathAndState.path, pathAndState.state);
  }

  /**
   * @stable [30.05.2019]
   * @param {IEffectsAction} action
   */
  @EffectsService.effects($RAC_ROUTER_REPLACE_ACTION_TYPE)
  public $onReplace(action: IEffectsAction): void {
    const pathAndState = this.asFluxEntity(action);
    RouterEffects.logger.debug(
      `[$RouterEffects][$onReplace] Path: ${pathAndState.path}, state: ${pathAndState.state}`
    );
    this.router.replace(pathAndState.path, pathAndState.state);
  }

  /**
   * @stable [18.12.2019]
   * @param {IEffectsAction} action
   */
  @EffectsService.effects($RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE)
  public $onBack(action: IEffectsAction): void {
    const payload: IFluxNavigateEntity = action.data;
    RouterEffects.logger.debug('[$RouterEffects][$onBack] Payload:', payload);

    if (ObjectUtils.isObjectNotEmpty(payload)) {
      if (TypeUtils.isNumber(payload.depth)) {
        this.router.go(-payload.depth);
        return;
      }
    }
    this.router.goBack();
  }

  /**
   * @stable [17.11.2019]
   */
  @EffectsService.effects($RAC_ROUTER_RELOAD_ACTION_TYPE)
  public $onReload(): void {
    RouterEffects.logger.debug('[$RouterEffects][$onReload]');
    this.domAccessor.reload(true);
  }

  /**
   * @stable [21.01.2021]
   * @param action
   * @private
   */
  private asFluxEntity(action: IEffectsAction): IFluxNavigateEntity<History.Path, History.LocationState> {
    const path = action.data as string;
    if (TypeUtils.isString(path)) {
      return {path};
    }
    return action.data;
  }
}
