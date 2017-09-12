import { connect } from 'react-redux';

import { isFn } from 'core/util';
import { IApplicationPermissionState } from 'core/permission';
import { IApplicationState } from 'core/store';
import { IBaseContainer, IBaseContainerInternalProps, IBaseContainerInternalState } from 'core/component/base';
import { IKeyValue } from 'core/definition.interface';

import { ConnectorMapperT, IConnectorCtor } from './container.interface';

export const connectorFactory = <TContainer extends IBaseContainer<TInternalProps, TInternalState>,
                                 TAppState extends IApplicationState<TPermissionState, TPermissions>,
                                 TInternalProps extends IBaseContainerInternalProps,
                                 TInternalState extends IBaseContainerInternalState,
                                 TPermissionState extends IApplicationPermissionState<TPermissions>,
                                 TPermissions>
(containerCtor: IConnectorCtor<TContainer>,
 mappers: Array<ConnectorMapperT<TAppState, IKeyValue>>) => {
  return connect((state: TAppState) =>
      mappers.length
          ? (mappers as Array<ConnectorMapperT<TAppState, IKeyValue> | IKeyValue>)
              .reduce((previousValue, currentMapper) => {
                return {
                  ...isFn(previousValue)
                      ? (previousValue as ConnectorMapperT<TAppState, IKeyValue>)(state)
                      : previousValue,
                  ...(currentMapper as ConnectorMapperT<TAppState, IKeyValue>)(state),
                };
              })
          : {}, {})
  (containerCtor);
};
