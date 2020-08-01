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

* [FilterFormDialogContainer (01.08.2020)](src/core/component/dialog/filter-form-dialog/filter-form-dialog.container.tsx)
* [FormContainer (09.05.2020)](src/core/component/form/form.container.tsx)
* [FormTabPanelContainer (30.07.2020)](src/core/component/tab-panel/form/form-tab-panel.container.tsx)
* [PageToolbarContainer (31.07.2020)](src/core/component/toolbar/page/page-toolbar.container.tsx)
* [SearchToolbarContainer (31.07.2020)](src/core/component/toolbar/search/search-toolbar.container.tsx)
* [TabPanelContainer (30.07.2020)](src/core/component/tab-panel/tab-panel.container.tsx)
* [ToolbarToolsContainer (10.06.2020)](src/core/component/toolbar-tools/toolbar-tools.container.tsx)
* [UnsavedFormChangesDialogContainer (15.06.2020)](src/core/component/dialog/unsaved-form-changes-dialog/unsaved-form-changes-dialog.container.tsx)

#### @component-impl

* [Chart (23.05.2020)](src/core/component/chart/chart.component.tsx)
* [Chip (02.06.2020)](src/core/component/chip/chip.component.tsx)
* [ChipsField (16.06.2020)](src/core/component/field/chips-field/chips-field.component.tsx)
* [Dialog & BaseDialog (11.05.2020)](src/core/component/dialog/base-dialog.component.tsx)
* [Drawer (29.05.2020)](src/core/component/drawer/drawer.component.tsx)
* [FormLayout (31.05.2020)](src/core/component/layout/form/form-layout.component.tsx)
* [GridHead (20.05.2020)](src/core/component/grid/head/grid-head.component.tsx)
* [Header (22.05.2020)](src/core/component/header/header.component.tsx)
* [ListItem (01.06.2020)](src/core/component/list/item/list-item.component.tsx)
* [Main (22.05.2020)](src/core/component/main/main.component.tsx)
* [PageToolbar (10.06.2020)](src/core/component/toolbar/page/page-toolbar.component.tsx)
* [SearchToolbar](src/core/component/toolbar/search/search-toolbar.component.tsx)
* [SubHeader (22.05.2020)](src/core/component/sub-header/sub-header.component.tsx)
* [SubHeaderLink (22.05.2020)](src/core/component/sub-header-link/sub-header-link.component.tsx)
* [Title (01.06.2020)](src/core/component/title/title.component.tsx)
* [ToolbarTools (01.08.2020)](src/core/component/toolbar-tools/toolbar-tools.component.tsx)
* [UnsavedFormChangesDialog (01.08.2020)](src/core/component/dialog/unsaved-form-changes-dialog/unsaved-form-changes-dialog.component.ts)

#### @effects-proxy-factory

* [makeDestroyedContainerEffectsProxy](src/core/store/effects/destroyed-container-effects.proxy.ts)
* [makeFilteredListEffectsProxy](src/core/store/effects/filtered-list-effects.proxy.ts)

#### @reducer

* [formReducer](src/core/component/form/form.reducer.ts)
* [queryFilterReducer](src/core/component/filter/query-filter.reducer.ts)

#### @map

* [map-as-component](src/core/util/map-as-component.ts)
* [map-as-container](src/core/util/map-as-component.ts)
* [map-as-original](src/core/util/map-as-original.ts)
* [map-as-wrapper](src/core/util/map-as-wrapper.ts)
* [map-as](src/core/util/map-as.ts)
* [map-container-as-component](src/core/util/map-as-component.ts)
* [map-entity-as-container](src/core/util/map-as-component.ts)
* [mapper](src/core/util/mapper.ts)

#### @configuration-entity

* [IConfigurationDialogEntity](src/core/definition/dialog-definition.interface.ts)
* [IConfigurationToolbarToolsEntity](src/core/definition/toolbar-tools-definition.interface.ts)

