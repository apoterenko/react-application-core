import { INamedEntity } from 'core';

export interface IUser extends INamedEntity {
}

export interface IApplicationUserState extends IUser {
}

export const USER_UPDATE_ACTION_TYPE = 'user.update';
export const USER_DESTROY_ACTION_TYPE = 'user.destroy';
