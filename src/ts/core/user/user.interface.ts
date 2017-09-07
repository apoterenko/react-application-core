export interface IApplicationUserState {
  name: string;
  id: number | string;
}

export const INITIAL_USER_STATE: IApplicationUserState = {
  id: null,
  name: null,
};
