import * as React from 'react';

import { Drawer } from '../../drawer';
import { NavigationList } from '../../list';
import { lazyInject } from '../../../di';
import { toClassName, orNull, isFn, cancelEvent } from '../../../util';
import {
  LAYOUT_FULL_MODE,
  LAYOUT_MINIMAL_MODE,
  LAYOUT_UPDATE_ACTION_TYPE,
} from '../layout.interface';
import { LayoutContainer } from '../layout.container';
import { IDefaultLayoutContainerProps } from './default-layout.interface';
import { Header } from '../../header';
import { NavigationMenuBuilder } from '../../../navigation';
import { Main } from '../../main';
import { Profile } from '../../profile';
import { INavigationListItemConfiguration } from '../../../configurations-definitions.interface';
import { IOperationEntity } from '../../../entities-definitions.interface';
import {
  ILayoutEntity,
  IStringMenuActionEntity,
  IXYEntity,
  IMenuItemEntity,
} from '../../../entities-definitions.interface';
import { FlexLayout } from '../../layout';
import { Operation } from '../../../operation';
import { IPayloadWrapper, IBasicEvent } from '../../../definitions.interface';
import { Message } from '../../message';
import { CenterLayout } from '../../layout';
import { ENV } from '../../../env';
import { Menu } from '../../menu';
import { toAllDependentRoutePaths, APPLICATION_SECTIONS } from '../../application';

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
    this.onChangeNavigationList = this.onChangeNavigationList.bind(this);
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
   * @stable [18.09.2018]
   */
  private onLogoMenuActionClick(): void {
    this.dispatchLayoutChanges({
      payload: {mode: this.isLayoutFullMode ? LAYOUT_MINIMAL_MODE : LAYOUT_FULL_MODE},
    });
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
   * @stable [10.08.2018]
   * @param {IXYEntity} xy
   */
  private onChangeNavigationList(xy: IXYEntity): void {
    this.dispatchLayoutChanges({payload: xy});
  }

  /**
   * @stable [18.09.2018]
   * @param {IPayloadWrapper<ILayoutEntity>} payloadWrapper
   */
  private dispatchLayoutChanges(payloadWrapper: IPayloadWrapper<ILayoutEntity>): void {
    this.dispatchCustomType(LAYOUT_UPDATE_ACTION_TYPE, payloadWrapper);
  }

  /**
   * @stable [11.08.2018]
   * @returns {boolean}
   */
  private get isLayoutFullMode(): boolean {
    return this.props.layout.mode === LAYOUT_FULL_MODE;
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
    const runtimeTitle = this.menuItems.find((item) => item.active);

    return (
      <Header {...props.headerConfiguration}
              title={props.title || (runtimeTitle && runtimeTitle.label)}
              onNavigationActionClick={this.onHeaderNavigationActionClick}
              onMoreOptionsSelect={this.onHeaderMoreOptionsSelect}>
        <div className='rac-user-photo'
             style={{backgroundImage: `url(${user.url || 'media/no_avatar.jpg'})`}}>&nbsp;</div>
        <div className='rac-user'>{user.name}</div>
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
    return (
      <Drawer opened={this.isLayoutFullMode}>
        <FlexLayout row={true}
                    alignItemsCenter={true}
                    className='rac-drawer-toolbar-spacer'>
          <Profile path={this.routes.home}
                   appVersion={ENV.appVersion}
                   onActionClick={this.onLogoMenuActionClick}/>
        </FlexLayout>
        <NavigationList {...props.layout}
                        items={this.menuItems}
                        onChange={this.onChangeNavigationList}/>
      </Drawer>
    );
  }

  /**
   * @stable [18.09.2018]
   * @returns {JSX.Element}
   */
  private get mainElement(): JSX.Element {
    return (
      <Main>
        {this.props.children}
        {this.mainProgressOverlayElement}
      </Main>
    );
  }

  /**
   * @stable [18.09.2018]
   * @returns {JSX.Element}
   */
  private get footerElement(): JSX.Element {
    const props = this.props;
    return orNull<JSX.Element>(props.footerRendered, () => <footer className='rac-footer'>{props.footer}</footer>);
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
