import { connect } from 'react-redux';

import { IKeyValue } from 'core/definition.interface';
import { IApplicationPermissionState } from 'core/permission';
import { IApplicationState } from 'core/store';
import {
  IBaseContainer,
  IBaseContainerInternalProps,
  IBaseContainerInternalState,
} from 'core/component';
import { ConnectorMapperT, IConnectorCtor } from './container.interface';

export const containerFactory = <TContainer extends IBaseContainer<TInternalProps, TInternalState>,
                                 TAppState extends IApplicationState<TPermissionState, TPermissions>,
                                 TInternalProps extends IBaseContainerInternalProps,
                                 TInternalState extends IBaseContainerInternalState,
                                 TPermissionState extends IApplicationPermissionState<TPermissions>,
                                 TPermissions>
    (
        containerCtor: IConnectorCtor<TContainer>,
        mapper: ConnectorMapperT<TAppState, IKeyValue>,
    ) => {
  return connect((state: TAppState) => mapper(state), {})(containerCtor);
};
