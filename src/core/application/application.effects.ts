import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import { provideInSingleton } from '../di';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { LayoutActionBuilder } from '../component/layout/layout-action.builder';
import { UniversalApplicationEffects } from './universal-application.effects';

@provideInSingleton(ApplicationEffects)
export class ApplicationEffects<TApi> extends UniversalApplicationEffects<TApi> {

  /**
   * @stable [14.03.2020]
   * @returns {Promise<IEffectsAction[]>}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildLogoutActionType(), true)
  public async $onLogout(): Promise<IEffectsAction[]> {
    return [
      ...await super.$onLogout(),
      LayoutActionBuilder.buildDestroyAction()
    ];
  }
}
