import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IRootContainerInternalProps, RootContainer } from 'core/component/root';

export class PublicRootContainer<TPermissionObject>
    extends RootContainer<IRootContainerInternalProps, TPermissionObject> {

  public render(): JSX.Element {
    const Component = this.props.container;
    const render = (props) => this.isAuthorized
        ? <Redirect to={this.routers.home}/>
        : <Component routeParams={this.routeParams}
                     queryParams={this.queryParams}/>;

    return <Route render={render}/>;
  }
}
