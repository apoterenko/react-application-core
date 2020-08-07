import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { BaseRootContainer } from './base-root.container';

export class PublicRootContainer extends BaseRootContainer {

  /**
   * @stable [16.11.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const Component = this.originalProps.container;
    return (
      <Route
        render={() => (
          <Component
            routeParams={this.routeParams}
            queryParams={this.queryParams}/>
        )}/>
    );
  }
}
