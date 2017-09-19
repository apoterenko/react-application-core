import { FunctionT } from 'core/util';
import {
  IBaseContainer,
  IBaseContainerInternalProps,
  IBaseContainerInternalState
} from 'core/component/base';
import { IApplicationState } from 'core/store';
import { dynamicRoutesMap } from 'core/router';
import { IApplicationDictionariesState } from 'core/dictionary';
import { IApplicationPermissionsState } from 'core/permission';

import { connectorFactory } from './connector.factory';
import { IConnectorConfig } from './container.interface';

export function connector<TContainer extends IBaseContainer<TInternalProps, TInternalState>,
                          TAppState extends IApplicationState<TDictionariesState, TPermissionsState, TPermissions>,
                          TInternalProps extends IBaseContainerInternalProps,
                          TInternalState extends IBaseContainerInternalState,
                          TDictionariesState extends IApplicationDictionariesState,
                          TPermissionsState extends IApplicationPermissionsState<TPermissions>,
                          TPermissions>(
  config: IConnectorConfig<TAppState, TDictionariesState, TPermissionsState, TPermissions>
): FunctionT {
  return (target: { new(...args): TContainer }): void => {
    const proxyContainer = connectorFactory<TContainer,
                                            TAppState,
                                            TInternalProps,
                                            TInternalState,
                                            TDictionariesState,
                                            TPermissionsState,
                                            TPermissions>(target, config.mappers);

    dynamicRoutesMap.set(proxyContainer, config.routeConfig);
  };
}
