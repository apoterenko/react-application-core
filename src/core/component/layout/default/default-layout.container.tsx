import * as React from 'react';

import { Link } from '../../../component/link';
import { PersistentDrawer } from '../../../component/drawer';
import { NavigationList } from '../../../component/list';
import { lazyInject, DI_TYPES } from '../../../di';
import { IRoutes } from '../../../router';
import { toClassName, orNull } from '../../../util';
import {
  LAYOUT_FULL_MODE,
  LAYOUT_MINIMAL_MODE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
} from '../layout.interface';
import { LayoutContainer } from '../layout.container';
import { IDefaultLayoutContainerInternalProps } from './default-layout.interface';
import { NavigationMenuBuilder } from '../../../navigation';

export class DefaultLayoutContainer extends LayoutContainer<IDefaultLayoutContainerInternalProps> {

  public static defaultProps: IDefaultLayoutContainerInternalProps = {
    navigationControlType: 'menu',
    user: {
      email: '(no email)',
    },
  };

  @lazyInject(DI_TYPES.Routes) private routes: IRoutes;
  @lazyInject(NavigationMenuBuilder) private navigationMenuBuilder: NavigationMenuBuilder;

  constructor(props: IDefaultLayoutContainerInternalProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const menu = this.navigationMenuBuilder.provide().map((item) => ({
      ...item,
      text: this.t(item.text),
      activated: props.root.path === item.link,
    }));
    const runtimeTitle = menu.find((item) => item.activated);
    const title = props.title || (runtimeTitle ? runtimeTitle.text : props.title);

    return (
        <div className={toClassName(
            'app-default-layout',
            'app-row-flex',
            'app-full-flex',
            this.props.className
        )}>
          <PersistentDrawer opened={this.isLayoutFullMode}>
            <div className='mdc-persistent-drawer__toolbar-spacer'>
              {this.profileTpl}
            </div>
            <NavigationList items={menu}/>
          </PersistentDrawer>
          <div className='app-content app-column-flex app-full-flex'>
            <header className='mdc-toolbar'>
              <div className='mdc-toolbar__row'>
                <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                  <button className='material-icons mdc-toolbar__menu-icon'
                          onClick={this.onClick}>
                    {props.navigationControlType}
                  </button>
                  <span className='mdc-toolbar__title'>
                    {title}
                  </span>
                </section>
                {
                  orNull(props.navigationControls, (
                      <section className='mdc-toolbar__section'>
                        {props.navigationControls}
                      </section>
                  ))
                }
              </div>
            </header>
            <div className='app-content-body app-column-flex app-full-flex'>
              {props.children}
            </div>
          </div>
          {this.snackbarTpl}
        </div>
    );
  }

  protected get profileTpl(): JSX.Element {
    const profileRoutePath = this.routes.profile;
    const user = this.props.user;
    const email = user.email;

    return orNull(
        profileRoutePath,
        (
            <Link to={profileRoutePath}
                  className='app-profile'>
              <div className='app-profile-icon app-profile-logo'>
                <i className='material-icons'>business</i>
              </div>
              <div className='app-profile-icon app-profile-avatar'>
                <i className='material-icons'>person</i>
              </div>
              <div className='app-profile-info app-profile-name' title={user.name}>{user.name}</div>
              <div className='app-profile-info app-profile-email' title={email}>{email}</div>
            </Link>
        )
    );
  }

  protected onClick(): void {
    if (this.props.navigationControlHandler) {
      this.props.navigationControlHandler();
    } else {
      this.appStore.dispatch({
        type: LAYOUT_MODE_UPDATE_ACTION_TYPE,
        data: { mode: this.isLayoutFullMode ? LAYOUT_MINIMAL_MODE : LAYOUT_FULL_MODE },
      });
    }
  }

  protected get isLayoutFullMode(): boolean {
    return this.props.layout.mode === LAYOUT_FULL_MODE;
  }
}
