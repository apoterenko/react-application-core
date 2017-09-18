import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IProtectedComponentCtor } from 'core/permission';

import { IRootContainerInternalProps } from './root.interface';
import { RootContainer } from './root.container';

export class PrivateRootContainer<TPermissionObject>
    extends RootContainer<IRootContainerInternalProps, TPermissionObject> {

  public render(): JSX.Element {
    const Component = this.props.container as IProtectedComponentCtor<TPermissionObject>;
    const $$permissionConfig =
        (Component.WrappedComponent || Component).$$permissionConfig;

    const render = (_) => {
      if (this.isAuthorized) {
        return $$permissionConfig && !this.permissionService.isAccessible($$permissionConfig)
            ? <Redirect to={this.routers.accessDenied}/>
            : <Component routeParams={this.routeParams}
                         queryParams={this.queryParams}/>;
      } else {
        return <Redirect to={this.routers.login}/>;
      }
    };
    return <Route render={render}/>;
  }
}
