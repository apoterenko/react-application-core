import * as React from 'react';
import { render } from 'react-dom';

import { ApplicationContainer } from './component/application/application.container';
import { IApplicationContainerProps } from './component/application/application.interface';
import { ApplicationStateT, IApplicationState } from './store/store.interface';
import { IApplicationDictionariesState } from './dictionary/dictionaries.interface';
import { IApplicationPermissionsState } from './permission/permission.interface';
import { AnyT } from './definition.interface';
import { BASE_PATH } from './env/env.interface';

export interface IContainerBootstrapCtor<TContainer extends ApplicationContainer<TAppState, IApplicationContainerProps, TDictionariesState, TPermissionsState, TPermissions, TPermissionObject>,
                                         TAppState extends IApplicationState<TDictionariesState, TPermissionsState, TPermissions>,
                                         TDictionariesState extends IApplicationDictionariesState,
                                         TPermissionsState extends IApplicationPermissionsState<TPermissions>,
                                         TPermissions,
                                         TPermissionObject> {
  new (...args): TContainer;
}

export function bootstrap(
    applicationContainer: IContainerBootstrapCtor<ApplicationContainer<ApplicationStateT, IApplicationContainerProps, IApplicationDictionariesState, IApplicationPermissionsState<{}>, {}, {}>,
                                                  ApplicationStateT,
                                                  IApplicationDictionariesState,
                                                  IApplicationPermissionsState<{}>,
                                                  {},
                                                  {}>,
    rootId = 'root',
    basePath = BASE_PATH) {
  const Component = applicationContainer as AnyT;
  const ready = () => {
    render(
        <Component basename={basePath || BASE_PATH}>
        </Component>,
        document.getElementById(rootId),
    );
  };

  document.readyState === 'loading' ?
      document.addEventListener('DOMContentLoaded', ready) :
      document.body ?
          ready() :
          window.addEventListener('load', ready);
}
