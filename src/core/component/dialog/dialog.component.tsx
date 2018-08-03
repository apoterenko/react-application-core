import * as React from 'react';
import * as R from 'ramda';

import { Button } from '../button';
import { orNull, toClassName } from '../../util';
import { BaseComponent } from '../base';
import {
  IUniversalDialog,
  IDialogProps,
} from './dialog.interface';

export class Dialog<TComponent extends IUniversalDialog<TProps, TState> = IUniversalDialog<TProps, TState>,
                    TProps extends IDialogProps = IDialogProps,
                    TState = {}>
  extends BaseComponent<TComponent, TProps, TState>
  implements IUniversalDialog<TProps, TState> {

  /**
   * @stable [03.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <aside ref='self'
             className={toClassName('rac-dialog', props.className, this.uiFactory.dialog)}>
        {this.getDialogBody()}
        <div className={this.uiFactory.dialogBackdrop}/>
      </aside>
    );
  }

  /**
   * @stable [17.05.2018]
   */
  public activate(callback?: () => void): void {
    // Each plugin must override this method
  }

  /**
   * @stable [02.08.2018]
   */
  public isOpen(): boolean {
    // Each plugin must override this method
    return false;
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
   * @stable [30.06.2018]
   * @returns {JSX.Element}
   */
  protected getDialogBody(): JSX.Element {
    const props = this.props;
    const dialogBodyEl = this.getDialogBodyElement();
    return (
      <div className={toClassName(
                        'rac-dialog-surface',
                        this.uiFactory.dialogSurface,
                        props.autoWidth && 'rac-dialog-surface-auto-width'
                      )}>
        <header className={toClassName('rac-dialog-header', this.uiFactory.dialogHeader)}>
          <h2 className={toClassName('rac-dialog-header-title', this.uiFactory.dialogHeaderTitle)}>
            {this.t(props.title || this.settings.messages.dialogTitleMessage)}
          </h2>
        </header>
        {
          orNull<React.ReactNode>(
            !R.isNil(dialogBodyEl) || !R.isNil(props.message),
            <section className={toClassName('rac-dialog-body', this.uiFactory.dialogBody)}>
              {dialogBodyEl || this.t(props.message)}
            </section>
          )
        }
        {
          orNull<JSX.Element>(
            this.closable || this.acceptable,
            () => (
              <footer className={this.uiFactory.dialogFooter}>
                {
                  orNull<JSX.Element>(
                    this.closable,
                    () => (
                      <Button disabled={this.isCloseButtonDisabled()}
                              className={toClassName(this.uiFactory.dialogFooterButton,
                                                     this.uiFactory.dialogFooterButtonCancel)}>
                        {this.t(props.closeMessage || this.settings.messages.dialogCancelMessage)}
                      </Button>
                    )
                  )
                }
                {
                  orNull<JSX.Element>(
                    this.acceptable,
                    () => (
                      <Button disabled={this.isAcceptButtonDisabled()}
                              className={toClassName(this.uiFactory.dialogFooterButton,
                                                     this.uiFactory.dialogFooterButtonAccept)}>
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
}
