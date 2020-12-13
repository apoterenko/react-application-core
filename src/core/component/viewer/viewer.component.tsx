import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  NvlUtils,
  ObjectUtils,
  WrapperUtils,
} from '../../util';
import {
  ComponentClassesEnum,
  DialogClassesEnum,
  IconsEnum,
  IDialogProps,
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

export class Viewer<
    TProps extends IViewerProps = IViewerProps,
    TState extends IViewerState = IViewerState
  > extends GenericComponent<TProps, TState> {

  public static readonly defaultProps: IViewerProps = {
    usePreview: true,
  };

  private static readonly DEFAULT_PAGE = 1;
  private readonly previewDialogRef = React.createRef<Dialog>();

  /**
   * @stable [13.12.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

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
   * @stable [13.12.2020]
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    if (this.hasInlineDialogBeenClosed(prevProps, prevState) || this.hasSrcChanges(prevProps, prevState)) {
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
   * @stable [13.12.2020]
   */
  public render(): JSX.Element {
    const {
      style,
    } = this.originalProps;

    return (
      <div
        style={style}
        className={this.getClassName()}
      >
        {this.originalChildren}
        {this.isBodyElementRendered && this.bodyElement}
        {this.previewIconElement}
        {this.previewDialogElement}
      </div>
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected getPreviewExtraActionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {this.incrementScaleActionElement}
        {this.decrementScaleActionElement}
        {this.previewBackActionElement}
        {this.previewForwardActionElement}
      </React.Fragment>
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected get previewForwardActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.ARROW_RIGHT}
        disabled={this.isPreviewForwardActionDisabled}
        onClick={this.onForward}/>
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected get previewBackActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.ARROW_LEFT}
        disabled={this.isPreviewBackActionDisabled}
        onClick={this.onBack}/>
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected get incrementScaleActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.SEARCH_PLUS}
        onClick={this.onIncrementScale}/>
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected get decrementScaleActionElement(): JSX.Element {
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
   * @stable [13.12.2020]
   * @protected
   */
  protected get isPreviewForwardActionDisabled(): boolean {
    return false;
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected get isPreviewBackActionDisabled(): boolean {
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
   * @stable [13.12.2020]
   * @protected
   */
  protected getContentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected getPreviewElement(): JSX.Element {
    return null;
  }

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
   * @stable [13.12.2020]
   * @param prevProps
   * @param prevState
   * @private
   */
  private hasInternalChanges(prevProps: TProps, prevState: TState): boolean {
    return (
      this.hasPageChanges(prevProps, prevState)
      || this.hasScaleChanges(prevProps, prevState)
    );
  }

  /**
   * @stable [13.12.2020]
   * @param prevProps
   * @param prevState
   * @private
   */
  private hasScaleChanges(prevProps: TProps, prevState: TState): boolean {
    return ObjectUtils.isCurrentValueNotEqualPreviousValue(this.originalProps.scale, prevProps.scale);
  }

  /**
   * @stable [13.12.2020]
   * @param prevProps
   * @param prevState
   * @private
   */
  private hasSrcChanges(prevProps: TProps, prevState: TState): boolean {
    return ObjectUtils.isCurrentValueNotEqualPreviousValue(this.originalProps.src, prevProps.src);
  }

  /**
   * @stable [13.12.2020]
   * @param prevProps
   * @param prevState
   * @private
   */
  private hasInlineDialogBeenClosed(prevProps: TProps, prevState: TState): boolean {
    return this.isPreviewDialogInline && prevState.opened && !this.state.opened;
  }

  /**
   * @stable [13.12.2020]
   * @param prevProps
   * @param prevState
   * @private
   */
  private hasPageChanges(prevProps: TProps, prevState: TState): boolean {
    return (
      ObjectUtils.isCurrentValueNotEqualPreviousValue(this.originalProps.page, prevProps.page)
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

    return this.isPreviewDialogOpened && (
      <Dialog
        title={PREVIEW}
        closeText={CLOSE}
        {...this.previewDialogConfiguration}
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
   * @stable [13.12.2020]
   * @private
   */
  private get isPreviewDialogOpened(): boolean {
    return this.state.opened && this.canPreview;
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get isBodyElementRendered(): boolean {
    return !this.isPreviewDialogOpened || !this.isPreviewDialogInline;
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get isPreviewDialogInline(): boolean {
    return this.previewDialogConfiguration.inline;
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get previewDialogConfiguration(): IDialogProps {
    return this.mergedProps.previewDialogConfiguration || {};
  }

  /**
   * @stable [13.12.2020]
   * @private
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
   * @stable [13.12.2020]
   * @private
   */
  private get isInfoRendered(): boolean {
    return this.inProgress || this.doesErrorExist;
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get canPreview(): boolean {
    return this.isPreviewUsed
      && !this.inProgress
      && !this.isActualSrcAbsent
      && !this.doesErrorExist;
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get doesErrorExist(): boolean {
    return !R.isNil(this.state.error);
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get isActualSrcAbsent(): boolean {
    return this.isSrcAbsent && this.isDefaultSrcAbsent;
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get isSrcAbsent(): boolean {
    return R.isNil(this.originalProps.src);
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get isDefaultSrcAbsent(): boolean {
    return R.isNil(this.originalProps.defaultScr);
  }

  /**
   * @stable [13.12.2020]
   * @private
   */
  private get isPreviewUsed(): boolean {
    return this.originalProps.usePreview;
  }
}
