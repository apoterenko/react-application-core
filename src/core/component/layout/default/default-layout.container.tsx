import * as React from 'react';
import * as R from 'ramda';

import { NavigationList } from '../../list';
import { lazyInject } from '../../../di';
import {
  isFn,
  orNull,
} from '../../../util';
import { BasicContainer } from '../../base/basic.container';
import { IDefaultLayoutContainerProps, IDefaultLayoutContainerState } from './default-layout.interface';
import { SubHeader } from '../../header';
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
import {
  HeaderUserMenuActionsEnum,
  ILayoutEntity,
  IMenuItemEntity,
  IMenuItemStringValueEntity,
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
import { NotificationContainer } from '../../notification';

export class DefaultLayoutContainer extends BasicContainer<IDefaultLayoutContainerProps, IDefaultLayoutContainerState> {

  public static readonly defaultProps: IDefaultLayoutContainerProps = {
    subHeaderConfiguration: {},
  };

  @lazyInject(NavigationMenuBuilder) private readonly navigationMenuBuilder: NavigationMenuBuilder;

  /**
   * @stable [18.09.2018]
   * @param {IDefaultLayoutContainerProps} props
   */
  constructor(props: IDefaultLayoutContainerProps) {
    super(props);

    this.onDrawerHeaderClick = this.onDrawerHeaderClick.bind(this);
    this.onHeaderMenuSelectItem = this.onHeaderMenuSelectItem.bind(this);
    this.onHeaderMoreOptionsSelect = this.onHeaderMoreOptionsSelect.bind(this);
    this.onHeaderNavigationActionClick = this.onHeaderNavigationActionClick.bind(this);
    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
    this.onNavigationListGroupClick = this.onNavigationListGroupClick.bind(this);
    this.onNavigationListScroll = this.onNavigationListScroll.bind(this);

    this.state = {notifications: false};
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
      <NotificationContainer {...props}>
        <DefaultLayout
          {...props}
          headerConfiguration={{
            onSelect: this.onHeaderMenuSelectItem,
            backActionConfiguration: {onClick: this.routerStoreProxy.navigateBack},
            ...props.headerConfiguration,
          }}
          onLogoMenuActionClick={this.onLogoMenuActionClick}
          onDrawerHeaderClick={this.onDrawerHeaderClick}
          navigationListElement={this.navigationListElement}>
          {this.mainElement}
        </DefaultLayout>
      </NotificationContainer>
    );
  }

  /**
   * @stable [06.02.2020]
   * @param {IMenuItemEntity} item
   */
  private onHeaderMenuSelectItem(item: IMenuItemEntity): void {
    switch (item.value) {
      case HeaderUserMenuActionsEnum.EXIT:
        this.routerStoreProxy.navigate(this.routes.logout);
        break;
      case HeaderUserMenuActionsEnum.PROFILE:
        this.routerStoreProxy.navigate(this.routes.profile);
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
    const headerConfiguration = props.subHeaderConfiguration;

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
    const activeItem = this.menuItems.find((item) => item.active);
    const title = props.title || (activeItem && activeItem.label);

    return (
      <SubHeader
        {...props.subHeaderConfiguration}
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
