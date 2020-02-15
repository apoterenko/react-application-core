import * as React from 'react';
import * as R from 'ramda';

import { BaseComponent } from '../../base/base.component';
import {
  calc,
  isBackActionRendered,
  isHeaderRendered,
  isSubHeaderRendered,
  joinClassName,
  nvl,
  selectStackWrapperItemEntities,
} from '../../../util';
import { Drawer } from '../../drawer';
import {
  ElementsMarkersEnum,
  IComponentsSettingsEntity,
  IDefaultLayoutProps,
  IHeaderProps,
  LayoutModesEnum,
  UniversalScrollableContext,
  UniversalStickyContext,
} from '../../../definition';
import { FlexLayout } from '../../layout/flex';
import {
  PerfectScrollPlugin,
  SelectedElementPlugin,
  StickyHeaderPlugin,
} from '../../plugin';
import { Header } from '../../header';
import { Main } from '../../main';

export class DefaultLayout extends BaseComponent<IDefaultLayoutProps> {

  /**
   * @stable [04.02.2020]
   * @param {IDefaultLayoutProps} props
   */
  constructor(props: IDefaultLayoutProps) {
    super(props);

    this.onDrawerHeaderLogoClick = this.onDrawerHeaderLogoClick.bind(this);
    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
  }

  /**
   * @stable [05.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const stickyMarker = ElementsMarkersEnum.STICKY_ELEMENT_275B4646;
    const selectedMarker = ElementsMarkersEnum.SELECTED_ELEMENT_817ACCF6;

    return (
      <UniversalStickyContext.Provider value={stickyMarker}>
        <UniversalScrollableContext.Provider value={selectedMarker}>
          <div
            className={
              joinClassName(
                'rac-default-layout',
                calc(props.className),
                isSubHeaderRendered(props) ? 'rac-default-layout-with-sub-header' : 'rac-default-layout-without-sub-header',
                this.isLayoutFullModeEnabled ? 'rac-default-layout-full' : 'rac-default-layout-mini'
              )
            }>
            {this.drawerElement}
            <div className='rac-default-layout__body'>
              {isHeaderRendered(props) && (props.header || this.headerElement)}
              <Main
                stickyElementClassName={stickyMarker}
                selectedElementClassName={selectedMarker}
                plugins={[
                  PerfectScrollPlugin,
                  SelectedElementPlugin,
                  StickyHeaderPlugin
                ]}>
                {props.children}
              </Main>
              {props.footer}
            </div>
          </div>
        </UniversalScrollableContext.Provider>
      </UniversalStickyContext.Provider>
    );
  }

  /**
   * @stable [12.02.2020]
   * @returns {JSX.Element}
   */
  private get headerElement(): JSX.Element {
    const {user} = this.props;

    return (
      <Header
        user={user}
        {...this.actualHeaderProps}
        backActionRendered={this.isHeaderBackActionRendered && (selectStackWrapperItemEntities(this.props) || []).length > 1}>
      </Header>
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
    return nvl(this.systemProps.layoutMode, this.props.layout.mode);
  }

  /**
   * @stable [04.02.2020]
   * @returns {boolean}
   */
  private get isDrawerHeaderRendered(): boolean {
    return nvl(this.systemProps.drawerHeaderRendered, this.props.drawerHeaderRendered) !== false;
  }

  /**
   * @stable [13.02.2020]
   * @returns {boolean}
   */
  private get isHeaderBackActionRendered(): boolean {
    return isBackActionRendered(this.actualHeaderProps);
  }

  /**
   * @stable [13.02.2020]
   * @returns {IHeaderProps}
   */
  private get actualHeaderProps(): IHeaderProps {
    return R.mergeDeepRight(this.props.headerConfiguration, this.systemProps.headerConfiguration);
  }

  /**
   * @stable [04.02.2020]
   * @returns {IDefaultLayoutProps}
   */
  private get systemProps(): IDefaultLayoutProps {
    const {defaultLayout = {}} = this.settings.components || {} as IComponentsSettingsEntity;
    return defaultLayout;
  }
}