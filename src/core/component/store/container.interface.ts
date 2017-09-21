import { IRouteComponentConfig } from 'core/router/router.interface';
import { IKeyValue } from 'core/definition.interface';
import { IApplicationState, ApplicationStateT } from 'core/store';
import { IApplicationAccessConfig } from 'core/permission';

export interface IConnectorConfig<TAppState extends ApplicationStateT, TApplicationAccessConfig> {
  routeConfig: IRouteComponentConfig;
  accessConfig?: TApplicationAccessConfig;
  mappers?: Array<ConnectorMapperT<TAppState, IKeyValue>>;
}

export interface IConnectorCtor<TContainer> {
  new(...args): TContainer;
}

export type ConnectorConfigT = IConnectorConfig<ApplicationStateT, IApplicationAccessConfig>;
export type ConnectorMapperT<TAppState, TResult> = (state: TAppState) => TResult;
