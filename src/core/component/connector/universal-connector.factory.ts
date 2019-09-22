import { connect } from 'react-redux';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn } from '../../util';
import { IKeyValue } from '../../definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';
import { IUniversalContainerEntity } from '../../definition';
import { IUniversalStoreEntity, IUniversalContainerClassEntity } from '../../entities-definitions.interface';
import { ConnectorMapperT } from '../../configurations-definitions.interface';

const logger = LoggerFactory.makeLogger('universal-connector.factory');

/**
 * @stable [27.08.2018]
 * @param {IUniversalContainerClassEntity} containerCtor
 * @param {ConnectorMapperT<TStoreEntity extends IUniversalStoreEntity>} mappers
 * @returns {IUniversalContainerClassEntity}
 */
export const universalConnectorFactory = <TStoreEntity extends IUniversalStoreEntity = IUniversalStoreEntity>(
  containerCtor: IUniversalContainerClassEntity,
  ...mappers: Array<ConnectorMapperT<TStoreEntity>>): IUniversalContainerClassEntity => {

  const mapping = (state: TStoreEntity) => mappers.length
    ? (mappers as Array<ConnectorMapperT<TStoreEntity> | IKeyValue>)
      .reduce((previousValue, currentMapper) => {
        try {
          return {
            ...isFn(previousValue)
              ? (previousValue as ConnectorMapperT<TStoreEntity>)(state)
              : previousValue,
            ...(currentMapper as ConnectorMapperT<TStoreEntity>)(state),
          };
        } catch (e) {
          logger.error('[$universalConnectorFactory] The error:', e);
          return previousValue;
        }
      })
    : {};
  return connect(mapping)(containerCtor);
};
