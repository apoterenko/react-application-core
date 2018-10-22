import * as React from 'react';
import * as R from 'ramda';

import { Drawer } from '../../drawer';
import { NavigationList } from '../../list';
import { lazyInject } from '../../../di';
import { toClassName, orNull, isFn, cancelEvent } from '../../../util';
import { LayoutContainer } from '../layout.container';
import { IDefaultLayoutContainerProps } from './default-layout.interface';
import { Header, SubHeader } from '../../header';
import { NavigationMenuBuilder } from '../../../navigation';
import { Main } from '../../main';
import { Profile } from '../../profile';
import { INavigationListItemConfiguration } from '../../../configurations-definitions.interface';
import { IOperationEntity, LayoutModeEnum } from '../../../entities-definitions.interface';
import { ILayoutEntity, IStringMenuActionEntity, IXYEntity, IMenuItemEntity } from '../../../entities-definitions.interface';
import { FlexLayout } from '../../layout';
import { Operation } from '../../../operation';
import { IPayloadWrapper, IBasicEvent, StringNumberT } from '../../../definitions.interface';
import { Message } from '../../message';
import {
  CenterLayout,
  LAYOUT_XY_UPDATE_ACTION_TYPE,
  LAYOUT_MODE_UPDATE_ACTION_TYPE,
  LAYOUT_EXPANDED_GROUPS_UPDATE_ACTION_TYPE,
} from '../../layout';
import { ENV } from '../../../env';
import { Menu } from '../../menu';
import { APPLICATION_SECTIONS } from '../../application';
import { toAllDependentRoutePaths } from '../../connector';
import { Link } from '../../link';

export class DefaultLayoutContainer extends LayoutContainer<IDefaultLayoutContainerProps> {

  public static defaultProps: IDefaultLayoutContainerProps = {
    headerConfiguration: {},
    footerRendered: true,
    user: {
      email: '(no email)',
    },
  };
  private readonly PROFILE_EXIT_ACTION = 'exit';
  private readonly USER_MENU_OPTIONS = [
    {label: 'Exit', icon: 'exit_to_app', value: this.PROFILE_EXIT_ACTION}
  ];
  private userMenuRef = React.createRef<Menu>();

  @lazyInject(NavigationMenuBuilder) private navigationMenuBuilder: NavigationMenuBuilder;

  /**
   * @stable [18.09.2018]
   * @param {IDefaultLayoutContainerProps} props
   */
  constructor(props: IDefaultLayoutContainerProps) {
    super(props);
    this.onHeaderMoreOptionsSelect = this.onHeaderMoreOptionsSelect.bind(this);
    this.onHeaderNavigationActionClick = this.onHeaderNavigationActionClick.bind(this);
    this.onUserMenuActionClick = this.onUserMenuActionClick.bind(this);
    this.onUserMenuSelect = this.onUserMenuSelect.bind(this);
    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
    this.onProfileMenuClick = this.onProfileMenuClick.bind(this);
    this.onNavigationListItemClick = this.onNavigationListItemClick.bind(this);
    this.onNavigationListGroupClick = this.onNavigationListGroupClick.bind(this);
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
    }
  }

  /**
   * @stable [18.09.2018]
   * @param {IStringMenuActionEntity} option
   */
  private onHeaderMoreOptionsSelect(option: IStringMenuActionEntity): void {
    const params: IPayloadWrapper<IOperationEntity> = {payload: Operation.create(option.value)};
    this.dispatch(option.value, params);
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
   * @stable [23.09.2018]
   * @param {IXYEntity} xy
   */
  private onNavigationListItemClick(xy: IXYEntity): void {
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
                        onClick={this.onNavigationListItemClick}
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

    return orNull<JSX.Element>(
      props.footerRendered && !R.isNil(footer) && !R.isNil(footer.props.children),
      () => <footer className='rac-footer'>{footer}</footer>
    );
  }

  /**
   * @stable [18.09.2018]
   * @returns {JSX.Element}
   */
  private get mainProgressOverlayElement(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.progress,
      () => (
        <CenterLayout className='rac-overlay'>
          <Message progress={true}/>
        </CenterLayout>
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
