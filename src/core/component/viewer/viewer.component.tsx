import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  isPreviewUsed,
  NvlUtils,
  ObjectUtils,
  WrapperUtils,
} from '../../util';
import {
  ComponentClassesEnum,
  DialogClassesEnum,
  IconsEnum,
  IViewerProps,
  IViewerState,
  ViewerClassesEnum,
  ViewersEnum,
} from '../../definition';
import {
  AnyT,
  UNDEF,
} from '../../definitions.interface';
import { Button } from '../button/button.component';
import { Dialog } from '../dialog/dialog.component';
import { GenericComponent } from '../base/generic.component';
import { Info } from '../info/info.component';

export abstract class Viewer<TProps extends IViewerProps = IViewerProps,
                             TState extends IViewerState = IViewerState>
  extends GenericComponent<TProps, TState> {

  private static readonly DEFAULT_PAGE = 1;

  private readonly previewDialogRef = React.createRef<Dialog>();

  /**
   * @stable [16.03.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onBack = this.onBack.bind(this);
    this.onDecrementScale = this.onDecrementScale.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onIncrementScale = this.onIncrementScale.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onLoadSucceed = this.onLoadSucceed.bind(this);
    this.showPreviewDialog = this.showPreviewDialog.bind(this);

    this.state = {} as TState;
  }

  /**
   * @stable [16.03.2020]
   * @param {TProps} prevProps
   * @param {TState} prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    if (this.hasSrcChanges(prevProps, prevState)) {
      this.refreshOnSrcChanges();
    } else if (this.hasInternalChanges(prevProps, prevState)) {
      this.refreshOnInternalChanges();
    }
  }

  /**
   * @stable [16.03.2020]
   */
  public componentDidMount(): void {
    this.refreshOnSrcChanges();
  }

  /**
   * @stable [02.10.2020]
   */
  public render(): JSX.Element {
    const {style} = this.originalProps;

    return (
      <div
        style={style}
        className={this.getClassName()}
      >
        {this.originalChildren}
        {this.bodyElement}
        {this.previewIconElement}
        {this.previewDialogElement}
      </div>
    );
  }

  /**
   * @stable [16.03.2020]
   * @returns {JSX.Element}
   */
  protected getPreviewExtraActionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {this.incrementScaleAction}
        {this.decrementScaleAction}
        {this.previewBackActionElement}
        {this.previewForwardActionElement}
      </React.Fragment>
    );
  }

  /**
   * @stable [18.03.2020]
   * @returns {JSX.Element}
   */
  protected get previewForwardActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.ARROW_RIGHT}
        disabled={this.isPreviewForwardActionDisabled()}
        onClick={this.onForward}/>
    );
  }

  /**
   * @stable [18.03.2020]
   * @returns {JSX.Element}
   */
  protected get previewBackActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.ARROW_LEFT}
        disabled={this.isPreviewBackActionDisabled()}
        onClick={this.onBack}/>
    );
  }

  /**
   * @stable [18.03.2020]
   * @returns {JSX.Element}
   */
  protected get incrementScaleAction(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.SEARCH_PLUS}
        onClick={this.onIncrementScale}/>
    );
  }

  /**
   * @stable [18.03.2020]
   * @returns {JSX.Element}
   */
  protected get decrementScaleAction(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.SEARCH_MINUS}
        onClick={this.onDecrementScale}/>
    );
  }

  /**
   * @stable [18.03.2020]
   * @param {AnyT} error
   */
  protected onLoadError(error: AnyT): void {
    this.setState({error, progress: false});
  }

  /**
   * @stable [18.03.2020]
   * @param {(...args) => void} callback
   */
  protected onLoadSucceed(callback?: (...args) => void): void {
    this.setState({progress: false}, callback);
  }

  /**
   * @stable [18.03.2020]
   */
  protected onLoadStart(): void {
    this.setState({error: null, progress: true});
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  protected isPreviewForwardActionDisabled(): boolean {
    return false;
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  protected isPreviewBackActionDisabled(): boolean {
    const previewPage = this.state.previewPage;
    return !previewPage || previewPage === Viewer.DEFAULT_PAGE;
  }

  /**
   * @stable [19.06.2020]
   * @returns {string}
   */
  protected getClassName(): string {
    const originalProps = this.originalProps;
    const {
      className,
    } = this.originalProps;

    return ClsUtils.joinClassName(
      ViewerClassesEnum.VIEWER,
      this.isSrcAbsent && ViewerClassesEnum.EMPTY_VIEWER,
      this.isInfoRendered && ViewerClassesEnum.INFO_VIEWER,
      WrapperUtils.isFull(originalProps) && ViewerClassesEnum.FULL_VIEWER,
      CalcUtils.calc<string>(className)
    );
  }

  /**
   * @stable [16.03.2020]
   */
  protected refreshOnSrcChanges(): void {
    // Do nothing
  }

  /**
   * @stable [16.03.2020]
   */
  protected refreshOnInternalChanges(): void {
    // Do nothing
  }

  /**
   * @stable [18.03.2020]
   * @returns {JSX.Element}
   */
  protected abstract getContentElement(): JSX.Element;

  /**
   * @stable [15.03.2020]
   * @returns {JSX.Element}
   */
  protected abstract getPreviewElement(): JSX.Element;

  /**
   * @stable [02.08.2020]
   */
  protected get inProgress(): boolean {
    return WrapperUtils.inProgress(this.state);
  }

  /**
   * @stable [16.03.2020]
   */
  protected onDialogClose(): void {
    this.setState({
      opened: false,
      previewPage: UNDEF,
      previewScale: UNDEF,
    });
  }

  /**
   * @stable [16.03.2020]
   * @param {TProps} prevProps
   * @param {TState} prevState
   * @returns {boolean}
   */
  protected hasInternalChanges(prevProps: TProps, prevState: TState): boolean {
    return (
      this.hasPageChanges(prevProps, prevState)
      || this.hasScaleChanges(prevProps, prevState)
    );
  }

  /**
   * @stable [15.03.2020]
   * @param {TProps} prevProps
   * @param {TState} prevState
   * @returns {boolean}
   */
  protected hasScaleChanges(prevProps: TProps, prevState: TState): boolean {
    return ObjectUtils.isCurrentValueNotEqualPreviousValue(this.props.scale, prevProps.scale);
  }

  /**
   * @stable [16.03.2020]
   * @param {TProps} prevProps
   * @param {TState} prevState
   * @returns {boolean}
   */
  protected hasSrcChanges(prevProps: TProps, prevState: TState): boolean {
    return ObjectUtils.isCurrentValueNotEqualPreviousValue(this.props.src, prevProps.src);
  }

  /**
   * @stable [16.03.2020]
   * @param {TProps} prevProps
   * @param {TState} prevState
   * @returns {boolean}
   */
  protected hasPageChanges(prevProps: TProps, prevState: TState): boolean {
    return (
      ObjectUtils.isCurrentValueNotEqualPreviousValue(this.props.page, prevProps.page)
      || ObjectUtils.isCurrentValueNotEqualPreviousValue(this.state.page, prevState.page)
    );
  }

  /**
   * @stable [16.03.2020]
   */
  private onBack(): void {
    this.setState({previewPage: this.actualOrDefaultPreviewPage - 1});
  }

  /**
   * @stable [16.03.2020]
   */
  private onForward(): void {
    this.setState({previewPage: this.actualOrDefaultPreviewPage + 1});
  }

  /**
   * @stable [16.03.2020]
   */
  private onIncrementScale(): void {
    this.setState({previewScale: this.actualOrDefaultPreviewScale + this.defaultScaleDiff});
  }

  /**
   * @stable [16.03.2020]
   */
  private onDecrementScale(): void {
    this.setState({previewScale: this.actualOrDefaultPreviewScale - this.defaultScaleDiff});
  }

  /**
   * @stable [16.03.2020]
   */
  private showPreviewDialog(): void {
    this.setState({opened: true}, () => this.previewDialogRef.current.activate());
  }

  /**
   * @stable [16.03.2020]
   * @returns {number}
   */
  protected get actualOrDefaultPage(): number {
    return NvlUtils.nvl(this.actualPage, Viewer.DEFAULT_PAGE);
  }

  /**
   * @stable [02.10.2020]
   */
  protected get actualPage(): number {
    return NvlUtils.nvl(this.state.page, this.originalProps.page);
  }

  /**
   * @stable [16.03.2020]
   * @returns {number}
   */
  protected get actualOrDefaultPreviewPage(): number {
    return NvlUtils.nvl(this.actualPreviewPage, Viewer.DEFAULT_PAGE);
  }

  /**
   * @stable [16.03.2020]
   * @returns {number}
   */
  protected get actualPreviewPage(): number {
    return NvlUtils.nvl(this.state.previewPage, this.props.previewPage);
  }

  /**
   * @stable [02.10.2020]
   */
  protected get actualOrDefaultPreviewScale(): number {
    return NvlUtils.coalesce(this.state.previewScale, this.originalProps.previewScale, this.defaultScale);
  }

  /**
   * @stable [02.10.2020]
   */
  protected get actualOrDefaultScale(): number {
    return NvlUtils.coalesce(this.state.scale, this.originalProps.scale, this.defaultScale);
  }

  /**
   * @stable [18.03.2020]
   * @returns {string}
   */
  protected get actualSrc(): string {
    return this.props.src || this.props.defaultScr;
  }

  /**
   * @stable [23.03.2020]
   * @returns {number}
   */
  protected get defaultScaleDiff(): number {
    return .3;
  }

  /**
   * @stable [23.03.2020]
   * @returns {number}
   */
  protected get defaultScale(): number {
    return 1;
  }

  /**
   * @stable [19.06.2020]
   * @returns {React.ReactNode}
   */
  private get bodyElement(): React.ReactNode {
    const {
      AN_ERROR_OCCURRED_WHILE_LOADING_THE_FILE,
    } = this.settings.messages;

    const Component = this.viewerLocator.resolve(ViewersEnum.PICTURE);

    return this.isInfoRendered
      ? (
        <Info
          progress={this.inProgress}
          error={AN_ERROR_OCCURRED_WHILE_LOADING_THE_FILE}/>
      )
      : (
        this.isActualSrcAbsent
          ? <Component/>
          : this.getContentElement()
      );
  }

  /**
   * @stable [16.03.2020]
   * @returns {JSX.Element}
   */
  private get previewDialogElement(): JSX.Element {
    const {
      CLOSE,
      PREVIEW,
    } = this.settings.messages;
    const {
      opened,
    } = this.state;
    const {
      previewDialogConfiguration,
    } = this.mergedProps;

    return opened && this.canPreview && (
      <Dialog
        title={PREVIEW}
        closeText={CLOSE}
        {...previewDialogConfiguration}
        ref={this.previewDialogRef}
        className={DialogClassesEnum.PREVIEW_DIALOG}
        acceptable={false}
        extraActions={this.getPreviewExtraActionsElement()}
        onDeactivate={this.onDialogClose}
      >
        {this.getPreviewElement()}
      </Dialog>
    );
  }

  /**
   * @stable [18.03.2020]
   * @returns {JSX.Element}
   */
  private get previewIconElement(): JSX.Element {
    return (
      this.canPreview && (
        this.uiFactory.makeIcon({
          type: IconsEnum.SEARCH_PLUS,
          className: ClsUtils.joinClassName(
            ComponentClassesEnum.ALIGNMENT_CENTER,
            ViewerClassesEnum.VIEWER_PREVIEW_ICON
          ),
          onClick: this.showPreviewDialog,
        })
      )
    );
  }

  /**
   * @stable [18.03.2020]
   * @returns {boolean}
   */
  private get isInfoRendered(): boolean {
    return this.inProgress || this.doesErrorExist;
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get canPreview(): boolean {
    return this.isPreviewUsed
      && !this.inProgress
      && !this.isActualSrcAbsent
      && !this.doesErrorExist;
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get doesErrorExist(): boolean {
    return !R.isNil(this.state.error);
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get isActualSrcAbsent(): boolean {
    return this.isSrcAbsent && this.isDefaultSrcAbsent;
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get isSrcAbsent(): boolean {
    return R.isNil(this.props.src);
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get isDefaultSrcAbsent(): boolean {
    return R.isNil(this.props.defaultScr);
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  private get isPreviewUsed(): boolean {
    return isPreviewUsed(this.props);
  }
}
