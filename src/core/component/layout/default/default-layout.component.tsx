import * as React from 'react';

import { GenericComponent } from '../../base/generic.component';
import {
  CalcUtils,
  ClsUtils,
  Mappers,
  PropsUtils,
  Selectors,
  StackUtils,
  WrapperUtils,
} from '../../../util';
import { Drawer } from '../../drawer';
import {
  DefaultLayoutClassesEnum,
  IDefaultLayoutProps,
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
import { SubHeader } from '../../sub-header';

export class DefaultLayout extends GenericComponent<IDefaultLayoutProps> {

  public static readonly defaultProps: IDefaultLayoutProps = {
    drawerHeaderRendered: true,
    footerRendered: true,
    headerRendered: true,
    subHeaderRendered: true,
  };

  /**
   * @stable [21.05.2020]
   * @param {IDefaultLayoutProps} props
   */
  constructor(props: IDefaultLayoutProps) {
    super(props);

    this.onDrawerHeaderLogoClick = this.onDrawerHeaderLogoClick.bind(this);
    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
  }

  /**
   * @stable [21.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
    } = this.mergedProps;

    return (
      <div
        className={
          ClsUtils.joinClassName(
            DefaultLayoutClassesEnum.DEFAULT_LAYOUT,
            CalcUtils.calc(className),
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
   * @stable [21.05.2020]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const {
      selectedElement,
      stickyElement,
    } = this.settings.elementsMarkers;

    const mergedProps = this.mergedProps;
    const {
      footer,
      footerRendered,
      header,
      headerRendered,
      subHeaderRendered,
    } = mergedProps;

    return (
      <div
        className={DefaultLayoutClassesEnum.DEFAULT_LAYOUT_BODY}
      >
        {headerRendered && (header || this.headerElement)}
        <Main
          stickyElementClassName={stickyElement}
          selectedElementClassName={selectedElement}
          subHeaderRendered={subHeaderRendered}
          plugins={[
            PerfectScrollPlugin,
            SelectedElementPlugin,
            StickyHeaderPlugin
          ]}
        >
          {subHeaderRendered && this.subHeaderElement}
          {this.props.children}
          {this.isLayoutInProgress && <Dialog progress={true} overlay={true}/>}
        </Main>
        {footerRendered && footer}
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
   * @stable [21.05.2020]
   * @returns {JSX.Element}
   */
  private get subHeaderElement(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      subHeaderConfiguration,
    } = mergedProps;

    return (
      <SubHeader
        navigationActionRendered={this.isNavigationActionRendered}
        {...subHeaderConfiguration}/>
    );
  }

  /**
   * @stable [04.02.2020]
   * @returns {JSX.Element}
   */
  private get drawerElement(): JSX.Element {
    const {
      drawerHeaderRendered,
    } = this.mergedProps;

    // TODO
    return (
      <Drawer mini={!this.isLayoutFullModeEnabled}>
        {drawerHeaderRendered && this.drawerHeaderElement}
        {this.props.navigationListElement}
      </Drawer>
    );
  }

  /**
   * @stable [21.05.2020]
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
   * @stable [21.05.2020]
   * @returns {boolean}
   */
  private get isNavigationActionRendered(): boolean {
    return StackUtils.doesStackContainChildren(this.originalProps);
  }

  /**
   * @stable [21.05.2020]
   * @returns {boolean}
   */
  private get isLayoutFullModeEnabled(): boolean {
    return this.layoutMode === LayoutModesEnum.FULL;
  }

  /**
   * @stable [21.05.2020]
   * @returns {boolean}
   */
  private get isLayoutInProgress(): boolean {
    return WrapperUtils.inProgress(this.mergedProps);
  }

  /**
   * @stable [21.05.2020]
   * @returns {LayoutModesEnum}
   */
  private get layoutMode(): LayoutModesEnum {
    const mergedProps = this.mergedProps;
    const originalProps = this.originalProps;

    return Selectors.mergedLayoutMode(mergedProps, originalProps);
  }

  /**
   * @stable [21.05.2020]
   * @returns {IDefaultLayoutProps}
   */
  private get mergedProps(): IDefaultLayoutProps {
    return PropsUtils.mergeWithSystemProps(this.originalProps, this.settings.components.defaultLayout);
  }
}
