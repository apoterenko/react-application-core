import { IApplicationPermissionState } from 'core/permission';
import { IApplicationState } from 'core/store';
import {
  IBaseContainerInternalState,
  containerFactory,
  ConnectorMapperT,
  IConnectorCtor
} from 'core/component';

import { IFormContainer, IFormContainerInternalProps, IFormEntity } from './form.interface';

export const editableFormContainerFactory = <TContainer extends IFormContainer<TEntity, TInternalProps, TInternalState>,
                                             TEntity extends IFormEntity,
                                             TAppState extends IApplicationState<TPermissionState, TPermissions>,
                                             TInternalProps extends IFormContainerInternalProps<TEntity>,
                                             TInternalState extends IBaseContainerInternalState,
                                             TPermissionState extends IApplicationPermissionState<TPermissions>,
                                             TPermissions>
    (
        containerCtor: IConnectorCtor<TContainer>,
        toEntityFn: ConnectorMapperT<TAppState, TEntity>,
        toFormStateFn: ConnectorMapperT<TAppState, IFormContainerInternalProps<TEntity>>,
    ) => {
      return containerFactory<TContainer, TAppState, TInternalProps, TInternalState, TPermissionState, TPermissions>(containerCtor, (state) => {
        const formState = toFormStateFn(state);
        const entity = toEntityFn(state);
        return {
          ...formState,
          entity: {
            ...entity || {},
            ...formState && formState.changes || {},
          },
        };
      });
};
