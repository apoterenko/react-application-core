import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orDefault, orNull } from '../../util';
import { BaseComponent } from '../base';
import { FlexLayout, CenterLayout } from '../layout';
import { IUniversalDialog, Dialog } from '../dialog';
import { IViewerProps, IViewerState } from './viewer.interface';

export abstract class Viewer<TComponent extends Viewer<TComponent, TProps, TState>,
                             TProps extends IViewerProps,
                             TState extends IViewerState>
  extends BaseComponent<TComponent, TProps, IViewerState> {

  /**
   * @stable [08.07.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onPreview = this.onPreview.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.state = {};
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
      <FlexLayout style={props.style}
                  className={toClassName('rac-viewer', this.props.className)}>
        {orDefault<React.ReactNode, React.ReactNode>(
          isErrorExist || isSrcAndDefaultSrcAbsent,
          () => (
            <CenterLayout>{
              this.t(isErrorExist
                ? this.settings.messages.fileLoadErrorMessage
                : this.settings.messages.noFileToShowMessage)
            }</CenterLayout>
          ),
          () => orDefault<React.ReactNode, React.ReactNode>(
            isProgressMessageShown,
            () => this.settings.messages.waitingMessage,
            () => this.getRenderAreaElement()
          ),
        )}
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
              <Dialog ref='dialog'
                      className='rac-preview-dialog'
                      title={this.settings.messages.previewMessage}
                      closeMessage={this.settings.messages.closeMessage}
                      acceptable={false}
                      autoWidth={true}
                      onClose={this.onDialogClose}>
                {
                  orNull<JSX.Element>(
                    state.opened,
                    () => this.gePreviewElement()
                  )
                }
              </Dialog>
            )
          )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [08.07.2018]
   */
  protected refresh(): void {
    // Nothing to do
  }

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected abstract getRenderAreaElement(): JSX.Element;

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

    const dialog = this.refs.dialog as IUniversalDialog;
    dialog.activate();
  }
}
