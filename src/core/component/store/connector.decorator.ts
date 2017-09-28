import { FunctionT } from '../../util';
import { BaseContainerT } from '../../component/base';
import { ApplicationStateT } from '../../store';
import { DYNAMIC_ROUTES } from '../../router';

import { connectorFactory } from './connector.factory';
import { IConnectorConfig, IConnectorCtor } from './container.interface';

export function connector<TAppState extends ApplicationStateT, TApplicationAccessConfig>(
    config: IConnectorConfig<TAppState, TApplicationAccessConfig>): FunctionT {
  return (target: IConnectorCtor<BaseContainerT>): void => {
    DYNAMIC_ROUTES.set(
        connectorFactory<TAppState>(target, config.mappers),
        config
    );
  };
}
