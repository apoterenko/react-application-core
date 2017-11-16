import { PureComponent } from 'react';

import { IProgressable, IErrorable } from '../../definition.interface';
import { IBaseContainerInternalProps, IContainerInternalProps } from '../../component/base';
import { ConnectorConfigT } from '../../component/connector';

export interface IApplicationContainerProps extends IBaseContainerInternalProps,
                                                    IApplicationAttributes {
  basename?: string;
}

export interface IContainerWrapperCtor {
  new(...args): PureComponent<IContainerInternalProps, {}>;
}

export interface IApplicationAttributes extends IProgressable,
                                                IErrorable {
  ready?: boolean;
}

export interface IApplicationReadyState extends IApplicationAttributes {
}

export const INITIAL_APPLICATION_READY_STATE: IApplicationReadyState = {
  ready: true,      // By default the application is ready (there are no the async dependencies)
  progress: false,
};

export const APPLICATION_SECTIONS: Map<string, ConnectorConfigT> = new Map<string, ConnectorConfigT>();
export const APPLICATION_INIT_ACTION_TYPE = 'init';
export const APPLICATION_PREPARE_ACTION_TYPE = 'prepare';
export const APPLICATION_PREPARE_ERROR_ACTION_TYPE = `${APPLICATION_PREPARE_ACTION_TYPE}.error`;
export const APPLICATION_PREPARE_AFTER_ACTION_TYPE = `${APPLICATION_PREPARE_ACTION_TYPE}.after`;
export const APPLICATION_PREPARE_AFTER_ERROR_ACTION_TYPE = `${APPLICATION_PREPARE_AFTER_ACTION_TYPE}.error`;
export const APPLICATION_LOGOUT_ACTION_TYPE = 'logout';
export const APPLICATION_AFTER_LOGOUT_ACTION_TYPE = 'after.logout';
export const APPLICATION_UPDATE_TOKEN_ACTION_TYPE = 'update.token';
export const APPLICATION_DESTROY_TOKEN_ACTION_TYPE = 'destroy.token';
export const APPLICATION_READY_ACTION_TYPE = 'ready';
export const APPLICATION_NOT_READY_ACTION_TYPE = 'not.ready';
export const APPLICATION_SECTION = 'application';
