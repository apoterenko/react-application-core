import * as React from 'react';

import { GenericComponent } from '../../base/generic.component';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  Mappers,
  Selectors,
  StackUtils,
  TypeUtils,
  WrapperUtils,
} from '../../../util';
import { Drawer } from '../../drawer';
import {
  DefaultLayoutClassesEnum,
  IconsEnum,
  IDefaultLayoutProps,
  LayoutModesEnum,
} from '../../../definition';
import {
  PerfectScrollPlugin,
  SelectedElementPlugin,
  StickyHeaderPlugin,
} from '../../plugin';
import { Dialog } from '../../dialog';
import { Header } from '../../header';
import { Main } from '../../main';
import { SubHeader } from '../../sub-header';

export class DefaultLayout extends GenericComponent<IDefaultLayoutProps> {

  public static readonly defaultProps: IDefaultLayoutProps = {
    drawerHeaderLogoRendered: true,
    drawerHeaderRendered: true,
    footerRendered: true,
    headerRendered: true,
    subHeaderRendered: true,
  };

  private readonly chatDialogRef = React.createRef<Dialog>();

  /**
   * @stable [09.10.2020]
   * @param originalProps
   */
  constructor(originalProps: IDefaultLayoutProps) {
    super(originalProps);

    this.onChatDialogClose = this.onChatDialogClose.bind(this);
    this.onDrawerHeaderMenuActionClick = this.onDrawerHeaderMenuActionClick.bind(this);
  }

  /**
   * @stable [09.10.2020]
   */
  public render(): JSX.Element {
    const {
      className,
    } = this.originalProps;

    return (
      <div
        ref={this.actualRef}
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
        {this.chatDialogElement}
      </div>
    );
  }

  /**
   * @stable [09.10.2020]
   */
  private onChatDialogClose(): void {
    this.chatDialogRef.current.close();
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
      mainConfiguration,
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
          {...mainConfiguration}
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
   * @stable [09.10.2020]
   */
  private get chatDialogElement(): JSX.Element {
    const {
      chatDialogContent,
    } = this.mergedProps;

    return (
      <Dialog
        ref={this.chatDialogRef}
        acceptable={false}
        closable={false}
        default={false}
        inline={true}
        className={DefaultLayoutClassesEnum.CHAT_DIALOG}
        onDeactivate={() => {
          // TODO
        }}
      >
        {CalcUtils.calc(chatDialogContent, {
          defaultLayoutProps: this.originalProps,
          onClose: this.onChatDialogClose,
        })}
      </Dialog>
    );
  }

  /**
   * @stable [12.08.2020]
   * @private
   */
  private get headerElement(): JSX.Element {
    return (
      <Header
        {...Mappers.defaultLayoutPropsAsHeaderProps(this.originalProps)}
        navigationActionRendered={this.isNavigationActionRendered}/>  // TODO onCommentClick={this.commentClickHandler}
    );
  }

  /**
   * @stable [09.10.2020]
   */
  private get commentClickHandler(): () => void {
    const {
      chatDialogContent,
    } = this.mergedProps;

    return ConditionUtils.orUndef(
      TypeUtils.isDef(chatDialogContent),
      () => () => this.chatDialogRef.current.activate()
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
   * @stable [27.05.2020]
   * @returns {JSX.Element}
   */
  private get drawerHeaderElement(): JSX.Element {
    const {
      drawerHeaderLogoRendered,
    } = this.mergedProps;
    const {
      onDrawerHeaderClick,
    } = this.originalProps;

    return (
      <div
        className={DefaultLayoutClassesEnum.DEFAULT_LAYOUT_DRAWER_HEADER}
        onClick={onDrawerHeaderClick}
      >
        {
          ConditionUtils.ifNotNilThanValue(
            this.environment.appVersion,
            (appVersion) => (
              <div className={DefaultLayoutClassesEnum.DEFAULT_LAYOUT_DRAWER_HEADER_VERSION}>{appVersion}</div>
            )
          )
        }
        {drawerHeaderLogoRendered && this.isLayoutFullModeEnabled && (
          <div className={DefaultLayoutClassesEnum.DEFAULT_LAYOUT_DRAWER_HEADER_LOGO}/>
        )}
        {this.uiFactory.makeIcon({
          type: IconsEnum.BARS,
          className: DefaultLayoutClassesEnum.DEFAULT_LAYOUT_DRAWER_HEADER_MENU_ACTION,
          onClick: this.onDrawerHeaderMenuActionClick,
        })}
      </div>
    );
  }

  /**
   * @stable [27.05.2020]
   */
  private onDrawerHeaderMenuActionClick(): void {
    this.mergedProps.onChangeLayoutMode(this.layoutMode);
  }

  /**
   * @stable [21.05.2020]
   * @returns {boolean}
   */
  private get isNavigationActionRendered(): boolean {
    return StackUtils.doesHolderStackEntityContainChildren(this.originalProps);
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
   * @stable [02.06.2020]
   * @returns {IDefaultLayoutProps}
   */
  protected get componentsSettingsProps(): IDefaultLayoutProps {
    return this.componentsSettings.defaultLayout;
  }
}
