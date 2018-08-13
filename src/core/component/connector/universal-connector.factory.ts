import { connect } from 'react-redux';

import { isFn } from '../../util';
import { IKeyValue } from '../../definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';
import { IUniversalApplicationStoreEntity, IUniversalContainerClassEntity } from '../../entities-definitions.interface';
import { ConnectorMapperT } from '../../configurations-definitions.interface';

/* @stable - 23.04.2018 */
export const universalConnectorFactory = <TStoreEntity extends IUniversalApplicationStoreEntity = IUniversalApplicationStoreEntity>(
  containerCtor: IUniversalContainerClassEntity,
  ...mappers: Array<ConnectorMapperT<TStoreEntity>>): IUniversalContainerClassEntity => {

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
