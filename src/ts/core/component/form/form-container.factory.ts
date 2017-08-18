import { IBaseContainer, IBaseContainerInternalState } from '../base/base.interface';
import { IApplicationState } from '../../store/store.interface';
import { IApplicationPermissionState } from '../../permission/permission.interface';
import { containerFactory } from '../store/container.factory';
import { IFormContainerInternalProps, IFormEntity } from './form.interface';
import { ConnectorMapperT, IConnectorCtor } from '../store/container.interface';

export const editableFormContainerFactory = <TContainer extends IBaseContainer<TInternalProps, TInternalState>,
                                             TEntity extends IFormEntity,
                                             TAppState extends IApplicationState<TPermissionState, TPermissions>,
                                             TInternalProps extends IFormContainerInternalProps<TEntity>,
                                             TInternalState extends IBaseContainerInternalState,
                                             TPermissionState extends IApplicationPermissionState<TPermissions>,
                                             TPermissions>
    (
        containerCtor: IConnectorCtor<TContainer>,
        toEntityFn: ConnectorMapperT<TAppState, TEntity>,
        toFormStateFn: ConnectorMapperT<TAppState, IFormContainerInternalProps<TEntity>>
    ) => {
      return containerFactory<TContainer, TAppState, TInternalProps, TInternalState, TPermissionState, TPermissions>(containerCtor, state => {
        const formState = toFormStateFn(state);
        const entity = toEntityFn(state);
        return {
          ...formState,
          entity: {
            ...entity || {},
            ...formState && formState.changes || {}
          }
        };
      });
};
