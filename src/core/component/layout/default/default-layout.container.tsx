import * as React from 'react';

import { Link } from '../../../component/link';
import { PersistentDrawer } from '../../../component/drawer';
import { INavigationListItemOptions, NavigationList } from '../../../component/list';
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
    const menu = this.navigationMenuBuilder.provide()
        .map((item): INavigationListItemOptions => ({ ...item, active: props.root.path === item.link }));
    const runtimeTitle = menu.find((item) => item.active);
    const title = props.title || (runtimeTitle ? runtimeTitle.label : props.title);

    return (
        <div className={toClassName(
            'app-default-layout',
            'app-row-flex',
            'app-full-layout',
            this.props.className
        )}>
          <PersistentDrawer opened={this.isLayoutFullMode}>
            <div className='mdc-persistent-drawer__toolbar-spacer'>
              {this.profileTpl}
            </div>
            <NavigationList items={menu}/>
          </PersistentDrawer>
          <div className='app-content app-column-flex app-full-layout'>
            <header className='rac-header app-header mdc-toolbar'>
              <div className='mdc-toolbar__row'>
                <section className={toClassName(
                                        'mdc-toolbar__section',
                                        'mdc-toolbar__section--align-start',
                                        props.headerItems && 'app-initial-layout'
                                    )}>
                  {
                    this.uiFactory.makeIcon({
                      type: props.navigationControlType,
                      className: 'mdc-toolbar__menu-icon',
                      onClick: this.onClick,
                    })
                  }
                  <span className='mdc-toolbar__title'>
                    {title}
                  </span>
                </section>
                {
                  orNull(props.headerItems, (
                      <section className='mdc-toolbar__section'>
                        {props.headerItems}
                      </section>
                  ))
                }
              </div>
            </header>
            <div className='app-content-body app-column-flex app-full-layout'>
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
                {this.uiFactory.makeIcon('business')}
              </div>
              <div className='app-profile-icon app-profile-avatar'>
                {this.uiFactory.makeIcon('person')}
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
