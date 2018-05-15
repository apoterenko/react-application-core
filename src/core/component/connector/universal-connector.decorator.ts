import { ComponentLifecycle } from 'react';
import { Store } from 'redux';
import { LoggerFactory } from 'ts-smart-logger';

import { noop, sequence } from '../../util';
import { DI_TYPES, staticInjector } from '../../di';
import { IBasicConnectorConfiguration, IConnectorConfiguration } from '../../configurations-definitions.interface';
import { IUniversalContainerClassEntity, IUniversalApplicationStoreEntity } from '../../entities-definitions.interface';
import { APPLICATION_SECTIONS } from '../application/application.interface';
import { STACK_POP_ACTION_TYPE, STACK_PUSH_ACTION_TYPE } from '../../store/stack/stack.interface';
import { DYNAMIC_ROUTES } from '../../router/router.interface';
import { CONNECTOR_SECTION_FIELD } from './universal-connector.interface';
import { universalConnectorFactory } from './universal-connector.factory';
import { ConnectorActionBuilder } from './universal-connector-action.builder';
import { IUniversalContainerProps } from '../../props-definitions.interface';

const logger = LoggerFactory.makeLogger('connector.decorator');

/**
 * @stable - 23.04.2018
 * @param {IBasicConnectorConfiguration<TStoreEntity>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const basicConnector = <TStoreEntity extends IUniversalApplicationStoreEntity>(
  config: IBasicConnectorConfiguration<TStoreEntity>
) =>
  (target: IUniversalContainerClassEntity): void => {
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
    DYNAMIC_ROUTES.set(universalConnectorFactory<TStoreEntity>(target, ...config.mappers), config);
  };

/**
 * @stable - 23.04.2018
 * @param {IConnectorConfiguration<TStoreEntity extends IUniversalApplicationStoreEntity, TAccessConfig>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const connector = <TStoreEntity extends IUniversalApplicationStoreEntity, TAccessConfig>(
    config: IConnectorConfiguration<TStoreEntity, TAccessConfig>
) => basicConnector(config);
