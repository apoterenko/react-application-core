import { IRouteComponentConfig } from '../../router/router.interface';
import { IKeyValue } from '../../definition.interface';
import { IApplicationState, ApplicationStateT } from '../../store';
import { IApplicationAccessConfig } from '../../permission';

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
