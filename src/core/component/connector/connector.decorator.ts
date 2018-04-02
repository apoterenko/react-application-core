import { ComponentLifecycle } from 'react';
import { Store } from 'redux';
import { LoggerFactory } from 'ts-smart-logger';

import { FunctionT, noop, sequence } from '../../util';
import { BaseContainerT } from '../../component/base';
import { IDefaultApplicationState } from '../../store';
import { DYNAMIC_ROUTES } from '../../router';
import { connectorFactory } from './connector.factory';
import {
  IConnectorConfig,
  IConnectorCtor,
  CONNECTOR_SECTION_FIELD,
  IBasicConnectorConfig,
} from './connector.interface';
import { DI_TYPES, staticInjector } from '../../di';
import { APPLICATION_SECTIONS } from '../application';
import { STACK_POP_ACTION_TYPE, STACK_PUSH_ACTION_TYPE } from '../../store';
import { ConnectorActionBuilder } from './connector-action.builder';

const logger = LoggerFactory.makeLogger('connector.decorator');

export function basicConnector<TAppState extends IDefaultApplicationState>(
    config: IBasicConnectorConfig<TAppState>): FunctionT {
  return (target: IConnectorCtor<BaseContainerT>): void => {
    const sectionName = target.defaultProps && target.defaultProps.sectionName || config.sectionName;

    if (sectionName) {
        Reflect.set(target, CONNECTOR_SECTION_FIELD, sectionName);

        const sectionName0 = sectionName as string;
        APPLICATION_SECTIONS.set(sectionName0, config);

        const proto: ComponentLifecycle<{}, {}> = target.prototype;
        proto.componentWillUnmount = sequence(
            proto.componentWillUnmount || noop,
            () => {
              const store = staticInjector<Store<IDefaultApplicationState>>(DI_TYPES.Store);
              store.dispatch({ type: STACK_POP_ACTION_TYPE, data: sectionName0 });
              store.dispatch({ type: ConnectorActionBuilder.buildDestroyActionType(sectionName0) });

              logger.debug(`[$basicConnector][componentWillUnmount] Section: ${sectionName0}`);
            }
        );
        proto.componentWillMount = sequence(
            proto.componentWillMount || noop,
            () => {
              const store = staticInjector<Store<IDefaultApplicationState>>(DI_TYPES.Store);
              store.dispatch({ type: STACK_PUSH_ACTION_TYPE, data: sectionName0 });
              store.dispatch({ type: ConnectorActionBuilder.buildInitActionType(sectionName0) });

              logger.debug(`[$basicConnector][componentWillMount] Section: ${sectionName0}`);
            }
        );
    } else {
      logger.warn(
          `[$basicConnector] The sectionName props is not defined for the container ${target.name ||
          target} connector. The init/destroy actions are disabled.`
      );
    }

    DYNAMIC_ROUTES.set(
        connectorFactory<TAppState>(target, ...config.mappers),
        config
    );
  };
}

export function connector<TAppState extends IDefaultApplicationState, TApplicationAccessConfig>(
    config: IConnectorConfig<TAppState, TApplicationAccessConfig>): FunctionT {
  return basicConnector(config);
}
