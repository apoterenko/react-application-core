import { FunctionT } from 'core/util';
import { BaseContainerT } from 'core/component/base';
import { ApplicationStateT } from 'core/store';
import { DYNAMIC_ROUTES } from 'core/router';

import { connectorFactory } from './connector.factory';
import { IConnectorConfig, IConnectorCtor } from './container.interface';

export function connector<TAppState extends ApplicationStateT>(
  config: IConnectorConfig<TAppState>
): FunctionT {
  return (target: IConnectorCtor<BaseContainerT>): void => {
    DYNAMIC_ROUTES.set(
        connectorFactory<TAppState>(target, config.mappers),
        config.routeConfig
    );
  };
}
