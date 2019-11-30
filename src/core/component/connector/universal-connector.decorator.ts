import * as React from 'react';
import { LoggerFactory } from 'ts-smart-logger';

import {
  ifNotNilThanValue,
  isFn,
  isObjectNotEmpty,
  noop,
  sequence,
} from '../../util';
import {
  getDynamicRoutes,
  getDynamicSections,
  getStore,
  getUiFactory,
} from '../../di';
import { ConnectorActionBuilder } from './connector-action.builder';
import { STACK_POP_ACTION_TYPE, STACK_PUSH_ACTION_TYPE } from '../../store/stack/stack.interface';
import { universalConnectorFactory } from './universal-connector.factory';
import {
  IBasicConnectorEntity,
  IConnectorEntity,
  IUniversalContainerCtor,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../definition';

const logger = LoggerFactory.makeLogger('universal-connector.decorator');

/**
 * @stable - 23.04.2018
 * @param {IBasicConnectorEntity<TStoreEntity>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const basicConnector = <TStoreEntity extends IUniversalStoreEntity>(
  config: IBasicConnectorEntity<TStoreEntity>
) =>
  (target: IUniversalContainerCtor): void => {
    let finalTarget = target;

    const sectionName = ifNotNilThanValue(target.defaultProps, (defaultProps) => defaultProps.sectionName);
    if (sectionName) {
      getDynamicSections().set(sectionName, config);

      // TODO
      const proto: React.ComponentLifecycle<{}, {}> = target.prototype;
      proto.componentWillUnmount = sequence(
        proto.componentWillUnmount || noop,
        () => {
          const store = getStore();
          store.dispatch({type: STACK_POP_ACTION_TYPE, data: sectionName});
          store.dispatch({type: ConnectorActionBuilder.buildDestroyActionType(sectionName)});

          logger.debug(`[$basicConnector][componentWillUnmount] Section: ${sectionName}`);
        }
      );

      finalTarget = class extends target {

        /**
         * @stable [09.10.2019]
         * @param {IUniversalContainerProps} props
         */
        constructor(props: IUniversalContainerProps) {
          super(props);
          this.overrideRenderMethod();

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

        /**
         * @stable [07.10.2019]
         */
        private overrideRenderMethod(): void {
          const originalRenderer = this.render;
          if (!isFn(originalRenderer)) {
            return;
          }
          this.render = (): React.ReactNode => {
            try {
              return originalRenderer.call(this);
            } catch (e) {
              logger.debug('[$basicConnector][overrideRenderMethod] Error:', e);
              return getUiFactory().makeReactError(e);
            }
          };
        }
      };
    } else {
      logger.warn(
        `[$basicConnector] The sectionName is not defined for ${target.name ||
        target}. The init and destroy actions are disabled.`
      );
    }
    getDynamicRoutes().set(universalConnectorFactory<TStoreEntity>(finalTarget, ...config.mappers), config);
  };

/**
 * @stable - 23.04.2018
 * @param {IConnectorEntity<TStoreEntity extends IUniversalStoreEntity, TAccessConfig>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const connector = <TStoreEntity extends IUniversalStoreEntity, TAccessConfig>(
    config: IConnectorEntity<TStoreEntity, TAccessConfig>
) => basicConnector(config);