#### @redux-holder-entity

* [IReduxFormHolderEntity](src/core/definition/form-definition.interface.ts)
* [IReduxUnsavedFormChangesDialogHolderEntity](src/core/definition/unsaved-form-changes-dialog-definition.interface.ts)

# Theme customization (styling)

#### Button

* [_button.scss (13.05.2020)](src/core/component/button/_button.scss)
* [_button-constant.scss (13.05.2020)](src/core/component/button/_button-constant.scss)
* [_button-mixin.scss (13.05.2020)](src/core/component/button/_button-mixin.scss)

#### Chart

* [_chart.scss (23.05.2020)](src/core/component/chart/_chart.scss)
* [_chart-constant.scss (23.05.2020)](src/core/component/chart/_chart-constant.scss)
* [_chart-mixin.scss (23.05.2020)](src/core/component/chart/_chart-mixin.scss)

#### Chip

* [_chip.scss (02.06.2020)](src/core/component/chip/_chip.scss)
* [_chip-constant.scss (02.06.2020)](src/core/component/chip/_chip-constant.scss)
* [_chip-mixin.scss (02.06.2020)](src/core/component/chip/_chip-mixin.scss)

#### DefaultLayout

* [_default-layout.scss (27.05.2020)](src/core/component/layout/default/_default-layout.scss)
* [_default-layout-constant.scss (27.05.2020)](src/core/component/layout/default/_default-layout-constant.scss)
* [_default-layout-mixin.scss (27.05.2020)](src/core/component/layout/default/_default-layout-mixin.scss)

#### Dialog

* [_dialog.scss (11.05.2020)](src/core/component/dialog/_dialog.scss)
* [_dialog-constant.scss (11.05.2020)](src/core/component/dialog/_dialog-constant.scss)

#### Drawer

* [_drawer.scss (29.05.2020)](src/core/component/drawer/_drawer.scss)
* [_drawer-constant.scss (29.05.2020)](src/core/component/drawer/_drawer-constant.scss)
* [_drawer-mixin.scss (29.05.2020)](src/core/component/drawer/_drawer-mixin.scss)

#### Field

* [_field.scss (19.06.2020)](src/core/component/field/_field.scss)
* [_field-constant.scss (19.06.2020)](src/core/component/field/_field-constant.scss)
* [_field-mixin.scss (19.06.2020)](src/core/component/field/_field-mixin.scss)

#### Form

* [_form.scss (27.05.2020)](src/core/component/form/_form.scss)
* [_form-constant.scss (27.05.2020)](src/core/component/form/_form-constant.scss)
* [_form-mixin.scss (27.05.2020)](src/core/component/form/_form-mixin.scss)

#### FormLayout

* [_form-layout.scss (31.05.2020)](src/core/component/layout/form/_form-layout.scss)
* [_form-layout-constant.scss (31.05.2020)](src/core/component/layout/form/_form-layout-constant.scss)
* [_form-layout-mixin.scss (31.05.2020)](src/core/component/layout/form/_form-layout-mixin.scss)

#### Header

* [_header.scss (21.05.2020)](src/core/component/header/_header.scss)
* [_header-constant.scss (21.05.2020)](src/core/component/header/_header-constant.scss)
* [_header-mixin.scss (21.05.2020)](src/core/component/header/_header-mixin.scss)

#### Main

* [_main.scss (22.05.2020)](src/core/component/main/_main.scss)
* [_main-constant.scss (22.05.2020)](src/core/component/main/_main-constant.scss)
* [_main-mixin.scss (22.05.2020)](src/core/component/main/_main-mixin.scss)

#### NavigationList

* [_navigation-list.scss (15.05.2020)](src/core/component/navigation-list/_navigation-list.scss)
* [_navigation-list-constant.scss (15.05.2020)](src/core/component/navigation-list/_navigation-list-constant.scss)
* [_navigation-list-mixin.scss (15.05.2020)](src/core/component/navigation-list/_navigation-list-mixin.scss)

