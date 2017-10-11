# React Application Core

A react-based application core for the business applications.

# Description

The library is designed to quickly start developing business applications are based on React, Redux, Material-UI.

# Demo

* [react-redux-typescript-webpack-seed](https://github.com/apoterenko/react-redux-typescript-webpack-seed)
* [Live demo](https://apoterenko.github.io/react-redux-typescript-webpack-seed)

# Dependencies

* [react](https://github.com/facebook/react)
* [redux](https://github.com/reactjs/redux)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router-dom](https://github.com/ReactTraining/react-router)
* [material-components-web](https://github.com/material-components/material-components-web)
* [ramda](https://github.com/ramda/ramda)
* [InversifyJS](https://github.com/inversify/InversifyJS)

# Usage

#### Container

```typescript
import * as React from 'react';

import {
  listWrapperMapper,
  filterWrapperMapper,
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  SearchToolbarContainer,
  ListContainer,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../app.routers';
import { IRolesContainerInternalProps, ROLES_SECTION } from './roles.interface';
import { IAppState } from '../../app.interface';
import { AccessConfigT, IRole } from '../permission.interface';
import { AppPermissions } from '../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLES,
  },
  accessConfig: [AppPermissions.ROLES_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => filterWrapperMapper(state.roles),
    (state) => listWrapperMapper(state.roles)
  ],
})
class RolesContainer extends BaseContainer<IRolesContainerInternalProps, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: ROLES_SECTION,
  };

  constructor(props: IRolesContainerInternalProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <DefaultLayoutContainer {...props}>
          <SearchToolbarContainer {...props}/>
          <ListContainer listOptions={{
                            renderer: this.listRenderer,
                            addAction: this.permissionService.isAccessible(AppPermissions.ROLE_ADD),
                         }}
                         {...props}/>
        </DefaultLayoutContainer>
    );
  }

  private listRenderer = (item: IRole) => (
     <span>
        {item.name || item.id}
     </span>
  )
}
```

#### Effects

```typescript
import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provideInSingleton,
  ListActionBuilder,
  FilterActionBuilder,
  BaseEffects,
  NEW_OPTION,
} from 'react-application-core';

import { IApi } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { ROLES_SECTION } from './roles.interface';
import { IRole } from '../permission.interface';
import { IAppState } from '../../app.interface';

@provideInSingleton(RolesEffects)
export class RolesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(ListActionBuilder.buildLoadActionType(ROLES_SECTION))
  public onRolesSearch(action: IEffectsAction, state: IAppState): Promise<IRole[]> {
    const query = state.roles.filter.query;
    return this.api.searchRoles(query);
  }

  @EffectsService.effects(ListActionBuilder.buildLoadErrorActionType(ROLES_SECTION))
  public onRolesSearchError(action: IEffectsAction): IEffectsAction {
    return this.buildNotificationErrorAction(action.error);
  }

  @EffectsService.effects(FilterActionBuilder.buildApplyActionType(ROLES_SECTION))
  public onRolesFilterApply(): IEffectsAction {
    return this.buildListLoadAction(ROLES_SECTION);
  }

  @EffectsService.effects(ListActionBuilder.buildSelectActionType(ROLES_SECTION))
  public onRolesEntitySelect(action: IEffectsAction): IEffectsAction[] {
    return this.buildOpenListFilterActions(
        ROLES_SECTION,
        this.buildRoleRoutePath(action.data.selected.id)
    );
  }

  @EffectsService.effects(ListActionBuilder.buildAddItemActionType(ROLES_SECTION))
  public onRolesEntityCreate(): IEffectsAction[] {
    return this.buildOpenListFilterActions(ROLES_SECTION, this.buildRoleRoutePath(NEW_OPTION));
  }

  private buildRoleRoutePath(id: string|number): string {
    return ROUTER_PATHS.ROLE.replace(':id', String(id));
  }
}
```

# Contributors

[<img alt="apoterenko" src="https://avatars0.githubusercontent.com/u/12325691?v=4&s=460" width="117">](https://github.com/apoterenko)[<img alt="chge" src="https://avatars3.githubusercontent.com/u/400840?v=4&s=460" width="117">](https://github.com/chge)

## License

Licensed under MIT.