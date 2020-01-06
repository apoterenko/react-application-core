import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orNull } from '../../util';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout/flex';
import { Dialog } from '../dialog';
import { IDialog } from '../../definition';
import { IViewerProps, IViewerState } from './viewer.interface';
import { PictureViewer } from '../viewer';

export abstract class Viewer<TProps extends IViewerProps = IViewerProps,
                             TState extends IViewerState = IViewerState>
  extends BaseComponent<TProps, TState> {

  /**
   * @stable [08.07.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onPreview = this.onPreview.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.state = {} as TState;
  }

  /**
   * @stable [08.07.2018]
   * @param {TProps} props
   * @param {TState} state
   */
  public componentDidUpdate(props: TProps, state: TState): void {
    super.componentDidUpdate(props, state);

    const currentProps = this.props;
    if (!R.equals(currentProps.src, props.src)) {
      this.refresh();
    }
  }

  /**
   * @stable [08.07.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    this.refresh();
  }

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const state = this.state;
    const props = this.props;
    const isErrorExist = !R.isNil(state.error);
    const isSrcAbsent = R.isNil(props.src);
    const isDefaultSrcAbsent = R.isNil(props.defaultScr);
    const isSrcAndDefaultSrcAbsent = isSrcAbsent && isDefaultSrcAbsent;
    const isProgressMessageShown = this.isProgressMessageShown;
    const canShowPreview = props.usePreview && !isSrcAbsent && !isProgressMessageShown && !isSrcAndDefaultSrcAbsent && !isErrorExist;

    return (
      <FlexLayout
        style={props.style}
        full={props.full}
        className={this.getClassName()}
      >
        {
          isErrorExist || isSrcAndDefaultSrcAbsent
            ? (
              isErrorExist
                ? (
                  <FlexLayout
                    justifyContentCenter={true}
                    alignItemsCenter={true}>{
                    this.t(this.settings.messages.fileLoadErrorMessage)
                  }</FlexLayout>
                )
                : <PictureViewer/>
            )
            : (isProgressMessageShown ? this.settings.messages.waitingMessage : this.getContentElement())
        }
        {
          orNull<JSX.Element>(
            canShowPreview,
            () => (
              this.uiFactory.makeIcon({
                type: 'search_plus',
                className: 'rac-preview-action-icon rac-absolute-center-position',
                onClick: this.onPreview,
              })
            )
          )
        }
        {
          orNull<JSX.Element>(
            canShowPreview,
            () => (
              <Dialog
                ref='dialog'
                className='rac-preview-dialog'
                title={this.settings.messages.previewMessage}
                closeMessage={this.settings.messages.closeMessage}
                acceptable={false}
                onClose={this.onDialogClose}>
                {orNull(state.opened, () => this.gePreviewElement())}
              </Dialog>
            )
          )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [10.01.2019]
   * @returns {string}
   */
  protected getClassName(): string {
    return toClassName('rac-viewer', this.props.className);
  }

  /**
   * @stable [08.07.2018]
   */
  protected refresh(): void {
    // Do nothing
  }

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected abstract getContentElement(): JSX.Element;

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected abstract gePreviewElement(): JSX.Element;

  /**
   * @stable [08.07.2018]
   * @returns {boolean}
   */
  protected get isProgressMessageShown(): boolean {
    return false;
  }

  /**
   * @stable [08.07.2018]
   */
  protected onDialogClose(): void {
    this.setState({opened: false});
  }

  /**
   * @stable [08.07.2018]
   */
  private onPreview(): void {
    this.setState({opened: true});

    const dialog = this.refs.dialog as IDialog;
    dialog.activate();
  }
}
