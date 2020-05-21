import * as React from 'react';

import { GenericComponent } from '../../base/generic.component';
import {
  CalcUtils,
  ClsUtils,
  inProgress,
  isDrawerHeaderRendered,
  isSubHeaderRendered,
  Mappers,
  mergeWithSystemProps,
  nvl,
  selectStackWrapperItemEntities,
  WrapperUtils,
} from '../../../util';
import { Drawer } from '../../drawer';
import {
  DefaultLayoutClassesEnum,
  IDefaultLayoutProps,
  IHeaderProps,
  LayoutModesEnum,
} from '../../../definition';
import { FlexLayout } from '../../layout/flex';
import {
  PerfectScrollPlugin,
  SelectedElementPlugin,
  StickyHeaderPlugin,
} from '../../plugin';
import { Header } from '../../header';
import { Main } from '../../main';
import { Dialog } from '../../dialog';

export class DefaultLayout extends GenericComponent<IDefaultLayoutProps> {

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

    return (
      <div
        className={
          ClsUtils.joinClassName(
            DefaultLayoutClassesEnum.DEFAULT_LAYOUT,
            CalcUtils.calc(props.className),
            isSubHeaderRendered(props) ? 'rac-default-layout-with-sub-header' : 'rac-default-layout-without-sub-header',
            this.isLayoutFullModeEnabled
              ? DefaultLayoutClassesEnum.DEFAULT_LAYOUT_FULL
              : DefaultLayoutClassesEnum.DEFAULT_LAYOUT_MINI
          )
        }>
        {this.drawerElement}
        {this.bodyElement}
      </div>
    );
  }

  /**
   * @stable [20.05.2020]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const elementsMarkers = this.settings.elementsMarkers;
    const mergedProps = this.mergedProps;

    return (
      <div
        className={DefaultLayoutClassesEnum.DEFAULT_LAYOUT_BODY}
      >
        {WrapperUtils.isHeaderRendered(mergedProps) && (mergedProps.header || this.headerElement)}
        <Main
          stickyElementClassName={elementsMarkers.stickyElement}
          selectedElementClassName={elementsMarkers.selectedElement}
          plugins={[
            PerfectScrollPlugin,
            SelectedElementPlugin,
            StickyHeaderPlugin
          ]}>
          {this.props.children}
          {this.isLayoutInProgress && <Dialog progress={true} overlay={true}/>}
        </Main>
        {WrapperUtils.isFooterRendered(mergedProps) && mergedProps.footer}
      </div>
    );
  }

  /**
   * @stable [21.05.2020]
   * @returns {JSX.Element}
   */
  private get headerElement(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      headerConfiguration,
    } = mergedProps;

    return (
      <Header
        {...Mappers.headerProps(mergedProps)}
        navigationActionRendered={this.isNavigationActionRendered}
        {...headerConfiguration}/>
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
        className={DefaultLayoutClassesEnum.DEFAULT_LAYOUT_DRAWER_HEADER}
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
   * @stable [28.03.2020]
   * @returns {LayoutModesEnum}
   */
  private get layoutMode(): LayoutModesEnum {
    return nvl(this.mergedProps.layoutMode, this.props.layout.mode);
  }

  /**
   * @stable [28.03.2020]
   * @returns {boolean}
   */
  private get isDrawerHeaderRendered(): boolean {
    return isDrawerHeaderRendered(this.mergedProps);
  }

  /**
   * @stable [28.03.2020]
   * @returns {IDefaultLayoutProps}
   */
  private get mergedProps(): IDefaultLayoutProps {
    return mergeWithSystemProps(this.props, this.settings.components.defaultLayout);
  }

  /**
   * @stable [11.05.2020]
   * @returns {boolean}
   */
  private get isLayoutInProgress(): boolean {
    return inProgress(this.props);
  }

  private get isNavigationActionRendered(): boolean {
    return (selectStackWrapperItemEntities(this.props) || []).length > 1;
  }

  /**
   * @stable [28.03.2020]
   * @returns {IHeaderProps}
   */
  private get mergedHeaderProps(): IHeaderProps {
    return mergeWithSystemProps(this.props.headerConfiguration, this.settings.components.header);
  }
}
