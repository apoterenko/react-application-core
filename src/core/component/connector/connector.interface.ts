import { ComponentLifecycle } from 'react';

import { RouteOptionsT } from '../../router';
import { IInitialChangesable, IKeyValue, ACTION_PREFIX } from '../../definitions.interface';
import { IDefaultApplicationState } from '../../store';
import { IApplicationAccessConfig } from '../../permissions';
import { IBaseContainerInternalProps } from '../base';

export interface IBasicConnectorConfig<TAppState extends IDefaultApplicationState>
    extends IInitialChangesable<TAppState> {
  routeConfig: RouteOptionsT;
  mappers?: Array<ConnectorMapperT<TAppState, IKeyValue>>;
  sectionName?: string;
}

export interface IConnectorConfig<TAppState extends IDefaultApplicationState, TApplicationAccessConfig>
    extends IBasicConnectorConfig<TAppState> {
  accessConfig?: TApplicationAccessConfig;
}

export interface IConnectorCtor<TContainer> extends ComponentLifecycle<{}, {}> {
  defaultProps?: IBaseContainerInternalProps;
  new(...args): TContainer;
}

export type ConnectorConfigT = IConnectorConfig<IDefaultApplicationState, IApplicationAccessConfig>;
export type ConnectorMapperT<TAppState, TResult> = (state: TAppState) => TResult;

export const CONNECTOR_SECTION_FIELD = '$$section';

export const CONNECTED_CONTAINER_INIT_ACTION_TYPE = `${ACTION_PREFIX}connected.container.init`;
export const CONNECTED_CONTAINER_DESTROY_ACTION_TYPE = `${ACTION_PREFIX}connected.container.destroy`;
