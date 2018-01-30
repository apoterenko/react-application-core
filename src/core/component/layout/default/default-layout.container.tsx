import * as React from 'react';

import { Link } from '../../../component/link';
import { PersistentDrawer } from '../../../component/drawer';
import { INavigationListItemOptions, NavigationList } from '../../../component/list';
import { lazyInject } from '../../../di';
import { toClassName, orNull } from '../../../util';
import {
  LAYOUT_FULL_MODE,
  LAYOUT_MINIMAL_MODE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
} from '../layout.interface';
import { IMenuAction, MenuActionT } from '../../../component/menu';
import { LayoutContainer } from '../layout.container';
import { IDefaultLayoutContainerInternalProps } from './default-layout.interface';
import { Header } from '../../../component/header';
import { NavigationMenuBuilder } from '../../../navigation';

export class DefaultLayoutContainer extends LayoutContainer<IDefaultLayoutContainerInternalProps> {

  public static defaultProps: IDefaultLayoutContainerInternalProps = {
    headerOptions: {},
    user: {
      email: '(no email)',
    },
  };

  @lazyInject(NavigationMenuBuilder) private navigationMenuBuilder: NavigationMenuBuilder;

  constructor(props: IDefaultLayoutContainerInternalProps) {
    super(props);
    this.onHeaderMenuActionClick = this.onHeaderMenuActionClick.bind(this);
    this.onHeaderNavigationActionClick = this.onHeaderNavigationActionClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const headerOptions = props.headerOptions;
    const menu = this.navigationMenuBuilder.provide()
        .map((item): INavigationListItemOptions => ({ ...item, active: props.root.path === item.link }));
    const runtimeTitle = menu.find((item) => item.active);

    return (
        <div className={toClassName(
                            'rac-default-layout',
                            'rac-flex',
                            'rac-flex-row',
                            'rac-flex-full',
                            this.props.className
                        )}>
          <PersistentDrawer opened={this.isLayoutFullMode}>
            <div className={toClassName(
                                'rac-persistent-drawer-toolbar-spacer',
                                this.uiFactory.persistentDrawerToolbarSpacer
                            )}>
              {this.profileTpl}
            </div>
            <NavigationList items={menu}/>
          </PersistentDrawer>
          <div className='rac-flex rac-flex-column rac-flex-full'>
            <Header {...props.headerOptions}
                    title={runtimeTitle && runtimeTitle.label || props.title}
                    className={props.filter && props.filter.active && 'rac-header-search-toolbar-active'}
                    navigationActionHandler={this.onHeaderNavigationActionClick}
                    menuActionHandler={this.onHeaderMenuActionClick}>
              {headerOptions.items}
            </Header>
            <main className='rac-main rac-flex-full'>
              <div className={toClassName(
                                  'rac-main-body',
                                  'rac-flex',
                                  'rac-flex-column',
                                  this.props.bodyClassName
                              )}>
                {props.children}
              </div>
            </main>
            {orNull(props.footer, <footer className='rac-footer'>{props.footer}</footer>)}
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
        () => (
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

  protected get isLayoutFullMode(): boolean {
    return this.props.layout.mode === LAYOUT_FULL_MODE;
  }

  protected onHeaderNavigationActionClick(): void {
    if (this.props.headerOptions.navigationActionHandler) {
      this.props.headerOptions.navigationActionHandler();
    } else {
      this.appStore.dispatch({
        type: LAYOUT_MODE_UPDATE_ACTION_TYPE,
        data: { mode: this.isLayoutFullMode ? LAYOUT_MINIMAL_MODE : LAYOUT_FULL_MODE },
      });
    }
  }

  protected onHeaderMenuActionClick(option: MenuActionT): void {
    this.dispatch(option.value);
  }
}
