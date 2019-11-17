import { connect } from 'react-redux';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn } from '../../util';
import { IKeyValue } from '../../definitions.interface';
import {
  ConnectorMapperT,
  IUniversalContainerCtor,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../definition';

const logger = LoggerFactory.makeLogger('universal-connector.factory');

/**
 * @stable [16.11.2019]
 * @param {IUniversalContainerCtor} containerCtor
 * @param {ConnectorMapperT<TStoreEntity extends IUniversalStoreEntity>} mappers
 * @returns {IUniversalContainerCtor}
 */
export const universalConnectorFactory = <TStoreEntity extends IUniversalStoreEntity = IUniversalStoreEntity>(
  containerCtor: IUniversalContainerCtor,
  ...mappers: Array<ConnectorMapperT<TStoreEntity>>): IUniversalContainerCtor => {

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
