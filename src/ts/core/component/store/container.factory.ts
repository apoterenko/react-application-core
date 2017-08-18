import { connect } from 'react-redux'

import {
  IBaseContainer, IBaseContainerInternalProps, IBaseContainerInternalState
} from '../base/base.interface';
import { IApplicationState } from '../../store/store.interface';
import { IApplicationPermissionState } from '../../permission/permission.interface';
import { ConnectorMapperT, IConnectorCtor } from './container.interface';
import { IKeyValue } from '../../definition.interface';

export const containerFactory = <TContainer extends IBaseContainer<TInternalProps, TInternalState>,
                                 TAppState extends IApplicationState<TPermissionState, TPermissions>,
                                 TInternalProps extends IBaseContainerInternalProps,
                                 TInternalState extends IBaseContainerInternalState,
                                 TPermissionState extends IApplicationPermissionState<TPermissions>,
                                 TPermissions>
    (
        containerCtor: IConnectorCtor<TContainer>,
        mapper: ConnectorMapperT<TAppState, IKeyValue>
    ) => {
  return connect((state: TAppState) => mapper(state), {})(containerCtor);
};
