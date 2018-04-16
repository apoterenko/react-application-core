import * as React from 'react';
import {
  Scene,
  Router,
  Reducer,
  Stack,
} from 'react-native-router-flux';

import { IApplicationContainerProps } from './application.interface';
import {
  IDefaultConnectorConfiguration,
  IRouteConfiguration,
} from '../../configurations-definitions.interface';
import { IContainerClassEntity } from '../../entities-definitions.interface';
import { UniversalApplicationContainer } from './universal-application.container';

export const reducerCreate = (params) => {
  const defaultReducer = new Reducer(params);
  return (state, action) => defaultReducer(state, action);
};

export class RnApplicationContainer extends UniversalApplicationContainer<IApplicationContainerProps> {

  public static defaultProps: IApplicationContainerProps = {
    hideNavBar: true,
  };

  public render(): JSX.Element {
    const props = this.props;
    return (
      <Router
        createReducer={reducerCreate}>
        <Stack hideNavBar={props.hideNavBar}
               key='root'>
          {this.getRoutes()}
        </Stack>
      </Router>
    );
  }

  protected buildRoute(ctor: IContainerClassEntity,
                       connectorConfiguration: IDefaultConnectorConfiguration,
                       routeConfiguration: IRouteConfiguration): JSX.Element {
    return (
      <Scene
        component={ctor}
        key={routeConfiguration.key || routeConfiguration.path}
        path={routeConfiguration.path}
        title={routeConfiguration.title}
        initial={!!routeConfiguration.initial}
      />
    );
  }
}
