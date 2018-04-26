import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { RootContainer } from './root.container';

export class PrivateRootContainer extends RootContainer {

  public render(): JSX.Element {
    const Component = this.props.container;
    const accessConfig = this.props.accessConfig;

    const render = (_) => {
      if (this.auth.isAuthorized()) {
        return accessConfig && !this.permissionService.isAccessible(accessConfig)
            ? <Redirect to={this.routes.accessDenied}/>
            : <Component routeParams={this.routeParams}
                         queryParams={this.queryParams}/>;
      } else {
        return <Redirect to={this.routes.signIn}/>;
      }
    };
    return <Route render={render}/>;
  }
}
