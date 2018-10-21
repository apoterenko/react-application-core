import * as React from 'react';
import * as R from 'ramda';

import { Button } from '../button';
import { orNull, toClassName, calc } from '../../util';
import { BaseComponent } from '../base';
import { IUniversalDialog, IDialogProps, IUniversalDialogProps } from './dialog.interface';

export class Dialog<TComponent extends IUniversalDialog<TProps, TState> = IUniversalDialog<TProps, TState>,
                    TProps extends IDialogProps = IDialogProps,
                    TState = {}>
  extends BaseComponent<TComponent, TProps, TState>
  implements IUniversalDialog<TProps, TState> {

  public static readonly defaultProps: IUniversalDialogProps = {
    autoWidth: true,
  };

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
    const props = this.props;

    return (
      <div ref='self'
           className={this.getDialogClassName()}>
        {this.getDialogBody()}
        <div className={this.uiFactory.dialogScrim}/>
      </div>
    );
  }

  /**
   * @stable [17.05.2018]
   */
  public activate(callback?: () => void): void {
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
   * @stable [17.05.2018]
   */
  public onClose(): void {
    const props = this.props;
    if (props.onClose) {
      props.onClose();
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
   * @stable [04.10.2018]
   * @returns {JSX.Element}
   */
  protected getDialogBody(): JSX.Element {
    const props = this.props;
    const dialogBodyEl = this.getDialogBodyElement();
    return (
      <div className={toClassName(
                          'rac-dialog-container',
                          this.uiFactory.dialogContainer,
                          props.autoWidth && 'rac-dialog-container-auto-width'
                      )}>
        <div className={this.uiFactory.dialogSurface}>
          <h2 className={toClassName('rac-dialog-title', this.uiFactory.dialogTitle)}>
            {this.t(props.title || this.settings.messages.dialogTitleMessage)}
          </h2>
          {
            orNull<React.ReactNode>(
              !R.isNil(dialogBodyEl) || !R.isNil(props.message),
              <div className={toClassName('rac-dialog-content', this.uiFactory.dialogContent)}>
                {dialogBodyEl || this.t(props.message)}
              </div>
            )
          }
          {
            orNull<JSX.Element>(
              this.closable || this.acceptable,
              () => (
                <footer className={this.uiFactory.dialogActions}>
                  {
                    orNull<JSX.Element>(
                      this.closable,
                      () => (
                        <Button icon={null}
                                disabled={this.isCloseButtonDisabled()}
                                className={toClassName(this.uiFactory.dialogFooterButton,
                                  this.uiFactory.dialogFooterButtonCancel)}
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
                        <Button icon={null}
                                disabled={this.isAcceptButtonDisabled()}
                                className={toClassName(this.uiFactory.dialogFooterButton,
                                  this.uiFactory.dialogFooterButtonAccept)}
                                onClick={this.onAccept}>
                          {this.t(props.acceptMessage || this.settings.messages.dialogAcceptMessage)}
                        </Button>
                      )
                    )
                  }
                </footer>
              )
            )
          }
        </div>
      </div>
    );
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
   * @stable [03.08.2018]
   * @returns {React.ReactNode}
   */
  protected getDialogBodyElement(): React.ReactNode {
    return this.props.children;
  }

  /**
   * @stable [04.08.2018]
   * @returns {boolean}
   */
  protected isDialogVisible(): boolean {
    return true;
  }
}
