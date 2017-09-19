import { IRouteComponentConfig } from 'core/router/router.interface';
import { IKeyValue } from 'core/definition.interface';
import { IApplicationState } from 'core/store';
import { IApplicationDictionariesState } from 'core/dictionary';
import { IApplicationPermissionsState } from 'core/permission';

export interface IConnectorConfig<TAppState extends IApplicationState<TDictionariesState, TPermissionState, TPermissions>,
                                  TDictionariesState extends IApplicationDictionariesState,
                                  TPermissionState extends IApplicationPermissionsState<TPermissions>,
                                  TPermissions> {
  routeConfig: IRouteComponentConfig;
  mappers?: Array<ConnectorMapperT<TAppState, IKeyValue>>;
}

export interface IConnectorCtor<TContainer> {
  new(...args): TContainer;
}

export type ConnectorMapperT<TAppState, TResult> = (state: TAppState) => TResult;
