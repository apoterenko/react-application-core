import { ComponentLifecycle } from 'react';
import { Store } from 'redux';
import * as R from 'ramda';
import { ILogger, LoggerFactory } from 'ts-smart-logger';

import { FunctionT, noop, sequence } from '../../util';
import { BaseContainerT } from '../../component/base';
import { ApplicationStateT } from '../../store';
import { DYNAMIC_ROUTES } from '../../router';
import { connectorFactory } from './connector.factory';
import { IConnectorConfig, IConnectorCtor } from './connector.interface';
import { appContainer, DI_TYPES } from '../../di';
import { ConnectorActionBuilder } from './connector-builder.action';
import { APPLICATION_SECTIONS } from '../application';

const logger: ILogger = LoggerFactory.makeLogger('connector.decorator');

export function connector<TAppState extends ApplicationStateT, TApplicationAccessConfig>(
    config: IConnectorConfig<TAppState, TApplicationAccessConfig>): FunctionT {
  return (target: IConnectorCtor<BaseContainerT>): void => {
    const sectionName = target.defaultProps && target.defaultProps.sectionName || config.sectionName;

    if (!R.isNil(sectionName)) {
      if (sectionName) {
        const sectionName0 = sectionName as string;
        APPLICATION_SECTIONS.push(sectionName0);

        const proto: ComponentLifecycle<{}, {}> = target.prototype;
        proto.componentWillUnmount = sequence(
            proto.componentWillUnmount || noop,
            () => {
              const store: Store<ApplicationStateT> = appContainer.get(DI_TYPES.Store);
              store.dispatch({type: ConnectorActionBuilder.buildDestroyActionType(sectionName0)});
            }
        );
        proto.componentWillMount = sequence(
            proto.componentWillMount || noop,
            () => {
              const store: Store<ApplicationStateT> = appContainer.get(DI_TYPES.Store);
              store.dispatch({type: ConnectorActionBuilder.buildInitActionType(sectionName0)});
            }
        );
      }
    } else {
      logger.debug(
          `The sectionName props is not defined for container ${target.name || target} connector. The init/destroy actions are disabled.`
      );
    }

    DYNAMIC_ROUTES.set(
        connectorFactory<TAppState>(target, config.mappers),
        config
    );
  };
}
