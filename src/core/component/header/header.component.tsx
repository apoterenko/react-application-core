import * as React from 'react';

import {
  calc,
  isBackActionRendered,
  joinClassName,
} from '../../util';
import { BaseComponent } from '../base/base.component';
import { Button } from '../button';
import {
  DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY,
  HeaderUserMenuActionsEnum,
  IButtonProps,
  IHeaderProps,
  IMenuItemEntity,
  IMenuProps,
} from '../../definition';
import { Menu } from '../menu';
import { Link } from '../link';

export class Header extends BaseComponent<IHeaderProps> {

  private readonly defaultMenuProps: IMenuProps = {
    options: [
      {label: this.settings.messages.SETTINGS, icon: 'settings', value: HeaderUserMenuActionsEnum.PROFILE},
      {label: this.settings.messages.LOG_OUT, icon: 'sign_out_alt', value: HeaderUserMenuActionsEnum.EXIT}
    ],
  };

  private readonly defaultMenuActionProps: IButtonProps = {
    icon: 'more',
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
    const props = this.props;
    const {user} = props;
    const headerContentElement = this.headerContentElement;

    return (
      <div className={joinClassName('rac-header', calc(props.className))}>
        {
          headerContentElement && (
            <div className='rac-header__content'>
              {headerContentElement}
            </div>
          )
        }
        <div className='rac-header__actions'>
          {props.children}
          <Link
            to={this.routes.profile}
            className='rac-header__user-avatar'
            style={{backgroundImage: this.domAccessor.asImageUrl(user.url || this.settings.urls.emptyAvatar)}}/>
          <Link
            to={this.routes.profile}
            className='rac-header__user-info'>
            {user.name}
          </Link>
          {this.menuActionElement}
        </div>
      </div>
    );
  }

  /**
   * @stable [12.02.2020]
   * @returns {React.ReactNode}
   */
  private get headerContentElement(): React.ReactNode {
    const {
      backActionConfiguration = {},
      content,
    } = this.props;

    if (this.isBackActionRendered) {
      return (
        <React.Fragment>
          {
            <Button
              icon='back2'
              {...backActionConfiguration}
              className={joinClassName(
                'rac-header__back-action',
                calc(backActionConfiguration.className),
              )}/>
          }
          {content}
        </React.Fragment>
      );
    }
    return content;
  }

  /**
   * @stable [06.02.2020]
   * @returns {JSX.Element}
   */
  private get menuActionElement(): JSX.Element {
    const props = this.props;
    const {
      menuActionConfiguration = {},
      menuConfiguration,
    } = props;

    return (
      <React.Fragment>
        <Button
          ref={this.menuAnchorRef}
          {...this.defaultMenuActionProps}
          {...menuActionConfiguration}
          className={joinClassName('rac-header__menu-action', calc(menuActionConfiguration.className))}
          onClick={this.onMenuActionClick}
        />
        <Menu
          positionConfiguration={DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY}
          {...this.defaultMenuProps}
          {...menuConfiguration}
          ref={this.menuRef}
          anchorElement={this.getMenuAnchorElement.bind(this)}
          onSelect={this.onMenuItemSelect}/>
      </React.Fragment>
    );
  }

  /**
   * @stable [06.02.2020]
   * @param {IMenuItemEntity} menuItem
   */
  private onMenuItemSelect(menuItem: IMenuItemEntity): void {
    const {onSelect} = this.props;
    onSelect(menuItem);
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
   * @stable [12.02.2020]
   * @returns {boolean}
   */
  private get isBackActionRendered(): boolean {
    return isBackActionRendered(this.props);
  }
}
