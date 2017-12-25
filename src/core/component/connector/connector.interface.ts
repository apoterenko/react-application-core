import { ComponentLifecycle } from 'react';

import { RouteOptionsT } from '../../router';
import { IInitialChangesable, IKeyValue } from '../../definition.interface';
import { IApplicationState, ApplicationStateT } from '../../store';
import { IApplicationAccessConfig } from '../../permission';
import { IBaseContainerInternalProps } from '../../component/base';

export interface IConnectorConfig<TAppState extends ApplicationStateT, TApplicationAccessConfig>
    extends IInitialChangesable<TAppState> {
  routeConfig: RouteOptionsT;
  accessConfig?: TApplicationAccessConfig;
  mappers?: Array<ConnectorMapperT<TAppState, IKeyValue>>;
  sectionName?: string;
}

export interface IConnectorCtor<TContainer> extends ComponentLifecycle<{}, {}> {
  defaultProps?: IBaseContainerInternalProps;
  new(...args): TContainer;
}

export type ConnectorConfigT = IConnectorConfig<ApplicationStateT, IApplicationAccessConfig>;
export type ConnectorMapperT<TAppState, TResult> = (state: TAppState) => TResult;

export const CONNECTOR_INIT_ACTION_TYPE = 'container.init';
export const CONNECTOR_DESTROY_ACTION_TYPE = 'container.destroy';
export const CONNECTOR_SECTION_FIELD = '$$section';
