import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import { provideInSingleton, DI_TYPES, lazyInject } from '../../di';
import { ApplicationActionBuilder } from '../../component/application';
import { SIGN_IN_DONE_ACTION_TYPE } from './sign-in.interface';
import { RouterActionBuilder } from '../../router';
import { IRoutesConfiguration } from '../../configurations-definitions.interface';

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
