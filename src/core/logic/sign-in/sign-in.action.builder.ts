import { IEffectsAction, EffectsAction } from 'redux-effects-promise';

import { SIGN_IN_DONE_ACTION_TYPE } from './sign-in.interface';

export class SignInActionBuilder {

  public static buildSignInDoneAction(): IEffectsAction {
    return EffectsAction.create(SIGN_IN_DONE_ACTION_TYPE);
  }
}
