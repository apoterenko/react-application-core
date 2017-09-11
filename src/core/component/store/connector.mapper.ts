import { IApplicationFormState, IFormEntity } from 'core/component/form';
import { IApplicationState } from 'core/store';
import { IApplicationPermissionState } from 'core/permission';
import { IApplicationListState } from 'core/component/list';

export const layoutMapper = <TAppState extends IApplicationState<TPermissionState, TPermissions>,
                             TPermissionState extends IApplicationPermissionState<TPermissions>,
                             TPermissions>
(state: TAppState) => ({
  layout: {
    ...state.layout,
  },
});

export const entityMapper = (entity: IFormEntity, formState?: IApplicationFormState) => ({
  entity: {
    ...entity || {},
    ...formState && formState.changes,
  },
});

export const formAttributesMapper = (formState: IApplicationFormState) => ({
  attributes: {
    ...formState,
  },
});

export const listMapper = (listState: IApplicationListState) => ({
  list: {
    ...listState,
  },
});
