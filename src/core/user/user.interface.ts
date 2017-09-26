export interface IApplicationUserState {
  name: string;
  id: number | string;
}

export const INITIAL_USER_STATE: IApplicationUserState = {
  id: null,
  name: null,
};

export const USER_UPDATE_ACTION_TYPE = 'user.update';
export const USER_DESTROY_ACTION_TYPE = 'user.destroy';
