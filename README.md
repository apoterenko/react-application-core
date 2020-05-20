# React Application Core

A react-based application core for the business applications.

[![Build Status](https://travis-ci.org/apoterenko/react-application-core.svg?branch=master)](https://travis-ci.org/apoterenko/react-application-core)

# Flow

![Flow](flow.png)

# Description

The library is designed to quickly start develop the business applications are based on React, Redux, Material-UI.

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
* [@dagrejs/graphlib](https://github.com/dagrejs/graphlib)
* [moment](https://github.com/moment/moment)
* [axios](https://github.com/axios/axios)
* [store](https://github.com/marcuswestin/store.js)
* [socket.io-client](https://github.com/socketio/socket.io-client)
* [react-text-mask](https://github.com/text-mask/text-mask)

# Classes & markers

#### @action-builder

* [FormActionBuilder (08.05.2020)](src/core/action/form-action.builder.ts)
* [PageToolbarActionBuilder](src/core/action/page-toolbar-action.builder.ts)

#### @component-container-impl

* [FilterFormDialogContainer (09.05.2020)](src/core/component/dialog/filter-form-dialog/filter-form-dialog.container.tsx)
* [FormContainer (09.05.2020)](src/core/component/form/form.container.tsx)
* [PageToolbarContainer](src/core/component/toolbar/page/page-toolbar.container.tsx)
* [SearchToolbarContainer](src/core/component/toolbar/search/search-toolbar.container.tsx)
* [ToolbarToolsContainer (10.05.2020)](src/core/component/toolbar-tools/toolbar-tools.container.tsx)

#### @component-impl

* [Dialog & BaseDialog (11.05.2020)](src/core/component/dialog/base-dialog.component.tsx)
* [GridHead (20.05.2020)](src/core/component/grid/head/grid-head.component.tsx)
* [Main (20.05.2020)](src/core/component/main/main.component.tsx)
* [PageToolbar (12.05.2020)](src/core/component/toolbar/page/page-toolbar.component.tsx)
* [SearchToolbar](src/core/component/toolbar/search/search-toolbar.component.tsx)
* [SubHeader (20.05.2020)](src/core/component/sub-header/sub-header.component.tsx)
* [UnsavedFormChangesDialog (11.05.2020)](src/core/component/dialog/unsaved-form-changes-dialog/unsaved-form-changes-dialog.component.ts)

#### @effects-proxy-factory

* [makeDestroyedContainerEffectsProxy](src/core/store/effects/destroyed-container-effects.proxy.ts)
* [makeFilteredListEffectsProxy](src/core/store/effects/filtered-list-effects.proxy.ts)

#### @reducer

* [formReducer](src/core/component/form/form.reducer.ts)
* [queryFilterReducer](src/core/component/filter/query-filter.reducer.ts)

# Theme customization (styling)

#### Button

* [_button.scss (13.05.2020)](src/core/component/button/_button.scss)
* [_button-constant.scss (13.05.2020)](src/core/component/button/_button-constant.scss)
* [_button-mixin.scss (13.05.2020)](src/core/component/button/_button-mixin.scss)

#### Dialog

* [_dialog.scss (11.05.2020)](src/core/component/dialog/_dialog.scss)
* [_dialog-constant.scss (11.05.2020)](src/core/component/dialog/_dialog-constant.scss)

#### NavigationList

* [_navigation-list.scss (15.05.2020)](src/core/component/navigation-list/_navigation-list.scss)
* [_navigation-list-constant.scss (15.05.2020)](src/core/component/navigation-list/_navigation-list-constant.scss)
* [_navigation-list-mixin.scss (15.05.2020)](src/core/component/navigation-list/_navigation-list-mixin.scss)

#### TabPanel

* [_tab-panel.scss (19.05.2020)](src/core/component/tab-panel/_tab-panel.scss)
* [_tab-panel-constant.scss (19.05.2020)](src/core/component/tab-panel/_tab-panel-constant.scss)
* [_tab-panel-mixin.scss (19.05.2020)](src/core/component/tab-panel/_tab-panel-mixin.scss)

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
  ListContainer,
  ContainerVisibilityTypeEnum,
  actionsDisabledListWrapperEntityMapper,
  connector,
  SearchFieldToolbarContainer,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../app.routes';
import { IRolesContainerProps, ROLES_SECTION } from './roles.interface';
import { IAppState } from '../../app.interface';
import { AccessConfigT, IRoleEntity } from '../permission.interface';
import { AppPermissions } from '../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfiguration: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLES,
  },
  accessConfiguration: [AppPermissions.ROLES_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => filterWrapperMapper(state.roles),
    (state) => listWrapperMapper(state.roles)
  ],
})
class RolesContainer extends BaseContainer<IRolesContainerProps> {

  public static defaultProps: IRolesContainerProps = {
    sectionName: ROLES_SECTION,
  };

  public render(): JSX.Element {
    const props = this.props;
    const header = <SearchFieldToolbarContainer filterConfiguration={actionsDisabledListWrapperEntityMapper(props)}
                                               {...props}/>;
    return (
      <DefaultLayoutContainer headerConfiguration={{ items: header }}
                              {...props}>
        <ListContainer listConfiguration={{
                        itemConfiguration: { tpl: this.tpl },
                        useAddAction: this.permissionService.isAccessible(AppPermissions.ROLE_ADD),
                       }}
                       {...props}/>
      </DefaultLayoutContainer>
    );
  }

  private tpl = (item: IRoleEntity): JSX.Element => (
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
  TextField,
  toSelectOptions,
  FORM_DIALOG_REF,
  listWrapperSelectedEntityMapper,
  formMapper,
  DefaultLayoutContainer,
  defaultMappers,
  ChipsField,
  ContainerVisibilityTypeEnum,
  connector,
  LayoutBuilder,
  LayoutBuilderTypeEnum,
} from 'react-application-core';

import { IRoleContainerProps, ROLE_SECTION } from './role.interface';
import { IAppState } from '../../../app.interface';
import { RIGHTS_DICTIONARY } from '../../../dictionary';
import { ROUTER_PATHS } from '../../../app.routes';
import { AccessConfigT } from '../../permission.interface';
import { AppPermissions } from '../../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfiguration: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLE,
  },
  accessConfiguration: [AppPermissions.ROLE_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => formMapper(state.roles.role),
    (state) => listWrapperSelectedEntityMapper(state.roles, state.roles.role)
  ],
})
class RoleContainer extends BaseContainer<IRoleContainerProps> {

  public static defaultProps: IRoleContainerProps = {
    sectionName: ROLE_SECTION,
  };

  private readonly layoutBuilder = new LayoutBuilder();

  public render(): JSX.Element {
    const props = this.props;
    const dictionaries = props.dictionaries;
    const rights = dictionaries.rights && dictionaries.rights.data;
    const title = props.newEntity
      ? 'New role'
      : `Role ${this.nc.id(props.entityId)}`;

    return (
      <DefaultLayoutContainer headerConfiguration={{
                                navigationActionType: 'arrow_back',
                                onNavigationActionClick: this.activateFormDialog,
                              }}
                              title={title}
                              {...props}>
        <FormContainer {...props}>
          {
            this.layoutBuilder.build({
              layout: LayoutBuilderTypeEnum.VERTICAL,
              children: [
                <TextField name='name'
                           label='Name'
                           autoFocus={true}
                           required={true}/>,
                <ChipsField name='rights'
                            label='Rights'
                            options={toSelectOptions(rights)}
                            bindDictionary={RIGHTS_DICTIONARY}
                            menuConfiguration={{ useFilter: true, renderToCenterOfBody: true }}
                            displayMessage='%d right(s)'/>
              ],
            })
          }
        </FormContainer>
        <FormDialog ref={FORM_DIALOG_REF}
                    onAccept={this.navigateToBack}
                    {...props}/>
      </DefaultLayoutContainer>
    );
  }
}
```

#### Effects

###### Roles effects

```typescript
import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  buildEntityRoute,
  provideInSingleton,
  ListActionBuilder,
  BaseEffects,
  effectsBy,
  makeFilteredListEffectsProxy,
  makeUntouchedListEffectsProxy,
  makeFailedListLoadEffectsProxy,
  makeEditedListEffectsProxy,
} from 'react-application-core';

import { IApi } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routes';
import { ROLES_SECTION } from './roles.interface';
import { IRoleEntity } from '../permission.interface';
import { IAppState } from '../../app.interface';
import { ROLE_SECTION } from './role';

@provideInSingleton(RolesEffects)
@effectsBy(
  makeUntouchedListEffectsProxy<IAppState>({
    section: ROLES_SECTION,
    resolver: (state) => state.roles,
  }),
  makeEditedListEffectsProxy<IRoleEntity, IAppState>({
    listSection: ROLES_SECTION,
    formSection: ROLE_SECTION,
    pathResolver: (role) => buildEntityRoute<IRoleEntity>(ROUTER_PATHS.ROLE, role),
  }),
  makeFilteredListEffectsProxy({ section: ROLES_SECTION }),
  makeFailedListLoadEffectsProxy(ROLES_SECTION)
)
class RolesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(ListActionBuilder.buildLoadActionType(ROLES_SECTION))
  public $onRolesSearch(_: IEffectsAction, state: IAppState): Promise<IRoleEntity[]> {
    return this.api.searchRoles(state.roles.filter.query);
  }
}
```

###### Role effects

```typescript
import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  FormActionBuilder,
  IApiEntity,
  BaseEffects,
  makeSucceedFormEffectsProxy,
  makeFailedFormEffectsProxy,
  effectsBy,
} from 'react-application-core';

import { ROLES_SECTION } from '../roles.interface';
import { ROLE_SECTION } from './role.interface';
import { IApi } from '../../../api/api.interface';
import { IRoleEntity } from '../../permission.interface';

@provideInSingleton(RoleEffects)
@effectsBy(
    makeFailedFormEffectsProxy(ROLE_SECTION),
    makeSucceedFormEffectsProxy({
      listSection: ROLES_SECTION,
      formSection: ROLE_SECTION,
    })
)
class RoleEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(ROLE_SECTION))
  public onSaveRole(action: IEffectsAction): Promise<IRoleEntity> {
    return this.api.saveRole(action.data as IApiEntity<IRoleEntity>);
  }
}
```

## License

Licensed under MIT.