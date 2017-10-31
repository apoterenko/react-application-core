import { ComponentLifecycle } from 'react';

import { IRouteComponentConfig } from '../../router/router.interface';
import { IKeyValue } from '../../definition.interface';
import { IApplicationState, ApplicationStateT } from '../../store';
import { IApplicationAccessConfig } from '../../permission';
import { IBaseContainerInternalProps } from '../../component/base';

export interface IConnectorConfig<TAppState extends ApplicationStateT, TApplicationAccessConfig> {
  routeConfig: IRouteComponentConfig;
  accessConfig?: TApplicationAccessConfig;
  mappers?: Array<ConnectorMapperT<TAppState, IKeyValue>>;
  sectionName?: string|boolean;
}

export interface IConnectorCtor<TContainer> extends ComponentLifecycle<{}, {}> {
  defaultProps?: IBaseContainerInternalProps;
  new(...args): TContainer;
}

export type ConnectorConfigT = IConnectorConfig<ApplicationStateT, IApplicationAccessConfig>;
export type ConnectorMapperT<TAppState, TResult> = (state: TAppState) => TResult;

export const CONNECTOR_INIT_ACTION_TYPE = 'init';
export const CONNECTOR_DESTROY_ACTION_TYPE = 'destroy';
