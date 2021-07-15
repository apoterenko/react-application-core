import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  PropsUtils,
  TypeUtils,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import { Button } from '../button';
import {
  DefaultEntities,
  HeaderClassesEnum,
  HeaderUserMenuActionsEnum,
  IconsEnum,
  IHeaderProps,
  IMenuProps,
  IPresetsMenuItemEntity,
} from '../../definition';
import { Menu } from '../menu';
import { Link } from '../link';

/**
 * @component-impl
 * @stable [22.05.2020]
 *
 * Please use the "Mappers.headerProps"
 */
export class Header extends GenericComponent<IHeaderProps> {

  private readonly defaultMenuProps = Object.freeze<IMenuProps>({
    options: [
      {label: this.settings.messages.SETTINGS, icon: IconsEnum.COGS, value: HeaderUserMenuActionsEnum.PROFILE},
      {label: this.settings.messages.LOG_OUT, icon: IconsEnum.SIGN_OUT_ALT, value: HeaderUserMenuActionsEnum.EXIT}
    ],
  });

  private readonly menuAnchorRef = React.createRef<HTMLButtonElement>();
  private readonly menuRef = React.createRef<Menu>();

  /**
   * @stable [09.10.2020]
   * @param originalProps
   */
  constructor(originalProps: IHeaderProps) {
    super(originalProps);

    this.getMenuAnchorElement = this.getMenuAnchorElement.bind(this);
    this.onMenuActionClick = this.onMenuActionClick.bind(this);
    this.onMenuItemSelect = this.onMenuItemSelect.bind(this);
  }

  /**
   * @stable [09.10.2020]
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      routes,
      urls,
    } = this.settings;
    const {
      className,
      onCommentClick,
      user,
    } = originalProps;

    const headerContentElement = this.headerContentElement;

    return (
      <div
        ref={this.actualRef}
        className={ClsUtils.joinClassName(HeaderClassesEnum.HEADER, CalcUtils.calc(className))}
      >
        {
          headerContentElement && (
            <div className={HeaderClassesEnum.CONTENT}>
              {headerContentElement}
            </div>
          )
        }
        <div
          className={HeaderClassesEnum.ACTIONS}
        >
          {this.originalChildren}
          {
            TypeUtils.isFn(onCommentClick) && this.uiFactory.makeIcon({
              type: IconsEnum.COMMENT,
              className: HeaderClassesEnum.CHAT_ACTION,
              onClick: onCommentClick,
            })
          }
          {
            routes.help && (
              <a
                id={DefaultEntities.HEADER_HELP_LINK_UUID}
                className={HeaderClassesEnum.HELP_ACTION_WRAPPER}
                href={routes.help}
              >
                {this.uiFactory.makeIcon({
                  type: IconsEnum.QUESTION_CIRCLE_REGULAR,
                  className: HeaderClassesEnum.HELP_ACTION,
                })}
              </a>
            )
          }
          <Link
            to={routes.profile}
            className={HeaderClassesEnum.USER_AVATAR}
            style={{backgroundImage: this.domAccessor.asImageUrl(user.url || urls.emptyAvatar)}}/>
          <Link
            to={routes.profile}
            className={HeaderClassesEnum.USER_INFO}
          >
            {user.name}
          </Link>
          {this.menuActionElement}
        </div>
      </div>
    );
  }

  /**
   * @stable [21.05.2020]
   * @returns {React.ReactNode}
   */
  private get headerContentElement(): React.ReactNode {
    const mergedProps = this.mergedProps;
    const {
      navigationActionConfiguration = {},
      navigationActionRendered,
    } = mergedProps;

    const contentElement = this.contentElement;

    if (navigationActionRendered) {
      return (
        <React.Fragment>
          {
            <Button
              icon={IconsEnum.ARROW_LEFT}
              {...navigationActionConfiguration}
              className={
                ClsUtils.joinClassName(
                  HeaderClassesEnum.NAVIGATION_ACTION,
                  CalcUtils.calc(navigationActionConfiguration.className),
                )
              }/>
          }
          {contentElement}
        </React.Fragment>
      );
    }
    return contentElement;
  }

  /**
   * @stable [21.05.2020]
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
          forwardedRef={this.menuAnchorRef}
          icon={IconsEnum.ELLIPSIS_H}
          {...menuActionConfiguration}
          className={
            ClsUtils.joinClassName(
              HeaderClassesEnum.MENU_ACTION,
              CalcUtils.calc(menuActionConfiguration.className)
            )
          }
          onClick={this.onMenuActionClick}
        />
        <Menu
          ref={this.menuRef}
          {...this.defaultMenuProps}
          {...menuConfiguration}
          anchorElement={this.getMenuAnchorElement}
          positionConfiguration={DefaultEntities.DOM_RIGHT_POSITION_CONFIG_ENTITY}
          onSelect={this.onMenuItemSelect}/>
      </React.Fragment>
    );
  }

  /**
   * @stable [21.05.2020]
   * @param {IPresetsMenuItemEntity} menuItem
   */
  private onMenuItemSelect(menuItem: IPresetsMenuItemEntity): void {
    ConditionUtils.ifNotNilThanValue(this.mergedProps.onSelect, (onSelect) => onSelect(menuItem));
  }

  /**
   * @stable [21.05.2020]
   */
  private onMenuActionClick(): void {
    this.menuRef.current.show();
  }

  /**
   * @stable [21.05.2020]
   * @returns {HTMLElement}
   */
  private getMenuAnchorElement(): HTMLElement {
    return this.menuAnchorRef.current;
  }

  /**
   * @stable [21.05.2020]
   * @returns {React.ReactNode}
   */
  private get contentElement(): React.ReactNode {
    return CalcUtils.calc(this.mergedProps.content, this);
  }

  /**
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): IHeaderProps {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.header
    );
  }
}
