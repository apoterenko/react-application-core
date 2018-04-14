import { ComponentClass } from 'react';
import { connect } from 'react-redux';

import { isFn } from '../../util';
import { IKeyValue, ISectionNameWrapper } from '../../definitions.interface';
import { IComponentClassEntity } from '../../entities-definitions.interface';
import { ConnectorMapperT } from '../../configurations-definitions.interface';

export const connectorFactory = <TAppState>(
    containerCtor: ComponentClass<ISectionNameWrapper>,
    ...mappers: Array<ConnectorMapperT<TAppState, IKeyValue>>
): IComponentClassEntity => {
  const mapping = (state: TAppState) => mappers.length
      ? (mappers as Array<ConnectorMapperT<TAppState, IKeyValue> | IKeyValue>)
          .reduce((previousValue, currentMapper) => {
            return {
              ...isFn(previousValue)
                  ? (previousValue as ConnectorMapperT<TAppState, IKeyValue>)(state)
                  : previousValue,
              ...(currentMapper as ConnectorMapperT<TAppState, IKeyValue>)(state),
            };
          })
      : {};
  return connect(mapping, {})(containerCtor);
};
