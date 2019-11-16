import * as R from 'ramda';
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { BaseRootContainer } from './base-root.container';
import { isObjectNotEmpty } from '../../util';

export class PrivateRootContainer extends BaseRootContainer {

  /**
   * @stable [16.11.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <Route
        render={() => {
          if (this.auth.isAuthorized()) {
            const props = this.props;
            const Component = props.container;
            const accessConfiguration = props.accessConfiguration;

            return isObjectNotEmpty(accessConfiguration) && !this.hasPermission(accessConfiguration)
              ? <Redirect to={this.routes.accessDenied}/>
              : (
                <Component
                  routeParams={this.routeParams}
                  queryParams={this.queryParams}/>
              );
          } else {
            const queryParams = this.queryParams.toString();
            const {signIn} = this.routes;
            return <Redirect to={R.isEmpty(queryParams) ? signIn : `${signIn}/?${queryParams}`}/>;
          }
        }}/>
    );
  }
}
