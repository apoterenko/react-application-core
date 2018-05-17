import * as React from 'react';
import * as R from 'ramda';

import { Button } from '../button';
import { orNull, toClassName } from '../../util';
import { BaseComponent } from '../base';
import {
  IUniversalDialog,
  IUniversalDialogProps,
} from './dialog.interface';

export class Dialog<TComponent extends IUniversalDialog<TProps> = IUniversalDialog<TProps>,
                    TProps extends IUniversalDialogProps = IUniversalDialogProps>
  extends BaseComponent<TComponent, TProps>
  implements IUniversalDialog<TProps> {

  /**
   * @stable [17.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <aside ref='self'
             className={this.uiFactory.dialog}>
        <div className={this.uiFactory.dialogSurface}>
          <header className={this.uiFactory.dialogHeader}>
            <h2 className={this.uiFactory.dialogHeaderTitle}>
              {this.t(props.title || this.settings.messages.dialogTitleMessage)}
            </h2>
          </header>
          {
            orNull(
              !R.isNil(props.children) || !R.isNil(props.message),
              <section className={this.uiFactory.dialogBody}>
                {props.children || this.t(props.message)}
              </section>
            )
          }
          <footer className={this.uiFactory.dialogFooter}>
            {
              orNull(
                this.closable,
                <Button disabled={props.closeDisabled}
                        className={toClassName(this.uiFactory.dialogFooterButton,
                                               this.uiFactory.dialogFooterButtonCancel)}>
                  {this.t(props.closeMessage || this.settings.messages.dialogCancelMessage)}
                </Button>
              )
            }
            {
              orNull(
                this.acceptable,
                <Button disabled={props.acceptDisabled}
                        className={toClassName(this.uiFactory.dialogFooterButton,
                                               this.uiFactory.dialogFooterButtonAccept)}>
                  {this.t(props.acceptMessage || this.settings.messages.dialogAcceptMessage)}
                </Button>
              )
            }
          </footer>
        </div>
        <div className={this.uiFactory.dialogBackdrop}/>
      </aside>
    );
  }

  /**
   * @stable [17.05.2018]
   */
  public activate(): void {
    // Each plugin must implement this method
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
}
