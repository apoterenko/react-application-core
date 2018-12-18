import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import { provideInSingleton } from '../di';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { LayoutActionBuilder } from '../component/layout/layout-action.builder';
import { UniversalApplicationEffects } from './universal-application.effects';

@provideInSingleton(ApplicationEffects)
export class ApplicationEffects<TApi> extends UniversalApplicationEffects<TApi> {

  /**
   * @stable [11.08.2018]
   * @returns {IEffectsAction[]}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildLogoutActionType())
  public $onLogout(): IEffectsAction[] {
    return super.$onLogout().concat(LayoutActionBuilder.buildDestroyAction());
  }
}
