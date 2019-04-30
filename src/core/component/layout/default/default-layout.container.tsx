import * as React from 'react';
import * as R from 'ramda';

import { Drawer } from '../../drawer';
import { NavigationList } from '../../list';
import { lazyInject } from '../../../di';
import { toClassName, orNull, isFn, cancelEvent } from '../../../util';
import { LayoutContainer } from '../layout.container';
import { IDefaultLayoutContainerProps, IDefaultLayoutContainerState } from './default-layout.interface';
import { Header, SubHeader } from '../../header';
import { NavigationMenuBuilder } from '../../../navigation';
import { Main } from '../../main';
import { Profile } from '../../profile';
import { INavigationListItemConfiguration } from '../../../configurations-definitions.interface';
import { LayoutModeEnum } from '../../../entities-definitions.interface';
import { IOperationEntity } from '../../../definition';
import { ILayoutEntity, IStringMenuActionEntity, IXYEntity, IMenuItemEntity } from '../../../entities-definitions.interface';
import { FlexLayout } from '../../layout';
import { Operation } from '../../../operation';
import { IPayloadWrapper, StringNumberT } from '../../../definitions.interface';
import {
  LAYOUT_XY_UPDATE_ACTION_TYPE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
  LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE,
} from '../../layout';
import { ENV } from '../../../env';
import { Menu } from '../../menu';
import { APPLICATION_SECTIONS } from '../../application';
import { toAllDependentRoutePaths } from '../../connector';
import { Link } from '../../link';
import { IBasicEvent } from '../../../react-definitions.interface';
import { Button } from '../../button';
import { Overlay } from '../../overlay';

export class DefaultLayoutContainer extends LayoutContainer<IDefaultLayoutContainerProps, IDefaultLayoutContainerState> {

  public static defaultProps: IDefaultLayoutContainerProps = {
    headerConfiguration: {},
    footerRendered: true,
  };
  private readonly PROFILE_EXIT_ACTION = 'exit';
  private readonly PROFILE_PROFILE_ACTION = 'profile';
  private readonly USER_MENU_OPTIONS = [
    {label: this.settings.messages.settingsMessage, icon: 'settings', value: this.PROFILE_PROFILE_ACTION},
    {label: this.settings.messages.logOutMessage, icon: 'sign_out_alt', value: this.PROFILE_EXIT_ACTION}
  ];
  private userMenuRef = React.createRef<Menu>();

  @lazyInject(NavigationMenuBuilder) private navigationMenuBuilder: NavigationMenuBuilder;

  /**
   * @stable [18.09.2018]
   * @param {IDefaultLayoutContainerProps} props
   */
  constructor(props: IDefaultLayoutContainerProps) {
    super(props);
    this.state = {notifications: false};
    this.onHeaderMoreOptionsSelect = this.onHeaderMoreOptionsSelect.bind(this);
    this.onHeaderNavigationActionClick = this.onHeaderNavigationActionClick.bind(this);
    this.onUserMenuActionClick = this.onUserMenuActionClick.bind(this);
    this.onUserMenuSelect = this.onUserMenuSelect.bind(this);
    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
    this.onProfileMenuClick = this.onProfileMenuClick.bind(this);
    this.onNavigationListScroll = this.onNavigationListScroll.bind(this);
    this.onNavigationListGroupClick = this.onNavigationListGroupClick.bind(this);
    this.onNotificationsClick = this.onNotificationsClick.bind(this);
  }

  /**
   * @stable [18.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout row={true}
                  className={toClassName('rac-default-layout', props.className)}>
        {this.drawerElement}
        <FlexLayout>
          {this.headerElement}
          {this.mainElement}
          {this.footerElement}
        </FlexLayout>
        {this.snackbarElement}
      </FlexLayout>
    );
  }

  /**
   * @stable [18.09.2018]
   * @param {IBasicEvent} event
   */
  private onUserMenuActionClick(event: IBasicEvent): void {
    cancelEvent(event);
    this.userMenuRef.current.show();
  }

  /**
   * @stable [18.09.2018]
   * @param {IMenuItemEntity} menuItem
   */
  private onUserMenuSelect(menuItem: IMenuItemEntity): void {
    switch (menuItem.value) {
      case this.PROFILE_EXIT_ACTION:
        this.navigate(this.routes.logout);
        break;
      case this.PROFILE_PROFILE_ACTION:
        this.navigate(this.routes.profile);
        break;
    }
  }

  /**
   * @stable [18.09.2018]
   * @param {IStringMenuActionEntity} option
   */
  private onHeaderMoreOptionsSelect(option: IStringMenuActionEntity): void {
    const params: IPayloadWrapper<IOperationEntity> = {payload: Operation.create(option.value)};
    this.dispatchFrameworkAction(option.value, params);
  }

  /**
   * @stable [17.10.2018]
   */
  private onLogoMenuActionClick(): void {
    this.navigate(this.routes.home);
  }

  /**
   * @stable [18.09.2018]
   */
  private onHeaderNavigationActionClick(): void {
    const props = this.props;
    const headerConfiguration = props.headerConfiguration;

    if (isFn(headerConfiguration.onNavigationActionClick)) {
      headerConfiguration.onNavigationActionClick();
    }
  }

