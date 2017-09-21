import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IRootContainerInternalProps } from './root.interface';
import { RootContainer } from './root.container';

export class PrivateRootContainer extends RootContainer<IRootContainerInternalProps> {

  public render(): JSX.Element {
    const Component = this.props.container;
    const accessConfig = this.props.accessConfig;

    const render = (_) => {
      if (this.isAuthorized) {
        return accessConfig && !this.permissionService.isAccessible(accessConfig)
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
