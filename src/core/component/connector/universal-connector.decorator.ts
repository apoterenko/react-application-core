import { LoggerFactory } from 'ts-smart-logger';

import {
  ifNotNilThanValue,
  isFn,
  patchRenderMethod,
} from '../../util';
import {
  getDynamicRoutes,
  getDynamicSections,
  getStore,
} from '../../di';
import { ConnectorActionBuilder } from './connector-action.builder';
import {
  STACK_POP_ACTION_TYPE,
  STACK_PUSH_ACTION_TYPE,
} from '../../store/stack/stack.interface';
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

      finalTarget = class extends target {

        /**
         * @stable [09.10.2019]
         * @param {IUniversalContainerProps} props
         */
        constructor(props: IUniversalContainerProps) {
          super(props);
          patchRenderMethod(this);

          logger.debug(`[$basicConnector][constructor] Section: ${sectionName}`);
        }

        /**
         * @stable [02.12.2019]
         */
        public componentWillUnmount(): void {
          const store = getStore();
          store.dispatch({type: STACK_POP_ACTION_TYPE, data: sectionName});
          store.dispatch({type: ConnectorActionBuilder.buildDestroyActionType(sectionName)});

          logger.debug(`[$basicConnector][componentWillUnmount] Section: ${sectionName}`);

          if (isFn(super.componentWillUnmount)) {
            super.componentWillUnmount();
          }
        }

        /**
         * @stable [11.09.2019]
         */
        public componentDidMount(): void {
          const store = getStore();
          store.dispatch({type: STACK_PUSH_ACTION_TYPE, data: sectionName});
          store.dispatch({type: ConnectorActionBuilder.buildInitActionType(sectionName)});

          logger.debug(`[$basicConnector][componentDidMount] Section: ${sectionName}`);

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
