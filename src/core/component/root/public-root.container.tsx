import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { RootContainer } from '../../component/root';

export class PublicRootContainer extends RootContainer {

  public render(): JSX.Element {
    const Component = this.props.container;
    const render = () => this.isAuthorized
        ? <Redirect to={this.routes.home}/>
        : <Component routeParams={this.routeParams}
                     queryParams={this.queryParams}/>;

    return <Route render={render}/>;
  }
}
