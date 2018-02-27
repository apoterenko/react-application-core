import {
  INamedEntity,
  ILoginWrapper,
  IEmailWrapper,
  IUserWrapper,
} from '../definition.interface';

export interface IUser extends INamedEntity,
                               ILoginWrapper,
                               IEmailWrapper {
}

export interface IApplicationUserState extends IUser {
}

export const USER_UPDATE_ACTION_TYPE = 'user.update';
export const USER_DESTROY_ACTION_TYPE = 'user.destroy';
