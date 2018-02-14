import { ACTION_PREFIX } from '../../definition.interface';
import { IApplicationFormState } from '../../component/form';

export interface ISignInState {
  signIn: IApplicationFormState;
}

export interface ISignUpState {
  signUp: IApplicationFormState;
}

export const SIGN_IN_DONE_ACTION_TYPE = `${ACTION_PREFIX}sign.in.done`;
