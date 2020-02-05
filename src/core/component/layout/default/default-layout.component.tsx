import * as React from 'react';

import { BaseComponent } from '../../base/base.component';
import {
  calc,
  joinClassName,
  nvl,
} from '../../../util';
import { Drawer } from '../../drawer';
import {
  IComponentsSettingsEntity,
  IDefaultLayoutProps,
  LayoutModesEnum,
} from '../../../definition';
import { FlexLayout } from '../../layout/flex';

export class DefaultLayout extends BaseComponent<IDefaultLayoutProps> {

  /**
   * @stable [04.02.2020]
   * @param {IDefaultLayoutProps} props
   */
  constructor(props: IDefaultLayoutProps) {
    super(props);

    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
    this.onDrawerHeaderLogoClick = this.onDrawerHeaderLogoClick.bind(this);
  }

  /**
   * @stable [04.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <div
        className={
          joinClassName(
            'rac-default-layout',
            calc(props.className),
            this.isLayoutFullModeEnabled ? 'rac-default-layout-full' : 'rac-default-layout-mini'
          )
        }>
        {props.drawerHeaderRendered !== false && this.drawerElement}
        <div className='rac-default-layout__body'>
          {props.children}
          {props.footer}
        </div>
      </div>
    );
  }

  /**
   * @stable [04.02.2020]
   * @returns {JSX.Element}
   */
  private get drawerElement(): JSX.Element {
    const isLayoutFullModeEnabled = this.isLayoutFullModeEnabled;
    return (
      <Drawer mini={!isLayoutFullModeEnabled}>
        {this.isDrawerHeaderRendered && this.drawerHeaderElement}
        {this.props.navigationListElement}
      </Drawer>
    );
  }

  /**
   * @stable [04.02.2020]
   * @returns {JSX.Element}
   */
  private get drawerHeaderElement(): JSX.Element {
    return (
      <div
        className='rac-default-layout__drawer-header'
        onClick={this.onLogoMenuActionClick}
      >
        {this.drawerContentElement}
      </div>
    );
  }

  private get drawerContentElement(): JSX.Element {
    const appVersion = this.environment.appVersion;
    const isLayoutFullModeEnabled = this.isLayoutFullModeEnabled;

    return (
      <FlexLayout
        row={true}
        alignItemsCenter={true}
        className='rac-profile'
      >
        {appVersion && <div className='rac-profile-app-version'>{appVersion}</div>}
        {isLayoutFullModeEnabled && <div className='rac-profile-avatar'/>}
        {this.uiFactory.makeIcon({
          key: 'drawer-menu-logo-lkey',
          type: 'menu',
          className: 'rac-logo-menu-icon',
          onClick: this.onDrawerHeaderLogoClick,
        })}
      </FlexLayout>
    );
  }

  private onLogoMenuActionClick(): void {
    this.props.onLogoMenuActionClick();
  }

  private onDrawerHeaderLogoClick(): void {
    this.props.onDrawerHeaderClick(this.layoutMode);
  }

  /**
   * @stable [04.02.2020]
   * @returns {boolean}
   */
  private get isLayoutFullModeEnabled(): boolean {
    return this.layoutMode === LayoutModesEnum.FULL;
  }

  /**
   * @stable [04.02.2020]
   * @returns {LayoutModesEnum}
   */
  private get layoutMode(): LayoutModesEnum {
    return nvl(this.systemLayoutMode, this.props.layout.mode);
  }

  /**
   * @stable [04.02.2020]
   * @returns {boolean}
   */
  private get isDrawerHeaderRendered(): boolean {
    return nvl(this.systemSettings.drawerHeaderRendered, this.props.drawerHeaderRendered) !== false;
  }

  /**
   * @stable [04.02.2020]
   * @returns {LayoutModesEnum}
   */
  private get systemLayoutMode(): LayoutModesEnum {
    return this.systemSettings.layoutMode;
  }

  /**
   * @stable [04.02.2020]
   * @returns {IDefaultLayoutProps}
   */
  private get systemSettings(): IDefaultLayoutProps {
    const {defaultLayout = {}} = this.settings.components || {} as IComponentsSettingsEntity;
    return defaultLayout;
  }
}
