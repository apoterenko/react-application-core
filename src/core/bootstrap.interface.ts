import { connect, Provider } from 'react-redux';

import { ApplicationContainer } from './component/application';
import { IApplicationState } from './store';
import { IApplicationDictionariesState } from './dictionary';
import { IApplicationPermissionsState } from './permission';

export interface IContainerBootstrapCtor<TContainer extends ApplicationContainer<TAppState, TDictionariesState, TPermissionsState, TPermissions, TPermissionObject>,
    TAppState extends IApplicationState<TDictionariesState, TPermissionsState, TPermissions>,
    TDictionariesState extends IApplicationDictionariesState,
    TPermissionsState extends IApplicationPermissionsState<TPermissions>,
    TPermissions,
    TPermissionObject> {
  new (...args): TContainer;
}
