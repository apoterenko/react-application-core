import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { RootContainer } from './root.container';

export class PublicRootContainer extends RootContainer {

  public render(): JSX.Element {
    const Component = this.props.container;
    const render = () => (
      <Component
        routeParams={this.routeParams}
        queryParams={this.queryParams}/>
    );

    return <Route render={render}/>;
  }
}
