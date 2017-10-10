import { IEffectsAction, EffectsAction, EffectsService } from 'redux-effects-promise';

import { provideInSingleton } from '../di';
import { ApplicationStateT, BaseEffects } from '../store';
import { PERMISSION_DESTROY_ACTION_TYPE } from '../permission';
import { USER_DESTROY_ACTION_TYPE } from '../user';
import { LOGOUT_ACTION_TYPE, LOGOUT_AFTER_ACTION_TYPE } from './logout.interface';

@provideInSingleton(LogoutEffects)
export class LogoutEffects extends BaseEffects<ApplicationStateT> {

  @EffectsService.effects(LOGOUT_ACTION_TYPE)
  public onLogout(_: IEffectsAction, state: ApplicationStateT): IEffectsAction[] {
    return (
        state.permission.authorized
            ? [EffectsAction.create(USER_DESTROY_ACTION_TYPE)]
            : []
    ).concat([
      EffectsAction.create(PERMISSION_DESTROY_ACTION_TYPE),
      EffectsAction.create(LOGOUT_AFTER_ACTION_TYPE)
    ]);
  }
}
