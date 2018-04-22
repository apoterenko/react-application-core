import { connect } from 'react-redux';

import { isFn } from '../../util';
import { IKeyValue } from '../../definitions.interface';
import { IContainerClassEntity } from '../../entities-definitions.interface';
import { ConnectorMapperT } from '../../configurations-definitions.interface';

export const connectorFactory = <TStoreEntity>(
  containerCtor: IContainerClassEntity,
  ...mappers: Array<ConnectorMapperT<TStoreEntity>>): IContainerClassEntity => {

  const mapping = (state: TStoreEntity) => mappers.length
    ? (mappers as Array<ConnectorMapperT<TStoreEntity> | IKeyValue>)
      .reduce((previousValue, currentMapper) => {
        return {
          ...isFn(previousValue)
            ? (previousValue as ConnectorMapperT<TStoreEntity>)(state)
            : previousValue,
          ...(currentMapper as ConnectorMapperT<TStoreEntity>)(state),
        };
      })
    : {};
  return connect(mapping)(containerCtor);
};
