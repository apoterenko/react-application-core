import * as React from 'react';

import { PersistentDrawer } from '../../drawer';
import { NavigationList } from '../../list';
import { lazyInject } from '../../../di';
import { toClassName, orNull } from '../../../util';
import {
  LAYOUT_FULL_MODE,
  LAYOUT_MINIMAL_MODE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
} from '../layout.interface';
import { LayoutContainer } from '../layout.container';
import { IDefaultLayoutContainerProps } from './default-layout.interface';
import { Header } from '../../header';
import { NavigationMenuBuilder } from '../../../navigation';
import { Main } from '../../main';
import { Profile } from '../../profile';
import { INavigationListItemConfiguration } from '../../../configurations-definitions.interface';
import { IMenuItemEntity } from '../../../entities-definitions.interface';

export class DefaultLayoutContainer extends LayoutContainer<IDefaultLayoutContainerProps> {

  public static defaultProps: IDefaultLayoutContainerProps = {
    headerConfiguration: {},
    user: {
      email: '(no email)',
    },
  };
  private static PROFILE_EXIT_ACTION = 'exit';

  @lazyInject(NavigationMenuBuilder) private navigationMenuBuilder: NavigationMenuBuilder;

  constructor(props: IDefaultLayoutContainerProps) {
    super(props);
    this.onHeaderMoreOptionsSelect = this.onHeaderMoreOptionsSelect.bind(this);
    this.onProfileMenuActionClick = this.onProfileMenuActionClick.bind(this);
    this.onHeaderNavigationActionClick = this.onHeaderNavigationActionClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const menu = this.navigationMenuBuilder.provide()
        .map((item): INavigationListItemConfiguration => ({ ...item, active: props.root.path === item.link }));
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
            <Header {...props.headerConfiguration}
                    title={runtimeTitle && runtimeTitle.label || props.title}
                    className={props.filter && props.filter.active && 'rac-header-search-toolbar-active'}
                    onNavigationActionClick={this.onHeaderNavigationActionClick}
                    onMoreOptionsSelect={this.onHeaderMoreOptionsSelect}>
              {props.headerConfiguration.items}
            </Header>
            <Main>
              {props.children}
            </Main>
            {orNull(props.footer, () => <footer className='rac-footer'>{props.footer}</footer>)}
          </div>
          {this.snackbarTpl}
        </div>
    );
  }

  protected get profileTpl(): JSX.Element {
    const user = this.props.user;

    return orNull(
      this.routes.profile,
      () => (
        <Profile path={this.routes.profile}
                 name={user && user.name}
                 email={user && user.email}
                 menuItems={[{ label: 'Exit', icon: 'exit_to_app', value: DefaultLayoutContainer.PROFILE_EXIT_ACTION }]}
                 onClick={this.onProfileMenuActionClick}/>
      )
    );
  }

  protected get isLayoutFullMode(): boolean {
    return this.props.layout.mode === LAYOUT_FULL_MODE;
  }

  protected onHeaderNavigationActionClick(): void {
    if (this.props.headerConfiguration.onNavigationActionClick) {
      this.props.headerConfiguration.onNavigationActionClick();
    } else {
      this.appStore.dispatch({
        type: LAYOUT_MODE_UPDATE_ACTION_TYPE,
        data: { mode: this.isLayoutFullMode ? LAYOUT_MINIMAL_MODE : LAYOUT_FULL_MODE },
      });
    }
  }

  /**
   * @stable [31.05.2018]
   * @param {IMenuItemEntity} option
   */
  protected onHeaderMoreOptionsSelect(option: IMenuItemEntity): void {
    this.dispatch(option.value as string);
  }

  protected onProfileMenuActionClick(option: any): void {// TODO
    switch (option.value) {
      case DefaultLayoutContainer.PROFILE_EXIT_ACTION:
        this.navigate(this.routes.logout);
        break;
    }
  }
}
