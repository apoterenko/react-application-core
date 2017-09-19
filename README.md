# React Application Core

A react-based application core for the business applications.

# Description

The library is designed to quickly start developing business applications are based on React, Redux, Material-UI.

# Dependencies

* [react](https://github.com/facebook/react)
* [redux](https://github.com/reactjs/redux)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router-dom](https://github.com/ReactTraining/react-router)
* [material-components-web](https://github.com/material-components/material-components-web)
* [ramda](https://github.com/ramda/ramda)
* [InversifyJS](https://github.com/inversify/InversifyJS)

# Usage

```typescript
import * as React from 'react';

import {
  listMapper,
  filterMapper,
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  SearchToolbarContainer,
  ListContainer,
  IListContainer,
  IDateConverter,
  lazyInject,
  DI_TYPES,
  PRIVATE_COMPONENT_TYPE,
} from 'core';

import './roles.effects';

import { IRolesContainerInternalProps, ROLES_SECTION } from './roles.interface';
import { IRole } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { appConnector } from '../../store/connector.decorator';

@appConnector<RolesContainer, IRolesContainerInternalProps, {}>({
  routeConfig: {
    type: PRIVATE_COMPONENT_TYPE,
    path: ROUTER_PATHS.ROLES,
  },
  mappers: [
    ...defaultMappers,
    (state) => filterMapper(state.roles.filter),
    (state) => listMapper(state.roles.list)
  ],
})
class RolesContainer extends BaseContainer<IRolesContainerInternalProps, {}> {

  @lazyInject(DI_TYPES.DateConverter) private dateConverter: IDateConverter;

  constructor(props: IRolesContainerInternalProps) {
    super(props, ROLES_SECTION);
    this.onSearch = this.onSearch.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <DefaultLayoutContainer sectionName={this.sectionName}
                                {...props}>
          <SearchToolbarContainer sectionName={this.sectionName}
                                  onSearch={this.onSearch}
                                  {...props}/>
          <ListContainer sectionName={this.sectionName}
                         renderer={this.listRenderer}
                         ref='list'
                         {...props}/>
        </DefaultLayoutContainer>
    );
  }

  private onSearch(value: string): void {
    (this.refs.list as IListContainer).load(value);
  }

  private listRenderer = (item: IRole) => (
     <span>
        {item.name || item.id} &nbsp; {this.dateConverter.formatDate(item.modified)}
     </span>
  )
}
```

# Contributors

[<img alt="apoterenko" src="https://avatars0.githubusercontent.com/u/12325691?v=4&s=460" width="117">](https://github.com/apoterenko)[<img alt="chge" src="https://avatars3.githubusercontent.com/u/400840?v=4&s=460" width="117">](https://github.com/chge)