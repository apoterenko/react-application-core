import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import { provideInSingleton, DI_TYPES, lazyInject } from '../../di';
import { IRoutesConfiguration } from '../../configurations-definitions.interface';
import { ApplicationActionBuilder } from '../../component/application/application-action.builder';
import { RouterActionBuilder } from '../../router/router-action.builder';
import { SIGN_IN_DONE_ACTION_TYPE } from './sign-in.interface';

@provideInSingleton(SignInEffects)
export class SignInEffects {
  @lazyInject(DI_TYPES.Routes) private routes: IRoutesConfiguration;

  @EffectsService.effects(SIGN_IN_DONE_ACTION_TYPE)
  public $onSignInDone(): IEffectsAction[] {
    return [
      ApplicationActionBuilder.buildUpdateTokenAction(),
      RouterActionBuilder.buildNavigateAction(this.routes.home)
    ];
  }
}