  /**
   * @stable [01.12.2018]
   * @param {IXYEntity} xy
   */
  private onNavigationListScroll(xy: IXYEntity): void {
    const payloadWrapper: IPayloadWrapper<ILayoutEntity> = {payload: xy};
    this.dispatchCustomType(LAYOUT_XY_UPDATE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationListItemConfiguration} item
   */
  private onNavigationListGroupClick(item: INavigationListItemConfiguration): void {
    const itemValue = item.value;
    if (R.isNil(itemValue)) {
      return;
    }
    const payloadWrapper: IPayloadWrapper<StringNumberT> = {payload: itemValue};
    this.dispatchCustomType(LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [23.09.2018]
   * @returns {boolean}
   */
  private get layoutFullModeEnabled(): boolean {
    return this.layoutMode === LayoutModeEnum.FULL;
  }

  /**
   * @stable [23.09.2018]
   * @returns {LayoutModeEnum}
   */
  private get layoutMode(): LayoutModeEnum {
    return this.props.layout.mode;
  }

  /**
   * @stable [18.09.2018]
   * @returns {INavigationListItemConfiguration[]}
   */
  private get menuItems(): INavigationListItemConfiguration[] {
    const props = this.props;
    const routePaths = toAllDependentRoutePaths(props.stack, APPLICATION_SECTIONS, props.sectionName);

    return this.navigationMenuBuilder.provide()
      .map((item): INavigationListItemConfiguration => ({...item, active: routePaths.has(item.link)}));
  }

  /**
   * @stable [18.09.2018]
   * @returns {JSX.Element}
   */
  private get headerElement(): JSX.Element {
    const props = this.props;
    const user = props.user;

    return (
      <Header>
        <Link to={this.routes.profile}>
          <div className='rac-user-photo'
               style={{backgroundImage: `url(${user.photoUrl || user.url || this.settings.emptyPictureUrl})`}}>&nbsp;</div>
        </Link>
        <Link to={this.routes.profile}>
          <div className='rac-user'>{user.name}</div>
        </Link>
        {this.userMenuElement}
      </Header>
    );
  }

  /**
   * @stable [11.02.2019]
   */
  private onNotificationsClick(): void {
    this.setState({notifications: !this.state.notifications});
  }

  /**
   * @stable [18.09.2018]
   * @returns {JSX.Element}
   */
  private get drawerElement(): JSX.Element {
    const props = this.props;
    const layoutFullModeEnabled = this.layoutFullModeEnabled;
    return (
      <Drawer mini={!layoutFullModeEnabled}>
        <FlexLayout row={true}
                    alignItemsCenter={true}
                    className='rac-drawer-toolbar-spacer'
                    onClick={this.onLogoMenuActionClick}>
          <Profile avatarRendered={layoutFullModeEnabled}
                   appVersion={
                     (ENV.appVersion || '').startsWith('0.') ? `${ENV.appVersion}-beta` : ENV.appVersion
                   }
                   onClick={this.onProfileMenuClick}/>
        </FlexLayout>
        <NavigationList {...props.layout}
                        items={this.menuItems}
                        onScroll={this.onNavigationListScroll}
                        onGroupClick={this.onNavigationListGroupClick}/>
      </Drawer>
    );
  }

  /**
   * @stable [17.10.2018]
   * @param {IBasicEvent} event
   */
  private onProfileMenuClick(event: IBasicEvent): void {
    cancelEvent(event);

    const payloadWrapper: IPayloadWrapper<LayoutModeEnum> = {payload: this.layoutMode};
    this.dispatchCustomType(LAYOUT_MODE_UPDATE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [08.10.2018]
   * @returns {JSX.Element}
   */
  private get mainElement(): JSX.Element {
    const props = this.props;
    const runtimeTitle = this.menuItems.find((item) => item.active);
    const title = props.title || (runtimeTitle && runtimeTitle.label);

    return (
      <Main>
        <SubHeader {...props.headerConfiguration}
                   title={title}
                   onNavigationActionClick={this.onHeaderNavigationActionClick}
                   onMoreOptionsSelect={this.onHeaderMoreOptionsSelect}/>
        {this.props.children}
        {this.mainProgressOverlayElement}
        {this.notificationsElement}
      </Main>
    );
  }

  /**
   * @stable [08.10.2018]
   * @returns {JSX.Element}
   */
  private get footerElement(): JSX.Element {
    const props = this.props;
    const footer = props.footer;

    return orNull<JSX.Element>(props.footerRendered, footer);
  }

  /**
   * @stable [18.03.2019]
   * @returns {JSX.Element}
   */
  private get mainProgressOverlayElement(): JSX.Element {
    return orNull<JSX.Element>(this.props.progress, () => <Overlay progress={true}/>);
  }

  /**
   * @stable [11.02.2019]
   * @returns {JSX.Element}
   */
  private get notificationsElement(): JSX.Element {
    return orNull(
      this.state.notifications,
      () => (
        <FlexLayout className='rac-notifications'>
          3 new notifications
        </FlexLayout>
      )
    );
  }

  /**
   * @stable [18.09.2018]
   * @returns {JSX.Element}
   */
  private get userMenuElement(): JSX.Element {
    return (
      <div>
        {this.uiFactory.makeIcon({
          type: 'more_hor',
          className: 'rac-user-menu',
          onClick: this.onUserMenuActionClick,
        })}
        <Menu ref={this.userMenuRef}
              options={this.USER_MENU_OPTIONS}
              onSelect={this.onUserMenuSelect}/>
      </div>
    );
  }
}
