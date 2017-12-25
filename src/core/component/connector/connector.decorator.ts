import { ComponentLifecycle } from 'react';
import { Store } from 'redux';
import { LoggerFactory } from 'ts-smart-logger';

import { FunctionT, noop, sequence } from '../../util';
import { BaseContainerT } from '../../component/base';
import { ApplicationStateT } from '../../store';
import { DYNAMIC_ROUTES } from '../../router';
import { connectorFactory } from './connector.factory';
import { IConnectorConfig, IConnectorCtor, CONNECTOR_SECTION_FIELD } from './connector.interface';
import { appContainer, DI_TYPES } from '../../di';
import { ConnectorActionBuilder } from './connector-builder.action';
import { APPLICATION_SECTIONS } from '../application';
import {
  LOCK_CONTAINER_INIT_ACTION_TYPE,
  LOCK_CONTAINER_DESTROY_ACTION_TYPE,
  LOCK_DESTROYABLE_SECTIONS_ACTION_TYPE,
} from '../../lock';

const logger = LoggerFactory.makeLogger('connector.decorator');

export function connector<TAppState extends ApplicationStateT, TApplicationAccessConfig>(
    config: IConnectorConfig<TAppState, TApplicationAccessConfig>): FunctionT {
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
              const store: Store<ApplicationStateT> = appContainer.get(DI_TYPES.Store);
              store.dispatch({type: ConnectorActionBuilder.buildDestroyActionType(sectionName0)});
              store.dispatch({type: LOCK_CONTAINER_DESTROY_ACTION_TYPE, data: sectionName0});

              logger.debug(`[$connector][componentWillUnmount] Section: ${sectionName0}`);
            }
        );
        proto.componentWillMount = sequence(
            proto.componentWillMount || noop,
            () => {
              const store: Store<ApplicationStateT> = appContainer.get(DI_TYPES.Store);
              store.dispatch({type: ConnectorActionBuilder.buildInitActionType(sectionName0)});
              store.dispatch({type: LOCK_CONTAINER_INIT_ACTION_TYPE, data: sectionName0});
              store.dispatch({type: LOCK_DESTROYABLE_SECTIONS_ACTION_TYPE, data: sectionName0});

              logger.debug(`[$connector][componentWillMount] Section: ${sectionName0}`);
            }
        );
    } else {
      logger.warn(
          `The sectionName props is not defined for the container ${target.name || target} connector. The init/destroy actions are disabled.`
      );
    }

    DYNAMIC_ROUTES.set(
        connectorFactory<TAppState>(target, config.mappers),
        config
    );
  };
}
