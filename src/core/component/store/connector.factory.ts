import { connect } from 'react-redux';

import { isFn } from 'core/util';
import { ApplicationStateT } from 'core/store';
import { BaseContainerT } from 'core/component/base';
import { IKeyValue } from 'core/definition.interface';
import { IContainerWrapperCtor } from 'core/component/application';

import { ConnectorMapperT, IConnectorCtor } from './container.interface';

export const connectorFactory = <TAppState extends ApplicationStateT>(
    containerCtor: IConnectorCtor<BaseContainerT>,
    mappers: Array<ConnectorMapperT<TAppState, IKeyValue>> = []
): IContainerWrapperCtor => {
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
