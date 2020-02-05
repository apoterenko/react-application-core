import * as React from 'react';
import * as R from 'ramda';

import { NavigationList } from '../../list';
import { lazyInject } from '../../../di';
import {
  isFn,
  orNull,
} from '../../../util';
import { LayoutContainer } from '../layout.container';
import { IDefaultLayoutContainerProps, IDefaultLayoutContainerState } from './default-layout.interface';
import { Header, SubHeader } from '../../header';
import { NavigationMenuBuilder } from '../../../navigation';
import { FlexLayout } from '../flex';
import { Operation } from '../../../operation';
import {
  IPayloadWrapper,
  StringNumberT,
} from '../../../definitions.interface';
import {
  LAYOUT_XY_UPDATE_ACTION_TYPE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
  LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE,
} from '../layout.interface';
import { Menu } from '../../menu';
import { Link } from '../../link';
import {
  DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY,
  IBaseEvent,
  ILayoutEntity,
  IMenuItemEntity,
  IMenuItemStringValueEntity,
  IMenuProps,
  INavigationItemEntity,
  IOperationEntity,
  IXYEntity,
  LayoutModesEnum,
} from '../../../definition';
import { Overlay } from '../../overlay';
import {
  PerfectScrollPlugin,
  PersistentScrollPlugin,
} from '../../plugin';
import { DefaultLayout } from './default-layout.component';

export class DefaultLayoutContainer extends LayoutContainer<IDefaultLayoutContainerProps, IDefaultLayoutContainerState> {

  public static readonly defaultProps: IDefaultLayoutContainerProps = {
    headerConfiguration: {},
  };

  private readonly userExitActionValue = 'exit';
  private readonly userMenuAnchorRef = React.createRef<HTMLElement>();
  private readonly userMenuRef = React.createRef<Menu>();
  private readonly userProfileActionValue = 'profile';
  private readonly userMenuProps: IMenuProps = {
    ref: this.userMenuRef,
    options: [
      {label: this.settings.messages.settingsMessage, icon: 'settings', value: this.userProfileActionValue},
      {label: this.settings.messages.logOutMessage, icon: 'sign_out_alt', value: this.userExitActionValue}
    ],
    positionConfiguration: DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY,
    anchorElement: this.getMenuAnchorElement.bind(this),
    onSelect: this.onUserMenuSelect.bind(this),
  };

  @lazyInject(NavigationMenuBuilder) private readonly navigationMenuBuilder: NavigationMenuBuilder;

  /**
   * @stable [18.09.2018]
   * @param {IDefaultLayoutContainerProps} props
   */
  constructor(props: IDefaultLayoutContainerProps) {
    super(props);

    this.onHeaderMoreOptionsSelect = this.onHeaderMoreOptionsSelect.bind(this);
    this.onHeaderNavigationActionClick = this.onHeaderNavigationActionClick.bind(this);
    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
    this.onNavigationListGroupClick = this.onNavigationListGroupClick.bind(this);
    this.onNavigationListScroll = this.onNavigationListScroll.bind(this);
    this.onDrawerHeaderClick = this.onDrawerHeaderClick.bind(this);
    this.onUserMenuActionClick = this.onUserMenuActionClick.bind(this);

    this.state = {notifications: false};
  }

  /**
   * @stable [18.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <DefaultLayout
        {...props}
        header={this.headerElement}
        onLogoMenuActionClick={this.onLogoMenuActionClick}
        onDrawerHeaderClick={this.onDrawerHeaderClick}
        navigationListElement={this.navigationListElement}>
        {this.mainElement}
        {this.snackbarElement}
      </DefaultLayout>
    );
  }

  /**
   * @stable [18.09.2018]
   * @param {IBaseEvent} event
   */
  private onUserMenuActionClick(event: IBaseEvent): void {
    this.userMenuRef.current.show();
  }

