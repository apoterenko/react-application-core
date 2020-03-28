import * as React from 'react';

import {
  calc,
  ifNotNilThanValue,
  isBackActionRendered,
  joinClassName,
  mergeWithSystemProps,
} from '../../util';
import { BaseComponent } from '../base/base.component';
import { Button } from '../button';
import {
  DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY,
  HeaderClassesEnum,
  HeaderUserMenuActionsEnum,
  IButtonProps,
  IconsEnum,
  IHeaderProps,
  IMenuItemEntity,
  IMenuProps,
} from '../../definition';
import { Menu } from '../menu';
import { Link } from '../link';

export class Header extends BaseComponent<IHeaderProps> {

  private readonly defaultMenuProps: IMenuProps = {
    options: [
      {label: this.settings.messages.SETTINGS, icon: IconsEnum.SETTINGS, value: HeaderUserMenuActionsEnum.PROFILE},
      {label: this.settings.messages.LOG_OUT, icon: IconsEnum.SIGN_OUT_ALT, value: HeaderUserMenuActionsEnum.EXIT}
    ],
  };

  private readonly defaultMenuActionProps: IButtonProps = {
    icon: IconsEnum.MORE,
  };

  private readonly menuAnchorRef = React.createRef<Button>();
  private readonly menuRef = React.createRef<Menu>();

  /**
   * @stable [06.02.2020]
   * @param {IHeaderProps} props
   */
  constructor(props: IHeaderProps) {
    super(props);

    this.getMenuAnchorElement = this.getMenuAnchorElement.bind(this);
    this.onMenuActionClick = this.onMenuActionClick.bind(this);
    this.onMenuItemSelect = this.onMenuItemSelect.bind(this);
  }

  /**
   * @stable [06.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {user} = mergedProps;
    const headerContentElement = this.headerContentElement;

    return (
      <div className={joinClassName(HeaderClassesEnum.HEADER, calc(mergedProps.className))}>
        {
          headerContentElement && (
            <div className={HeaderClassesEnum.HEADER_CONTENT}>
              {headerContentElement}
            </div>
          )
        }
        <div className={HeaderClassesEnum.HEADER_ACTIONS}>
          {this.props.children}
          <Link
            to={this.routes.profile}
            className={HeaderClassesEnum.HEADER_USER_AVATAR}
            style={{backgroundImage: this.domAccessor.asImageUrl(user.url || this.settings.urls.emptyAvatar)}}/>
          <Link
            to={this.routes.profile}
            className={HeaderClassesEnum.HEADER_USER_INFO}>
            {user.name}
          </Link>
          {this.menuActionElement}
        </div>
      </div>
    );
  }

  /**
   * @stable [24.03.2020]
   * @returns {React.ReactNode}
   */
  private get headerContentElement(): React.ReactNode {
    const {backActionConfiguration = {}} = this.mergedProps;
    const contentElement = this.contentElement;

    if (this.isBackActionRendered) {
      return (
        <React.Fragment>
          {
            <Button
              icon={IconsEnum.BACK2}
              {...backActionConfiguration}
              className={joinClassName(
                HeaderClassesEnum.HEADER_BACK_ACTION,
                calc(backActionConfiguration.className),
              )}/>
          }
          {contentElement}
        </React.Fragment>
      );
    }
    return contentElement;
  }

  /**
   * @stable [06.02.2020]
   * @returns {JSX.Element}
   */
  private get menuActionElement(): JSX.Element {
    const {
      menuActionConfiguration = {},
      menuConfiguration,
    } = this.mergedProps;

    return (
      <React.Fragment>
        <Button
          ref={this.menuAnchorRef}
          {...this.defaultMenuActionProps}
          {...menuActionConfiguration}
          className={joinClassName(HeaderClassesEnum.HEADER_MENU_ACTION, calc(menuActionConfiguration.className))}
          onClick={this.onMenuActionClick}
        />
        <Menu
          ref={this.menuRef}
          {...this.defaultMenuProps}
          {...menuConfiguration}
          anchorElement={this.getMenuAnchorElement}
          positionConfiguration={DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY}
          onSelect={this.onMenuItemSelect}/>
      </React.Fragment>
    );
  }

  /**
   * @stable [24.03.2020]
   * @param {IMenuItemEntity} menuItem
   */
  private onMenuItemSelect(menuItem: IMenuItemEntity): void {
    ifNotNilThanValue(this.mergedProps.onSelect, (onSelect) => onSelect(menuItem));
  }

  /**
   * @stable [06.02.2020]
   */
  private onMenuActionClick(): void {
    this.menuRef.current.show();
  }

  /**
   * @stable [06.02.2020]
   * @returns {HTMLElement}
   */
  private getMenuAnchorElement(): HTMLElement {
    return this.menuAnchorRef.current.getSelf();
  }

  /**
   * @stable [24.03.2020]
   * @returns {React.ReactNode}
   */
  private get contentElement(): React.ReactNode {
    return calc(this.mergedProps.content, this);
  }

  /**
   * @stable [12.02.2020]
   * @returns {boolean}
   */
  private get isBackActionRendered(): boolean {
    return isBackActionRendered(this.mergedProps);
  }

  /**
   * @stable [24.03.2020]
   * @returns {IHeaderProps}
   */
  private get mergedProps(): IHeaderProps {
    return mergeWithSystemProps(this.props, this.settings.components.header);
  }
}
