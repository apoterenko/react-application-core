import { IRouteComponentConfig } from 'core/router/router.interface';
import { IKeyValue } from 'core/definition.interface';
import { ApplicationStateT } from 'core/store';

export interface IConnectorConfig<TAppState extends ApplicationStateT> {
  routeConfig: IRouteComponentConfig;
  mappers?: Array<ConnectorMapperT<TAppState, IKeyValue>>;
}

export interface IConnectorCtor<TContainer> {
  new(...args): TContainer;
}

export type ConnectorMapperT<TAppState, TResult> = (state: TAppState) => TResult;
