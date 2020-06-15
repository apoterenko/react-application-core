import { LoggerFactory } from 'ts-smart-logger';

import {
  ifNotNilThanValue,
} from '../../util';
import {
  getConnectorContainerFactory,
  getDynamicRoutes,
  getDynamicSections,
} from '../../di';
import { connectorFactory } from './connector.factory';
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
export const basicConnector = <TStoreEntity extends IUniversalStoreEntity = IUniversalStoreEntity>(
  config: IBasicConnectorEntity<TStoreEntity>
) =>
  (target: IUniversalContainerCtor): void => {
    let finalTarget = target;

    const section = ifNotNilThanValue(target.defaultProps, (defaultProps) => defaultProps.sectionName);
    if (section) {
      getDynamicSections().set(section, config);
      finalTarget = getConnectorContainerFactory().fromTarget(target, section);
    } else {
      logger.warn(
        `[$basicConnector] The sectionName is not defined for ${target.name ||
        target}. The init and destroy actions are disabled.`
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
