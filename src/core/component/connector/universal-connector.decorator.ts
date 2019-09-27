import { ComponentLifecycle } from 'react';
import { Store } from 'redux';
import { LoggerFactory } from 'ts-smart-logger';

import { noop, sequence, isObjectNotEmpty, isFn  } from '../../util';
import { DI_TYPES, staticInjector, getStore } from '../../di';
import { IBasicConnectorConfigEntity, IConnectorConfigEntity } from '../../configurations-definitions.interface';
import { IUniversalContainerClassEntity } from '../../entities-definitions.interface';
import { APPLICATION_SECTIONS } from '../application/application.interface';
import { STACK_POP_ACTION_TYPE, STACK_PUSH_ACTION_TYPE } from '../../store/stack/stack.interface';
import { DYNAMIC_ROUTES } from '../../router/router.interface';
import { CONNECTOR_SECTION_FIELD } from './universal-connector.interface';
import { universalConnectorFactory } from './universal-connector.factory';
import { ConnectorActionBuilder } from './connector-action.builder';
import { IUniversalContainerEntity, IUniversalStoreEntity } from '../../definition';

const logger = LoggerFactory.makeLogger('universal-connector.decorator');

/**
 * @stable - 23.04.2018
 * @param {IBasicConnectorConfigEntity<TStoreEntity>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const basicConnector = <TStoreEntity extends IUniversalStoreEntity>(
  config: IBasicConnectorConfigEntity<TStoreEntity>
) =>
  (target: IUniversalContainerClassEntity): void => {
    let finalTarget = target;
    if (config.callback) {
      config.callback(target);
    }

    const sectionName = target.defaultProps && target.defaultProps.sectionName;
    if (sectionName) {
      Reflect.set(target, CONNECTOR_SECTION_FIELD, sectionName);

      APPLICATION_SECTIONS.set(sectionName, config);

      const proto: ComponentLifecycle<{}, {}> = target.prototype;
      proto.componentWillUnmount = sequence(
        proto.componentWillUnmount || noop,
        () => {
          const store = staticInjector<Store<{}>>(DI_TYPES.Store);
          store.dispatch({type: STACK_POP_ACTION_TYPE, data: sectionName});
          store.dispatch({type: ConnectorActionBuilder.buildDestroyActionType(sectionName)});

          logger.debug(`[$basicConnector][componentWillUnmount] Section: ${sectionName}`);
        }
      );

      finalTarget = class extends target {

        constructor(props) {
          super(props);

          const injectedServices = config.injectedServices;
          if (Array.isArray(injectedServices)) {
            injectedServices.forEach((ctor) => {
              if (isObjectNotEmpty(ctor.$$name)) {
                Reflect.set(this, ctor.$$name, Reflect.construct(ctor, [this]));
              }
            });
          }
          logger.debug(`[$basicConnector][constructor] Section: ${sectionName}`);
        }

        /**
         * @stable [11.09.2019]
         */
        public componentDidMount(): void {
          if (isObjectNotEmpty(sectionName)) {
            const store = getStore();
            store.dispatch({type: STACK_PUSH_ACTION_TYPE, data: sectionName});
            store.dispatch({type: ConnectorActionBuilder.buildInitActionType(sectionName)});

            logger.debug(`[$basicConnector][componentDidMount] Section: ${sectionName}`);
          } else {
            logger.debug(`[$basicConnector][componentDidMount] Constructor: ${target}`);
          }

          if (isFn(super.componentDidMount)) {
            super.componentDidMount();
          }
        }
      };
    } else {
      logger.warn(
        `[$basicConnector] The sectionName is not defined for ${target.name ||
        target}. The init and destroy actions are disabled.`
      );
    }
    DYNAMIC_ROUTES.set(universalConnectorFactory<TStoreEntity>(finalTarget, ...config.mappers), config);
  };

/**
 * @stable - 23.04.2018
 * @param {IConnectorConfigEntity<TStoreEntity extends IUniversalStoreEntity, TAccessConfig>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const connector = <TStoreEntity extends IUniversalStoreEntity, TAccessConfig>(
    config: IConnectorConfigEntity<TStoreEntity, TAccessConfig>
) => basicConnector(config);
