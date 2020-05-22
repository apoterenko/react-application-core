import * as React from 'react';
import * as R from 'ramda';

import { NavigationList } from '../../navigation-list';
import { lazyInject } from '../../../di';
import {
  ifNotEmptyThanValue,
} from '../../../util';
import { GenericContainer } from '../../base/generic.container';
import {
  IDefaultLayoutContainerProps,
  IDefaultLayoutContainerState,
} from './default-layout.interface';
import { NavigationMenuBuilder } from '../../../navigation';
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
  IFluxXYEntity,
  IMenuItemEntity,
  INavigationListItemEntity,
  IReduxXYEntity,
  LayoutModesEnum,
} from '../../../definition';
import {
  PerfectScrollPlugin,
  PersistentScrollPlugin,
} from '../../plugin';
import { DefaultLayout } from './default-layout.component';
import { NotificationContainer } from '../../notification';

export class DefaultLayoutContainer extends GenericContainer<IDefaultLayoutContainerProps, IDefaultLayoutContainerState> {

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
    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
    this.onNavigationListClick = this.onNavigationListClick.bind(this);
    this.onNavigationListGroupClick = this.onNavigationListGroupClick.bind(this);
    this.onNavigationListScroll = this.onNavigationListScroll.bind(this);

    this.state = {notifications: false};
  }

  public render(): JSX.Element {
    const props = this.props;
    const {
      headerConfiguration = {},
      subHeaderConfiguration = {},
    } = props;
    const activeItem = this.menuItems.find((item) => item.active);
    const title = props.title || (activeItem && activeItem.label);

    return (
      <NotificationContainer {...props}>
        <DefaultLayout
          {...props}
          headerConfiguration={{
            onSelect: this.onHeaderMenuSelectItem,
            navigationActionConfiguration: {
              onClick: this.routerStoreProxy.navigateBack,
              ...headerConfiguration.navigationActionConfiguration,
            },
            ...headerConfiguration,
          }}
          subHeaderConfiguration={{
            title,
            navigationActionConfiguration: {
              onClick: this.routerStoreProxy.navigateBack,
              ...subHeaderConfiguration.navigationActionConfiguration,
            },
            ...subHeaderConfiguration,
          }}
          onLogoMenuActionClick={this.onLogoMenuActionClick}
          onDrawerHeaderClick={this.onDrawerHeaderClick}
          navigationListElement={this.navigationListElement}
        >
          {this.props.children}
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
        this.routerStoreProxy.navigate(this.settings.routes.logout);
        break;
      case HeaderUserMenuActionsEnum.PROFILE:
        this.routerStoreProxy.navigate(this.settings.routes.profile);
        break;
    }
  }

  /**
   * @stable [17.10.2018]
   */
  private onLogoMenuActionClick(): void {
    this.routerStoreProxy.navigate(this.settings.routes.home);
  }

  /**
   * @stable [23.12.2019]
   * @param {IReduxXYEntity} xy
   */
  private onNavigationListScroll(xy: IReduxXYEntity): void {
    this.dispatchActionByType<IFluxXYEntity>(LAYOUT_XY_UPDATE_ACTION_TYPE, {payload: xy});
  }

  /**
   * @stable [18.09.2018]
   * @returns {INavigationListItemEntity[]}
   */
  private get menuItems(): INavigationListItemEntity[] {
    return this.navigationMenuBuilder.provide(this.props);
  }

  /**
   * @stable [04.12.2019]
   */
  private onDrawerHeaderClick(layoutMode: LayoutModesEnum): void {
    this.dispatchActionByType<IPayloadWrapper<LayoutModesEnum>>(
      LAYOUT_MODE_UPDATE_ACTION_TYPE,
      {payload: layoutMode}
    );
  }

  private get navigationListElement(): JSX.Element {
    return (
      <NavigationList
        {...this.props.layout}
        items={this.menuItems}
        onScroll={this.onNavigationListScroll}
        onClick={this.onNavigationListClick}
        onGroupClick={this.onNavigationListGroupClick}
        plugins={[PersistentScrollPlugin, PerfectScrollPlugin]}/>
    );
  }

  /**
   * @stable [24.03.2020]
   * @param {INavigationListItemEntity} item
   */
  private onNavigationListClick(item: INavigationListItemEntity): void {
    ifNotEmptyThanValue(item.link, (link) => this.routerStoreProxy.navigate(link));
  }

  private onNavigationListGroupClick(item: INavigationListItemEntity): void {
    const itemValue = item.value;
    if (R.isNil(itemValue)) {
      return;
    }
    const payloadWrapper: IPayloadWrapper<StringNumberT> = {payload: itemValue};
    this.dispatchActionByType(LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE, payloadWrapper);
  }
}
