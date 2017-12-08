import * as React from 'react';

import { Link } from '../../../component/link';
import { PersistentDrawer } from '../../../component/drawer';
import { INavigationListItemOptions, NavigationList } from '../../../component/list';
import { lazyInject, DI_TYPES } from '../../../di';
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
                            'rac-default-layout',
                            'rac-flex',
                            'rac-flex-row',
                            'rac-flex-full',
                            props.footer && 'rac-default-with-footer-layout',
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
            <header className={toClassName('rac-header', this.uiFactory.toolbar)}>
              <div className={this.uiFactory.toolbarRow}>
                <section className={toClassName(
                                        'mdc-toolbar__section',
                                        'mdc-toolbar__section--align-start',
                                        props.headerItems && 'app-initial-layout'
                                    )}>
                  {
                    this.uiFactory.makeIcon({
                      type: props.navigationControlType,
                      className: this.uiFactory.toolbarMenuIcon,
                      onClick: this.onClick,
                    })
                  }
                  <span className={this.uiFactory.toolbarTitle}>{title}</span>
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
            <main className='rac-main'>
              <div className='rac-main-body rac-flex rac-flex-column'>
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
