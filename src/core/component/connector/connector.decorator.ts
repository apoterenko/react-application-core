import { LoggerFactory } from 'ts-smart-logger';

import {
  DiServices,
  getDynamicRoutes,
} from '../../di';
import { connectorFactory } from './connector.factory';
import {
  IBasicConnectorEntity,
  IConnectorEntity,
  IGenericContainerCtor,
  IReduxStoreEntity,
  IUniversalStoreEntity,
} from '../../definition';

const logger = LoggerFactory.makeLogger('universal-connector.decorator');

/**
 * @stable - 23.04.2018
 * @param {IBasicConnectorEntity<TStoreEntity>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const basicConnector = <TStoreEntity extends IReduxStoreEntity = IReduxStoreEntity>(
  config: IBasicConnectorEntity<TStoreEntity>
) =>
  (target: IGenericContainerCtor): void => {
    let finalTarget = target;
    const section = target.defaultProps?.sectionName;

    if (section) {
      DiServices.dynamicSections().set(section, config);
      finalTarget = DiServices.connectorContainerFactory().fromTarget(target, section, config);
    } else {
      logger.warn(
        `[$basicConnector] The sectionName is not defined for ${target.name || target
        }. The init and destroy actions are disabled.`
      );
    }
    getDynamicRoutes().set(connectorFactory<TStoreEntity>(finalTarget, ...config.mappers), config);
  };

/**
 * @stable - 23.04.2018
 * @param {IConnectorEntity<TStoreEntity extends IUniversalStoreEntity, TAccessConfig>} config
 * @returns {(target: IContainerClassEntity) => void}
 */
export const connector = <TStoreEntity extends IUniversalStoreEntity, TAccessConfig>(
    config: IConnectorEntity<TStoreEntity, TAccessConfig>
) => basicConnector(config);