  /**
   * @stable [18.09.2018]
   * @param {IMenuItemEntity} menuItem
   */
  private onUserMenuSelect(menuItem: IMenuItemEntity): void {
    switch (menuItem.value) {
      case this.userExitActionValue:
        this.navigate(this.routes.logout);
        break;
      case this.userProfileActionValue:
        this.navigate(this.routes.profile);
        break;
    }
  }

  /**
   * @stable [18.09.2018]
   * @param {IMenuItemStringValueEntity} option
   */
  private onHeaderMoreOptionsSelect(option: IMenuItemStringValueEntity): void {
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
   * @stable [23.12.2019]
   * @param {IXYEntity} xy
   */
  private onNavigationListScroll(xy: IXYEntity): void {
    this.dispatchCustomType<IPayloadWrapper<ILayoutEntity>>(LAYOUT_XY_UPDATE_ACTION_TYPE, {payload: xy});
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} item
   */
  private onNavigationListGroupClick(item: INavigationItemEntity): void {
    const itemValue = item.value;
    if (R.isNil(itemValue)) {
      return;
    }
    const payloadWrapper: IPayloadWrapper<StringNumberT> = {payload: itemValue};
    this.dispatchCustomType(LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [18.09.2018]
   * @returns {INavigationItemEntity[]}
   */
  private get menuItems(): INavigationItemEntity[] {
    return this.navigationMenuBuilder.provide(this.props);
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
               style={{backgroundImage: `url(${user.url || this.settings.emptyPictureUrl})`}}>&nbsp;</div>
        </Link>
        <Link to={this.routes.profile}>
          <div className='rac-user'>{user.name}</div>
        </Link>
        {this.userMenuElement}
      </Header>
    );
  }

  /**
   * @stable [04.12.2019]
   */
  private onDrawerHeaderClick(layoutMode: LayoutModesEnum): void {
    this.dispatchCustomType<IPayloadWrapper<LayoutModesEnum>>(
      LAYOUT_MODE_UPDATE_ACTION_TYPE,
      {payload: layoutMode}
    );
  }

  /**
   * @stable [08.10.2018]
   * @returns {JSX.Element}
   */
  private get mainElement(): JSX.Element {
    const props = this.props;

    return (
      <React.Fragment>
        {props.subHeaderRendered !== false && this.subHeaderElement}
        {this.props.children}
        {this.mainProgressOverlayElement}
        {this.notificationsElement}
      </React.Fragment>
    );
  }

  private get subHeaderElement(): JSX.Element {
    const props = this.props;
    const runtimeTitle = this.menuItems.find((item) => item.active);
    const title = props.title || (runtimeTitle && runtimeTitle.label);

    return (
      <SubHeader
        {...props.headerConfiguration}
        title={title}
        onNavigationActionClick={this.onHeaderNavigationActionClick}
        onMoreOptionsSelect={this.onHeaderMoreOptionsSelect}/>
    );
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
   * @stable [24.01.2020]
   * @returns {JSX.Element}
   */
  private get userMenuElement(): JSX.Element {
    return (
      <React.Fragment>
        {this.uiFactory.makeIcon({
          ref: this.userMenuAnchorRef,
          key: 'user-menu-icon-key',
          type: 'more',
          className: 'rac-user-menu-action',
          onClick: this.onUserMenuActionClick,
        })}
        <Menu {...this.userMenuProps}/>
      </React.Fragment>
    );
  }

  /**
   * @stable [24.01.2020]
   * @returns {HTMLElement}
   */
  private getMenuAnchorElement(): HTMLElement {
    return this.userMenuAnchorRef.current;
  }

  private get navigationListElement(): JSX.Element {
    return (
      <NavigationList
        {...this.props.layout}
        dividerRendered={false}
        items={this.menuItems}
        onScroll={this.onNavigationListScroll}
        onGroupClick={this.onNavigationListGroupClick}
        plugins={[PersistentScrollPlugin, PerfectScrollPlugin]}/>
    );
  }
}
