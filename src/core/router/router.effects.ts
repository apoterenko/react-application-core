import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';
import { History } from 'history';
import { LoggerFactory } from 'ts-smart-logger';

import {
  ObjectUtils,
  Selectors,
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

  /**
   * @stable [17.02.2021]
   * @param action
   */
  @EffectsService.effects($RAC_ROUTER_REWRITE_ACTION_TYPE)
  public $onRewrite(action: IEffectsAction): void {
    this.router.go(-this.router.length);

    const payload = Selectors.data<IFluxNavigateEntity<History.Path, History.LocationState>>(action);
    RouterEffects.logger.debug('[$RouterEffects][$onRewrite] Payload:', payload);

    this.router.replace(payload.path, payload.state);
  }

  /**
   * @stable [17.02.2021]
   * @param action
   */
  @EffectsService.effects($RAC_ROUTER_NAVIGATE_ACTION_TYPE)
  public $onNavigate(action: IEffectsAction): void {
    const payload = Selectors.data<IFluxNavigateEntity<History.Path, History.LocationState>>(action);

    RouterEffects.logger.debug('[$RouterEffects][$onNavigate] Payload:', payload);
    this.router.push(payload.path, payload.state);
  }

  /**
   * @stable [17.02.2021]
   * @param action
   */
  @EffectsService.effects($RAC_ROUTER_REPLACE_ACTION_TYPE)
  public $onReplace(action: IEffectsAction): void {
    const payload = Selectors.data<IFluxNavigateEntity<History.Path, History.LocationState>>(action);

    RouterEffects.logger.debug('[$RouterEffects][$onReplace] Payload:', payload);
    this.router.replace(payload.path, payload.state);
  }

  /**
   * @stable [17.02.2021]
   * @param action
   */
  @EffectsService.effects($RAC_ROUTER_NAVIGATE_BACK_ACTION_TYPE)
  public $onBack(action: IEffectsAction): void {
    const payload = Selectors.data<IFluxNavigateEntity<History.Path, History.LocationState>>(action);

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
   * @stable [17.02.2021]
   */
  @EffectsService.effects($RAC_ROUTER_RELOAD_ACTION_TYPE)
  public $onReload(): void {
    RouterEffects.logger.debug('[$RouterEffects][$onReload]');
    this.domAccessor.reload(true);
  }
}
