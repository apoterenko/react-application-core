import * as React from 'react';
import { MDCDialog } from '@material/dialog';

import { MaterialComponent } from '../../component/material';
import { Button } from '../../component/button';
import { isUndef, orNull } from '../../util';
import {
  IDialog,
  IDialogInternalProps,
  INativeMaterialDialogComponent,
} from './dialog.interface';

export class Dialog<TComponent extends IDialog<TInternalProps>,
                    TInternalProps extends IDialogInternalProps>
    extends MaterialComponent<TComponent,
                              TInternalProps,
                              {},
                              INativeMaterialDialogComponent>
    implements IDialog<TInternalProps> {

  constructor(props: TInternalProps) {
    super(props, MDCDialog);
    this.onAccept = this.onAccept.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (this.canAccept) {
      this.nativeMdcInstance.listen('MDCDialog:accept', this.onAccept);
    }
    if (this.canClose) {
      this.nativeMdcInstance.listen('MDCDialog:cancel', this.onClose);
    }
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();

    if (this.canAccept) {
      this.nativeMdcInstance.unlisten('MDCDialog:accept', this.onAccept);
    }
    if (this.canClose) {
      this.nativeMdcInstance.unlisten('MDCDialog:cancel', this.onClose);
    }
  }

  public render(): JSX.Element {
    const props = this.props;

    return (
        <aside ref='self'
               className='mdc-dialog'
               role='alertdialog'>
          <div className='mdc-dialog__surface'>
            <header className='mdc-dialog__header'>
              <h2 className='mdc-dialog__header__title'>
                {this.t(props.title || 'Notice')}
              </h2>
            </header>
            {
              orNull(
                props.children || !isUndef(props.message),
                <section className='mdc-dialog__body'>
                  {props.children || this.t(props.message)}
                </section>
              )
            }
            <footer className='mdc-dialog__footer'>
              {
                orNull(
                  this.canClose,
                  <Button disabled={props.closeDisabled}
                          className='mdc-dialog__footer__button mdc-dialog__footer__button--cancel'>
                    {this.t(props.closeMessage || 'Decline')}
                  </Button>
                )
              }
              {
                orNull(this.canAccept,
                    <Button disabled={props.acceptDisabled}
                            className='mdc-dialog__footer__button mdc-dialog__footer__button--accept'>
                      {this.t(props.acceptMessage || 'Accept')}
                    </Button>
                )
              }
            </footer>
          </div>
          <div className='mdc-dialog__backdrop'/>
        </aside>
    );
  }

  public activate(): void {
    this.nativeMdcInstance.show();
  }

  protected onAccept(): void {
    if (this.props.onAccept) {
      this.props.onAccept();
    }
  }

  protected onClose(): void {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  private get canAccept(): boolean {
    return this.props.canAccept !== false;
  }

  private get canClose(): boolean {
    return this.props.canClose !== false;
  }
}
