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
  IListContainer,
  IDateConverter,
  lazyInject,
  DI_TYPES,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { IRole } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { IRolesContainerInternalProps, ROLES_SECTION } from './roles.interface';
import { IAppState } from '../../app.interface';
import { AccessConfigT } from '../permission.interface';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLES,
  },
  accessConfig: ['roles.view'],
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

  @lazyInject(DI_TYPES.DateConverter) private dateConverter: IDateConverter;

  constructor(props: IRolesContainerInternalProps) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <DefaultLayoutContainer {...props}>
          <SearchToolbarContainer onSearch={this.onSearch}
                                  {...props}/>
          <ListContainer listOptions={{ renderer: this.listRenderer, addAction: true }}
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

#### Effects

```typescript
import { EffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provide,
  BaseEffects,
  FormActionBuilder,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../app.routers';
import { IApi, IUser } from '../../api/api.interface';
import { TOTP_SECTION } from './totp.interface';
import { PermissionsT } from '../../permission/permission.interface';

@provide(TotpEffects)
export class TotpEffects extends BaseEffects<IApi> {

  private static TOTP_AUTH_NONCE_DONE_ACTION_TYPE = `${TOTP_SECTION}.auth.nonce.done`;

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(TOTP_SECTION))
  public onAuthNonce(action: EffectsAction): Promise<EffectsAction[]> {
    return this.api.authNonce(action.data)
        .then((result) => ([
          this.buildPermissionAuthorizedUpdateAction(),
          EffectsAction.create(TotpEffects.TOTP_AUTH_NONCE_DONE_ACTION_TYPE)
        ]));
  }

  @EffectsService.effects(TotpEffects.TOTP_AUTH_NONCE_DONE_ACTION_TYPE)
  public onAccountGet(action: EffectsAction): Promise<EffectsAction[]> {
    return Promise.all<IUser | PermissionsT>([
      this.api.accountGet(),
      this.api.accountRights()
    ]).then((data: Array<IUser | PermissionsT>) => ([
      this.buildFormSubmitDoneAction(TOTP_SECTION),
      this.buildUserUpdateAction(data[0] as IUser),
      this.buildPermissionPermissionsUpdateAction(data[1] as PermissionsT),
      this.buildRouterNavigateAction(ROUTER_PATHS.ROLES)
    ]));
  }
}
```

# Contributors

[<img alt="apoterenko" src="https://avatars0.githubusercontent.com/u/12325691?v=4&s=460" width="117">](https://github.com/apoterenko)[<img alt="chge" src="https://avatars3.githubusercontent.com/u/400840?v=4&s=460" width="117">](https://github.com/chge)