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

#### Containers

###### Roles container

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
import { AccessConfigT, IRoleEntity } from '../permission.interface';
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
        <DefaultLayoutContainer {...props}
                                navigationControls={<SearchToolbarContainer {...props}/>}>
          <ListContainer listOptions={{
                           itemOptions: { itemValue: this.itemValue },
                           addAction: this.permissionService.isAccessible(AppPermissions.ROLE_ADD),
                         }}
                         {...props}/>
        </DefaultLayoutContainer>
    );
  }

  private itemValue = (item: IRoleEntity): JSX.Element => (
     <span>
       {item.name} {this.nc.id(item.id)}
     </span>
  )
}
```

###### Role container

```typescript
import * as React from 'react';

import {
  BaseContainer,
  FormContainer,
  FormDialog,
  IFormDialogInternalProps,
  TextField,
  toSelectOptions,
  entityMapper,
  formMapper,
  IDialog,
  DefaultLayoutContainer,
  defaultMappers,
  ChipsField,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { IRoleContainerInternalProps, ROLE_SECTION } from './role.interface';
import { IAppState } from '../../../app.interface';
import { RIGHTS_DICTIONARY } from '../../../dictionary';
import { ROUTER_PATHS } from '../../../app.routers';
import { AccessConfigT } from '../../permission.interface';
import { AppPermissions } from '../../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLE,
  },
  accessConfig: [AppPermissions.ROLE_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => formMapper(state.roles.role),
    (state: IAppState) => entityMapper(
        state.roles.list ? state.roles.list.selected : null,
        state.roles.role
    )
  ],
})
class RoleContainer extends BaseContainer<IRoleContainerInternalProps, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: ROLE_SECTION,
  };

  constructor(props: IRoleContainerInternalProps) {
    super(props);
    this.loadRights = this.loadRights.bind(this);
    this.navigationControlHandler = this.navigationControlHandler.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const entity = props.entity;
    const entityId = entity ? entity.id : null;
    const isNewEntity = !entityId;
    const dictionaries = props.dictionaries;
    const rights = dictionaries.rights && dictionaries.rights.data;
    const title = isNewEntity
        ? 'New role'
        : `Role ${this.nc.id(entityId)}`;

    return (
        <DefaultLayoutContainer navigationControlType='arrow_back'
                                navigationControlHandler={this.navigationControlHandler}
                                title={title}
                                {...props}>
          <FormContainer {...props}>
            <TextField name='name'
                       value={entity.name}
                       label='Name'
                       autoFocus={true}
                       required={true}/>
            <ChipsField name='rights'
                        label='Rights'
                        options={toSelectOptions(rights)}
                        value={entity.rights}
                        onEmptyOptions={this.loadRights}
                        useFilter={true}/>
          </FormContainer>
          <FormDialog ref='formDialog'
                      onAccept={this.navigateToBack}
                      {...props}>
          </FormDialog>
        </DefaultLayoutContainer>
    );
  }

  private loadRights(): void {
    this.dispatchLoadDictionary(RIGHTS_DICTIONARY);
  }

  private navigationControlHandler(): void {
    (this.refs.formDialog as IDialog<IFormDialogInternalProps>).activate();
  }
}
```

#### Effects

```typescript
import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provideInSingleton,
  ListActionBuilder,
  BaseEffects,
  NEW_OPTION,
  effectsBy,
  makeFilteredListEffectsProxy,
  makeUntouchedListEffectsProxy,
  makeFailedListEffectsProxy,
} from 'react-application-core';

import { IApi } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { ROLES_SECTION } from './roles.interface';
import { IRoleEntity } from '../permission.interface';
import { IAppState } from '../../app.interface';

@provideInSingleton(RolesEffects)
@effectsBy(
    makeUntouchedListEffectsProxy<IAppState>({
      section: ROLES_SECTION,
      listWrapperStateResolver: (state) => state.roles,
    }),
    makeFilteredListEffectsProxy({
      section: ROLES_SECTION,
    }),
    makeFailedListEffectsProxy(ROLES_SECTION)
)
export class RolesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(ListActionBuilder.buildLoadActionType(ROLES_SECTION))
  public onRolesSearch(_: IEffectsAction, state: IAppState): Promise<IRoleEntity[]> {
    return this.api.searchRoles(state.roles.filter.query);
  }

  @EffectsService.effects(ListActionBuilder.buildSelectActionType(ROLES_SECTION))
  public onRolesEntitySelect(action: IEffectsAction): IEffectsAction[] {
    return this.buildOpenListEntityActions(
        ROLES_SECTION,
        this.buildRoleRoutePath(action.data.selected.id)
    );
  }

  @EffectsService.effects(ListActionBuilder.buildAddItemActionType(ROLES_SECTION))
  public onRolesEntityCreate(): IEffectsAction[] {
    return this.buildOpenListEntityActions(ROLES_SECTION, this.buildRoleRoutePath(NEW_OPTION));
  }

  private buildRoleRoutePath(id: string|number): string {
    return ROUTER_PATHS.ROLE.replace(':id', String(id));
  }
}
```

```typescript
import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  FormActionBuilder,
  IApiEntity,
  BaseEffects,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../../app.routers';
import { ROLES_SECTION } from '../roles.interface';
import { ROLE_SECTION } from './role.interface';
import { IApi } from '../../../api/api.interface';
import { IRoleEntity } from '../../permission.interface';

@provideInSingleton(RoleEffects)
export class RoleEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(ROLE_SECTION))
  public onSaveRole(action: IEffectsAction): Promise<IEffectsAction[]> {
    const apiEntity = action.data as IApiEntity<IRoleEntity>;
    return this.api.saveRole(apiEntity).then((result) => [
      this.buildFormSubmitDoneAction(ROLE_SECTION),
      this.buildListEntityUpdateAction(ROLES_SECTION, apiEntity, result),
      this.buildRouterNavigateAction(ROUTER_PATHS.ROLES)
    ]);
  }

  @EffectsService.effects(FormActionBuilder.buildSubmitErrorActionType(ROLE_SECTION))
  public onSaveRoleError(action: IEffectsAction): IEffectsAction {
    return this.buildNotificationErrorAction(action.error);
  }
}
```

# Contributors

[<img alt="apoterenko" src="https://avatars0.githubusercontent.com/u/12325691?v=4&s=460" width="117">](https://github.com/apoterenko)[<img alt="chge" src="https://avatars3.githubusercontent.com/u/400840?v=4&s=460" width="117">](https://github.com/chge)

## License

Licensed under MIT.