#### PageToolbar

* [_page-toolbar.scss (10.06.2020)](src/core/component/toolbar/page/_page-toolbar.scss)
* [_page-toolbar-constant.scss (10.06.2020)](src/core/component/toolbar/page/_page-toolbar-constant.scss)
* [_page-toolbar-mixin.scss (10.06.2020)](src/core/component/toolbar/page/_page-toolbar-mixin.scss)

#### SubHeaderLink

* [_sub-header-link.scss (22.05.2020)](src/core/component/sub-header-link/_sub-header-link.scss)
* [_sub-header-link-constant.scss (22.05.2020)](src/core/component/sub-header-link/_sub-header-link-constant.scss)
* [_sub-header-link-mixin.scss (22.05.2020)](src/core/component/sub-header-link/_sub-header-link-mixin.scss)

#### TabPanel

* [_tab-panel.scss (19.05.2020)](src/core/component/tab-panel/_tab-panel.scss)
* [_tab-panel-constant.scss (19.05.2020)](src/core/component/tab-panel/_tab-panel-constant.scss)
* [_tab-panel-mixin.scss (19.05.2020)](src/core/component/tab-panel/_tab-panel-mixin.scss)

#### TextField

* [_text-field.scss (18.06.2020)](src/core/component/field/text-field/_text-field.scss)
* [_text-field-constant.scss (18.06.2020)](src/core/component/field/text-field/_text-field-constant.scss)

#### Title

* [_title.scss (01.06.2020)](src/core/component/title/_title.scss)
* [_title-constant.scss (01.06.2020)](src/core/component/title/_title-constant.scss)
* [_title-mixin.scss (01.06.2020)](src/core/component/title/_title-mixin.scss)

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

###### Access group effects

```typescript
import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';
import {
  BaseEffects,
  CustomActionBuilder,
  DiSupport,
  effectsBy,
  EffectsFactories,
  FormActionBuilder,
  ListActionBuilder,
  RouterActionBuilder,
  Selectors,
} from 'react-application-core';

import { IPosAccessGroupEntity } from 'pos';

import { IApi } from '../../../api';
import { IPortalState } from '../../../app.interface';
import { PA_GROUP_SECTION } from './portal-access-group.interface';
import { PA_GROUPS_SECTION } from '../portal-access-groups.interface';
import { PortalRoutes } from '../../../app.routes';

@DiSupport.provideInSingleton(PortalAccessGroupEffects)
@effectsBy(
  EffectsFactories.formSubmitErrorEffectsProxy(PA_GROUP_SECTION),
  EffectsFactories.succeedEditedListEffectsProxy({
    listSection: PA_GROUPS_SECTION,
    formSection: PA_GROUP_SECTION,
  })
)
class PortalAccessGroupEffects extends BaseEffects<IApi> {

  /**
   * @stable [01.08.2020]
   * @param action
   */
  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(PA_GROUP_SECTION))
  public $onSaveAccessGroup = (action: IEffectsAction): Promise<IPosAccessGroupEntity> =>
    this.api.saveAccessGroup(action.data)

  /**
   * @stable [01.08.2020]
   * @param action
   * @param state
   */
  @EffectsService.effects(CustomActionBuilder.buildCustomDeleteActionType(PA_GROUP_SECTION))
  public async $onDeleteAccessGroup(action: IEffectsAction, state: IPortalState): Promise<IEffectsAction[]> {
    await this.api.deleteAccessGroup(
      Selectors.listSelectedEntity<IPosAccessGroupEntity>(state.access.accessGroups).id
    );
    return [
      ListActionBuilder.buildLoadAction(PA_GROUPS_SECTION),
      RouterActionBuilder.buildReplaceAction(PortalRoutes.ACCESS_GROUPS)
    ];
  }
}
```

## License

Licensed under MIT.