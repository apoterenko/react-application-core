export interface IApplicationAttributes {
  ready?: boolean;
}

export interface IApplicationReadyState extends IApplicationAttributes {
}

export const INITIAL_APPLICATION_READY_STATE: IApplicationReadyState = {
  ready: false,
};

export const APPLICATION_INIT_ACTION_TYPE = 'init';
export const APPLICATION_AFTER_INIT_ACTION_TYPE = 'after.init';
export const APPLICATION_AFTER_INIT_ERROR_ACTION_TYPE = 'after.init.error';
export const APPLICATION_LOGOUT_ACTION_TYPE = 'logout';
export const APPLICATION_AFTER_LOGOUT_ACTION_TYPE = 'after.logout';
export const APPLICATION_UPDATE_TOKEN_ACTION_TYPE = 'update.token';
export const APPLICATION_DESTROY_TOKEN_ACTION_TYPE = 'destroy.token';
export const APPLICATION_READY_ACTION_TYPE = 'ready';
export const APPLICATION_NOT_READY_ACTION_TYPE = 'not.ready';
export const APPLICATION_SECTION = 'application';
