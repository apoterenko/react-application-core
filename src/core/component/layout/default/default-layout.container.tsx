import * as React from 'react';

import { Link } from 'core/component/link';
import { PersistentDrawer } from 'core/component/drawer';
import { Snackbar } from 'core/component/snackbar';
import {
  LAYOUT_FULL_MODE,
  LAYOUT_MINIMAL_MODE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
} from 'core/component/layout';
import { INavigationListItem, NavigationList } from 'core/component/list';
import { lazyInject, DI_TYPES } from 'core/di';
import { BaseContainer, IBaseContainerInternalState } from 'core/component/base';
import { IApplicationState } from 'core/store';
import { IApplicationPermissionState } from 'core/permission';
import { IRouters } from 'core/router';

import { IDefaultLayoutContainerInternalProps } from './default-layout.interface';

export class DefaultLayoutContainer<TAppState extends IApplicationState<TPermissionState, TPermissions>,
                                    TInternalProps extends IDefaultLayoutContainerInternalProps,
                                    TInternalState extends IBaseContainerInternalState,
                                    TPermissionState extends IApplicationPermissionState<TPermissions>,
                                    TPermissions>
    extends BaseContainer<TAppState,
                          TInternalProps,
                          TInternalState,
                          TPermissionState,
                          TPermissions> {

  public static defaultProps: IDefaultLayoutContainerInternalProps = {
    navigationControlType: 'menu',
    notification: {},
  };

  @lazyInject(DI_TYPES.Menu) private menu: INavigationListItem[];
  @lazyInject(DI_TYPES.Routers) private routers: IRouters;

  constructor(props: TInternalProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    let runtimeTitle;
    const props = this.props;
    const menu = this.menu.map((item) => ({
      ...item,
      activated: props.root.path === item.link,
    }));
    const title = props.title
        || ((runtimeTitle = menu.find((item) => item.activated)) ? runtimeTitle.text : props.title);

    const className = ['app-default-layout', this.props.className];

    return (
        <div className={className.filter((cls) => !!cls).join(' ')}>
          <PersistentDrawer opened={this.isLayoutFullMode}>
            <div className='mdc-persistent-drawer__toolbar-spacer'>
              {this.profileTpl}
            </div>
            <NavigationList items={menu}>
            </NavigationList>
          </PersistentDrawer>
          <div className='app-content'>
            <header className='mdc-toolbar'>
              <div className='mdc-toolbar__row'>
                <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                  <button className='material-icons mdc-toolbar__icon--menu'
                          onClick={this.onClick}>
                    {props.navigationControlType}
                  </button>
                  <span className='mdc-toolbar__title'>
                    {title}
                  </span>
                </section>
              </div>
            </header>
            <main>
              {props.children}
            </main>
          </div>
          {this.snackbarTpl}
        </div>
    );
  }

  protected get snackbarTpl(): JSX.Element {
    const props = this.props;
    const { notification } = props;
    const message = notification.error || notification.info;
    return message ? (
        <Snackbar message={message}>
        </Snackbar>
    ) : null;
  }

  protected get profileTpl(): JSX.Element {
    return (
        <Link to={this.routers.profile}
              className='app-profile-link'>
          <i className='material-icons'>person</i>
          <span className='app-profile-name'>{this.props.user.name}</span>
        </Link>
    );
  }

  protected onClick(): void {
    if (this.props.navigationControlHandler) {
      this.props.navigationControlHandler();
    } else {
      this.appStore.dispatch({
        type: `${LAYOUT_MODE_UPDATE_ACTION_TYPE}`,
        data: { mode: this.isLayoutFullMode ? LAYOUT_MINIMAL_MODE : LAYOUT_FULL_MODE },
      });
    }
  }

  protected get isLayoutFullMode(): boolean {
    return this.props.layout.mode === LAYOUT_FULL_MODE;
  }
}
