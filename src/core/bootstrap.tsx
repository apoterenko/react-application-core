import * as React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';

import { appContainer, DI_TYPES } from './di';
import { ApplicationContainer, IApplicationContainerProps } from './component/application';
import { ApplicationStateT, IApplicationState } from './store';
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

export function bootstrap(
    applicationContainer: IContainerBootstrapCtor<ApplicationContainer<ApplicationStateT, IApplicationDictionariesState, IApplicationPermissionsState<{}>, {}, {}>,
                                                  ApplicationStateT,
                                                  IApplicationDictionariesState,
                                                  IApplicationPermissionsState<{}>,
                                                  {},
                                                  {}>,
    props?: IApplicationContainerProps,
    rootId = 'root',
    ) {
  const ready = () => {
    const Component = connect((state: ApplicationStateT) => ({ ...state.applicationReady }), {})
                                  (applicationContainer);
    render(
        <Provider store={appContainer.get(DI_TYPES.Store)}>
          <Component {...props}/>
        </Provider>,
        document.getElementById(rootId),
    );
  };

  document.readyState === 'loading' ?
      document.addEventListener('DOMContentLoaded', ready) :
      document.body ?
          ready() :
          window.addEventListener('load', ready);
}
