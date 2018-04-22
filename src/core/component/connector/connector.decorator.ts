import { ComponentLifecycle } from 'react';
import { Store } from 'redux';
import { LoggerFactory } from 'ts-smart-logger';

import { noop, sequence } from '../../util';
import { DI_TYPES, staticInjector } from '../../di';
import { IBasicConnectorConfiguration, IConnectorConfiguration } from '../../configurations-definitions.interface';
import { IContainerClassEntity } from '../../entities-definitions.interface';
import { APPLICATION_SECTIONS } from '../application/application.interface';
import { STACK_POP_ACTION_TYPE, STACK_PUSH_ACTION_TYPE } from '../../store/stack/stack.interface';
import { DYNAMIC_ROUTES } from '../../router/router.interface';
import { CONNECTOR_SECTION_FIELD } from './connector.interface';
import { universalConnectorFactory } from './connector.factory';
import { ConnectorActionBuilder } from './connector-action.builder';

const logger = LoggerFactory.makeLogger('connector.decorator');

/**
 * @stable - 15.04.2018
 * @param {IBasicConnectorConfiguration<TAppState>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const basicConnector = <TAppState>(config: IBasicConnectorConfiguration<TAppState>) =>
  (target: IContainerClassEntity): void => {
    if (config.callback) {
      config.callback(target);
    }

    const sectionName = target.defaultProps && target.defaultProps.sectionName;
    if (sectionName) {
      Reflect.set(target, CONNECTOR_SECTION_FIELD, sectionName);

      const sectionName0 = sectionName as string;
      APPLICATION_SECTIONS.set(sectionName0, config);

      const proto: ComponentLifecycle<{}, {}> = target.prototype;
      proto.componentWillUnmount = sequence(
        proto.componentWillUnmount || noop,
        () => {
          const store = staticInjector<Store<{}>>(DI_TYPES.Store);
          store.dispatch({type: STACK_POP_ACTION_TYPE, data: sectionName0});
          store.dispatch({type: ConnectorActionBuilder.buildDestroyActionType(sectionName0)});

          logger.debug(`[$basicConnector][componentWillUnmount] Section: ${sectionName0}`);
        }
      );
      proto.componentDidMount = sequence(
        proto.componentDidMount || noop,
        () => {
          const store = staticInjector<Store<{}>>(DI_TYPES.Store);
          store.dispatch({type: STACK_PUSH_ACTION_TYPE, data: sectionName0});
          store.dispatch({type: ConnectorActionBuilder.buildInitActionType(sectionName0)});

          logger.debug(`[$basicConnector][componentDidMount] Section: ${sectionName0}`);
        }
      );
    } else {
      logger.warn(
        `[$basicConnector] The sectionName props is not defined for ${target.name ||
        target}. The init and destroy actions are disabled.`
      );
    }
    DYNAMIC_ROUTES.set(universalConnectorFactory<TAppState>(target, ...config.mappers), config);
  };

export const connector = <TAppState, TApplicationAccessConfig>(
    config: IConnectorConfiguration<TAppState, TApplicationAccessConfig>
) => basicConnector(config);
