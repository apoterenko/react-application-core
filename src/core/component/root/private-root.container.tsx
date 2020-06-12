import * as R from 'ramda';
import * as React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';

import { BaseRootContainer } from './base-root.container';
import { ObjectUtils } from '../../util';

export class PrivateRootContainer extends BaseRootContainer {

  /**
   * @stable [16.11.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      accessDenied,
      signIn,
    } = this.settings.routes;

    return (
      <Route
        render={() => {
          if (this.auth.isAuthorized()) {
            const {
              accessConfiguration,
            } = this.props;
            const Component = this.props.container;

            return ObjectUtils.isObjectNotEmpty(accessConfiguration) && !this.hasPermission(accessConfiguration)
              ? <Redirect to={accessDenied}/>
              : (
                <Component
                  routeParams={this.routeParams}
                  queryParams={this.queryParams}/>
              );
          } else {
            const queryParams = this.queryParams.toString();
            return (
              <Redirect
                to={
                  R.isEmpty(queryParams)
                    ? signIn
                    : `${signIn}/?${queryParams}`
                }/>
            );
          }
        }}/>
    );
  }
}
