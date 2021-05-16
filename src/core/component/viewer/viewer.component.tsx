import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  NvlUtils,
  ObjectUtils,
} from '../../util';
import {
  DialogClassesEnum,
  IconsEnum,
  IDialogProps,
  IViewerProps,
  IViewerState,
  ViewerClassesEnum,
  ViewersEnum,
} from '../../definition';
import { Button } from '../button/button.component';
import { Dialog } from '../dialog/dialog.component';
import { GenericComponent } from '../base/generic.component';
import { Info } from '../info/info.component';
import { UNDEF } from '../../definitions.interface';

/**
 * @component-impl
 * @stable [16.05.2021]
 */
export class Viewer<TProps extends IViewerProps = IViewerProps,
  TState extends IViewerState = IViewerState> extends GenericComponent<TProps, TState> {

  public static readonly defaultProps: IViewerProps = {
    full: true,
    usePreview: true,
  };

  private readonly previewDialogRef = React.createRef<Dialog>();

  /**
   * @stable [16.05.2021]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.onBack = this.onBack.bind(this);
    this.onDecrementPreviewScale = this.onDecrementPreviewScale.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onIncrementPreviewScale = this.onIncrementPreviewScale.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onLoadSucceed = this.onLoadSucceed.bind(this);
    this.onPreviewDialogClose = this.onPreviewDialogClose.bind(this);
    this.onPreviewDialogOpen = this.onPreviewDialogOpen.bind(this);
    this.onRedoPreviewDegree = this.onRedoPreviewDegree.bind(this);
    this.onUndoPreviewDegree = this.onUndoPreviewDegree.bind(this);
    this.showPreviewDialog = this.showPreviewDialog.bind(this);

    this.state = {} as TState;
  }

  /**
   * @stable [16.05.2021]
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    if (this.hasSrcChanges(prevProps, prevState) || this.hasInlineDialogBeenClosed(prevProps, prevState)) {
      this.refreshOnSrcChanges();
    } else if (this.hasInternalChanges(prevProps, prevState)) {
      this.refreshOnInternalChanges();
    }
  }

  /**
   * @stable [16.05.2021]
   */
  public componentDidMount(): void {
    this.refreshOnSrcChanges();
  }

  /**
   * @stable [16.05.2021]
   */
  public render(): JSX.Element {
    const {
      style,
    } = this.originalProps;

    return (
      <div
        ref={this.actualRef}
        style={style}
        className={this.getClassName()}
      >
        {this.originalChildren}
        {!(this.isPreviewDialogInline && this.isOpened) && this.bodyElement}
        {this.canPreview && this.previewDialogElement}
      </div>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected get contentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get previewElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [16.05.2021]
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
   * @stable [16.05.2021]
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
   * @stable [16.05.2021]
   */
  protected get redoActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.REDO}
        onClick={this.onRedoPreviewDegree}/>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected get undoActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.UNDO}
        onClick={this.onUndoPreviewDegree}/>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected get incrementScaleActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.SEARCH_PLUS}
        disabled={this.isIncrementPreviewScaleActionDisabled}
        onClick={this.onIncrementPreviewScale}/>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected get decrementScaleActionElement(): JSX.Element {
    return (
      <Button
        icon={IconsEnum.SEARCH_MINUS}
        disabled={this.isDecrementPreviewScaleActionDisabled}
        onClick={this.onDecrementPreviewScale}/>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected showPreviewDialog(): void {
    this.setState({opened: true}, () => this.previewDialogRef.current.activate());
  }

  /**
   * @stable [16.05.2021]
   */
  protected doShowPreviewDialogIfApplicable(): void {
    if (this.originalProps.opened && this.canPreview) {
      this.showPreviewDialog();
    }
  }

  /**
   * @stable [16.05.2021]
   */
  protected refreshOnSrcChanges(): void {
    // Do nothing
  }

  /**
   * @stable [16.05.2021]
   */
  protected refreshOnInternalChanges(): void {
    // Do nothing
  }

  /**
   * @stable [16.05.2021]
   * @param error
   */
  protected onLoadError(error: Error): void {
    this.setState({error, progress: false});
  }

  /**
   * @stable [16.05.2021]
   * @param callback
   */
  protected onLoadSucceed(callback?: (...args) => void): void {
    this.setState({progress: false}, callback);
  }

  /**
   * @stable [16.05.2021]
   */
  protected onLoadStart(): void {
    this.setState({error: null, progress: true});
  }

  /**
   * @stable [16.05.2021]
   */
  protected get showPreviewDialogHandler(): () => void {
    return ConditionUtils.orUndef(this.canPreview, () => this.showPreviewDialog);
  }

  /**
   * @stable [16.05.2021]
   */
  protected getClassName(): string {
    const {
      className,
      full,
    } = this.originalProps;

    return ClsUtils.joinClassName(
      ViewerClassesEnum.VIEWER,
      full && ViewerClassesEnum.FULL_VIEWER,
      this.canPreview && ViewerClassesEnum.SELECTABLE_VIEWER,
      this.isInfoElementRendered && ViewerClassesEnum.INFO_VIEWER,
      CalcUtils.calc(className)
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected get canPreview(): boolean {
    return this.isPreviewUsed
      && !this.inProgress
      && !this.isActualSrcAbsent
      && !this.doesErrorExist;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get isPreviewForwardActionDisabled(): boolean {
    return false;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get isPreviewBackActionDisabled(): boolean {
    const previewPage = this.actualOrDefaultPreviewPage;
    return !previewPage || previewPage === this.defaultPage;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get isDecrementPreviewScaleActionDisabled(): boolean {
    return this.nextDecrementPreviewScale < 0;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get isIncrementPreviewScaleActionDisabled(): boolean {
    return false;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get isOpened(): boolean {
    return this.state.opened;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualSrc(): string {
    const {
      defaultScr,
      src,
    } = this.originalProps;

    return src || defaultScr;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualPage(): number {
    return NvlUtils.nvl(this.state.page, this.originalProps.page);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualScale(): number {
    return NvlUtils.nvl(this.state.scale, this.originalProps.scale);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualDegree(): number {
    return NvlUtils.nvl(this.state.degree, this.originalProps.degree);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualPreviewPage(): number {
    return NvlUtils.nvl(this.state.previewPage, this.originalProps.previewPage);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualPreviewScale(): number {
    return NvlUtils.nvl(this.state.previewScale, this.originalProps.previewScale);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualPreviewDegree(): number {
    return NvlUtils.nvl(this.state.previewDegree, this.originalProps.previewDegree);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualOrDefaultPage(): number {
    return NvlUtils.nvl(this.actualPage, this.defaultPage);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualOrDefaultScale(): number {
    return NvlUtils.nvl(this.actualScale, this.defaultScale);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualOrDefaultDegree(): number {
    return NvlUtils.nvl(this.actualDegree, this.defaultDegree);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualOrDefaultPreviewPage(): number {
    return NvlUtils.nvl(this.actualPreviewPage, this.defaultPage);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualOrDefaultPreviewScale(): number {
    return NvlUtils.nvl(this.actualPreviewScale, this.defaultScale);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get actualOrDefaultPreviewDegree(): number {
    return NvlUtils.nvl(this.actualPreviewDegree, this.defaultDegree);
  }

  /**
   * @stable [16.05.2021]
   */
  protected get defaultScale(): number {
    return 1;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get defaultDegree(): number {
    return 0;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get defaultPage(): number {
    return 1;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get defaultScaleDiff(): number {
    return .1;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get defaultDegreeDiff(): number {
    return 90;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get defaultPageDiff(): number {
    return 1;
  }

  /**
   * @stable [16.05.2021]
   */
  private onPreviewDialogClose(): void {
    this.setState(
      {
        opened: false,
        previewDegree: UNDEF,
        previewPage: UNDEF,
        previewScale: UNDEF,
      },
      () => ConditionUtils.ifNotNilThanValue(this.originalProps.onClosePreview, (onClosePreview) => onClosePreview())
    );
  }

  /**
   * @stable [16.05.2021]
   */
  private onPreviewDialogOpen(): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onShowPreview, (onShowPreview) => onShowPreview());
  }

  /**
   * @stable [16.05.2021]
   */
  private onIncrementPreviewScale(): void {
    this.setState({previewScale: this.nextIncrementPreviewScale});
  }

  /**
   * @stable [16.05.2021]
   */
  private onDecrementPreviewScale(): void {
    this.setState({previewScale: this.nextDecrementPreviewScale});
  }

  /**
   * @stable [16.05.2021]
   */
  private onRedoPreviewDegree(): void {
    this.setState({previewDegree: this.nextIncrementPreviewDegree});
  }

  /**
   * @stable [16.05.2021]
   */
  private onUndoPreviewDegree(): void {
    this.setState({previewDegree: this.nextDecrementPreviewDegree});
  }

  /**
   * @stable [16.05.2021]
   */
  private onBack(): void {
    this.setState({previewPage: this.nextDecrementPreviewPage});
  }

  /**
   * @stable [16.05.2021]
   */
  private onForward(): void {
    this.setState({previewPage: this.nextIncrementPreviewPage});
  }

  /**
   * @stable [16.05.2021]
   * @param prevProps
   * @param prevState
   */
  private hasInternalChanges(prevProps: TProps, prevState: TState): boolean {
    return (
      this.hasPageChanges(prevProps, prevState)
      || this.hasScaleChanges(prevProps, prevState)
      || this.hasDegreeChanges(prevProps, prevState)
    );
  }

  /**
   * @stable [16.05.2021]
   * @param prevProps
   * @param prevState
   */
  private hasPageChanges(prevProps: TProps, prevState: TState): boolean {
    return (
      ObjectUtils.isCurrentValueNotEqualPreviousValue(this.originalProps.page, prevProps.page)
      || ObjectUtils.isCurrentValueNotEqualPreviousValue(this.state.page, prevState.page)
    );
  }

  /**
   * @stable [16.05.2021]
   * @param prevProps
   * @param prevState
   */
  private hasDegreeChanges(prevProps: TProps, prevState: TState): boolean {
    return (
      ObjectUtils.isCurrentValueNotEqualPreviousValue(this.originalProps.degree, prevProps.degree)
      || ObjectUtils.isCurrentValueNotEqualPreviousValue(this.state.degree, prevState.degree)
    );
  }

  /**
   * @stable [16.05.2021]
   * @param prevProps
   * @param prevState
   */
  private hasScaleChanges(prevProps: TProps, prevState: TState): boolean {
    return (
      ObjectUtils.isCurrentValueNotEqualPreviousValue(this.originalProps.scale, prevProps.scale)
      || ObjectUtils.isCurrentValueNotEqualPreviousValue(this.state.scale, prevState.scale)
    );
  }

  /**
   * @stable [16.05.2021]
   * @param prevProps
   * @param prevState
   */
  private hasSrcChanges(prevProps: TProps, prevState: TState): boolean {
    return ObjectUtils.isCurrentValueNotEqualPreviousValue(this.originalProps.src, prevProps.src);
  }

  /**
   * @stable [16.05.2021]
   * @param prevProps
   * @param prevState
   */
  private hasInlineDialogBeenClosed(prevProps: TProps, prevState: TState): boolean {
    return this.isPreviewDialogInline && prevState.opened && !this.isOpened;
  }

  /**
   * @stable [16.05.2021]
   */
  private get bodyElement(): JSX.Element {
    const {
      AN_ERROR_OCCURRED_WHILE_LOADING_THE_FILE,
    } = this.settings.messages;

    const Component = this.viewerLocator.resolve(ViewersEnum.PICTURE);

    return this.isInfoElementRendered
      ? (
        <Info
          progress={this.inProgress}
          error={AN_ERROR_OCCURRED_WHILE_LOADING_THE_FILE}/>
      )
      : (
        this.isActualSrcAbsent
          ? <Component/>
          : this.contentElement
      );
  }

  /**
   * @stable [16.05.2021]
   */
  private get previewDialogElement(): JSX.Element {
    const {
      CLOSE,
      PREVIEW,
    } = this.settings.messages;
    const {
      opened,
    } = this.originalProps;
    const previewDialogProps = this.previewDialogProps;

    return this.isOpened && (
      <Dialog
        ref={this.previewDialogRef}
        title={ConditionUtils.orUndef(!opened, () => PREVIEW)}
        closeText={CLOSE}
        {...previewDialogProps}
        className={
          ClsUtils.joinClassName(
            DialogClassesEnum.PREVIEW_DIALOG,
            CalcUtils.calc(previewDialogProps.className)
          )
        }
        acceptable={false}
        closable={!opened}
        extraActions={this.previewExtraActionsElement}
        onActivate={this.onPreviewDialogOpen}
        onDeactivate={this.onPreviewDialogClose}
      >
        {this.previewElement}
      </Dialog>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  private get previewExtraActionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {this.incrementScaleActionElement}
        {this.decrementScaleActionElement}
        {this.redoActionElement}
        {this.undoActionElement}
        {this.previewBackActionElement}
        {this.previewForwardActionElement}
      </React.Fragment>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  private get nextDecrementPreviewScale(): number {
    return this.actualOrDefaultPreviewScale - this.defaultScaleDiff;
  }

  /**
   * @stable [16.05.2021]
   */
  private get nextIncrementPreviewScale(): number {
    return this.actualOrDefaultPreviewScale + this.defaultScaleDiff;
  }

  /**
   * @stable [16.05.2021]
   */
  private get nextDecrementPreviewDegree(): number {
    return this.actualOrDefaultPreviewDegree - this.defaultDegreeDiff;
  }

  /**
   * @stable [16.05.2021]
   */
  private get nextIncrementPreviewDegree(): number {
    return this.actualOrDefaultPreviewDegree + this.defaultDegreeDiff;
  }

  /**
   * @stable [16.05.2021]
   */
  private get nextDecrementPreviewPage(): number {
    return this.actualOrDefaultPreviewPage - this.defaultPageDiff;
  }

  /**
   * @stable [16.05.2021]
   */
  private get nextIncrementPreviewPage(): number {
    return this.actualOrDefaultPreviewPage + this.defaultPageDiff;
  }

  /**
   * @stable [16.05.2021]
   */
  private get isInfoElementRendered(): boolean {
    return this.inProgress || this.doesErrorExist;
  }

  /**
   * @stable [16.05.2021]
   */
  private get isActualSrcAbsent(): boolean {
    return this.isSrcAbsent && this.isDefaultSrcAbsent;
  }

  /**
   * @stable [16.05.2021]
   */
  private get isSrcAbsent(): boolean {
    return R.isNil(this.originalProps.src);
  }

  /**
   * @stable [16.05.2021]
   */
  private get isDefaultSrcAbsent(): boolean {
    return R.isNil(this.originalProps.defaultScr);
  }

  /**
   * @stable [16.05.2021]
   */
  private get inProgress(): boolean {
    return this.state.progress;
  }

  /**
   * @stable [16.05.2021]
   */
  private get isPreviewUsed(): boolean {
    return this.originalProps.usePreview;
  }

  /**
   * @stable [16.05.2021]
   */
  private get doesErrorExist(): boolean {
    return !R.isNil(this.state.error);
  }

  /**
   * @stable [16.05.2021]
   */
  private get isPreviewDialogInline(): boolean {
    return this.previewDialogProps.inline;
  }

  /**
   * @stable [16.05.2021]
   */
  private get previewDialogProps(): IDialogProps {
    return this.mergedProps.previewDialogConfiguration || {};
  }
}
