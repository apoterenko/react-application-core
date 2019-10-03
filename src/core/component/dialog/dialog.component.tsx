import * as React from 'react';

import { BaseComponent } from '../base';
import { Button } from '../button';
import { FlexLayout } from '../layout';
import { IUniversalDialog2, IDialogProps, IUniversalDialogProps } from './dialog.interface';
import { orNull, toClassName, isFn } from '../../util';
import { Title } from '../title';

export class Dialog<TProps extends IDialogProps = IDialogProps,
                    TState = {}>
  extends BaseComponent<TProps, TState>
  implements IUniversalDialog2<TProps, TState> {

  /**
   * @stable [04.10.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  /**
   * @stable [03.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div
        ref={this.selfRef}
        className={this.getDialogClassName()}>
        {this.dialogBodyElement}
        {this.isDialogVisible() && (
          <div className={toClassName('rac-dialog-scrim', this.uiFactory.dialogScrim)}/>
        )}
      </div>
    );
  }

  /**
   * @stable [19.06.2019]
   */
  public activate(): void {
    // Each plugin must override this method
  }

  /**
   * @stable [17.05.2018]
   */
  public onAccept(): void {
    const props = this.props;
    if (props.onAccept) {
      props.onAccept();
    }
  }

  /**
   * @stable [17.06.2019]
   */
  public onClose(): void {
    const props = this.props;
    if (props.onClose) {
      props.onClose();
    }
  }

  /**
   * @stable [19.06.2019]
   */
  public onDeactivate(): void {
    const props = this.props;
    if (isFn(props.onDeactivate)) {
      props.onDeactivate();
    }
  }

  /**
   * @stable [17.05.2018]
   * @returns {boolean}
   */
  public get acceptable(): boolean {
    return this.props.acceptable !== false;
  }

  /**
   * @stable [17.05.2018]
   * @returns {boolean}
   */
  public get closable(): boolean {
    return this.props.closable !== false;
  }

  /**
   * @stable [05.08.2018]
   * @returns {string}
   */
  protected getDialogClassName(): string {
    return toClassName(
      'rac-dialog',
      this.props.className,
      this.uiFactory.dialog,
      !this.isDialogVisible() && 'rac-invisible'
    );
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  protected isCloseButtonDisabled(): boolean {
    return this.props.closeDisabled;
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  protected isAcceptButtonDisabled(): boolean {
    return this.props.acceptDisabled;
  }

  /**
   * @stable [04.08.2018]
   * @returns {boolean}
   */
  protected isDialogVisible(): boolean {
    return true;
  }

  /**
   * @stable [17.06.2019]
   * @returns {JSX.Element}
   */
  private get dialogBodyElement(): JSX.Element {
    return (
      <FlexLayout
        className={toClassName('rac-dialog-body', this.uiFactory.dialogContainer)}>
        {this.bodyElement}
        {this.footerElement}
      </FlexLayout>
    );
  }

  /**
   * @stable [17.06.2019]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const props = this.props;
    return (
      <React.Fragment>
        {
          props.title && (
            <Title>
              {this.t(props.title)}
            </Title>
          )
        }
        {
          props.children && (
            <FlexLayout className='rac-dialog-body-content'>
              {props.children}
            </FlexLayout>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [24.03.2019]
   * @returns {JSX.Element}
   */
  private get footerElement(): JSX.Element {
    const props = this.props;
    return (
      orNull(
        this.closable || this.acceptable,
        () => (
          <FlexLayout
            row={true}
            full={false}
            className='rac-dialog-footer-actions'
          >
            {
              orNull(
                this.closable,
                () => (
                  <Button
                    icon='close'
                    full={true}
                    disabled={this.isCloseButtonDisabled()}
                    onClick={this.onClose}>
                    {this.t(props.closeMessage || this.settings.messages.dialogCancelMessage)}
                  </Button>
                )
              )
            }
            {
              orNull<JSX.Element>(
                this.acceptable,
                () => (
                  <Button
                    icon='ok-filled'
                    full={true}
                    raised={true}
                    disabled={this.isAcceptButtonDisabled()}
                    onClick={this.onAccept}>
                    {this.t(props.acceptMessage || this.settings.messages.dialogAcceptMessage)}
                  </Button>
                )
              )
            }
          </FlexLayout>
        )
      )
    );
  }
}
