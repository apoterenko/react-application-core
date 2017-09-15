import { MDCSnackbar } from '@material/snackbar';
import * as React from 'react';

import { AnyT } from 'core/definition.interface';
import { noop } from 'core/util';
import { MaterialComponent } from 'core/component/material';
import { Button } from 'core/component/button';

import {
  INativeMaterialSnackbarComponent,
  IMaterialSnackbarComponentOptions,
  ISnackbarInternalProps,
} from './snackbar.interface';

export class Snackbar extends MaterialComponent<Snackbar,
                                                ISnackbarInternalProps,
                                                {},
                                                INativeMaterialSnackbarComponent> {

  public static defaultProps: ISnackbarInternalProps = {
    timeout: 3000,
    actionHandler: () => noop,
    actionText: 'Close',
  };

  constructor(props: ISnackbarInternalProps) {
    super(props, MDCSnackbar);
  }

  public componentWillReceiveProps(nextProps: Readonly<ISnackbarInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    const message = nextProps.message;
    if (message) {
      this.show({message});

      if (this.props.afterShow) {
        this.props.afterShow();
      }
    }
  }

  public render(): JSX.Element {
    return (
        <div ref='self'
             className='mdc-snackbar'
             aria-live='assertive'>
          <div className='mdc-snackbar__text'/>
          <div className='mdc-snackbar__action-wrapper'>
            <Button className='mdc-snackbar__action-button'/>
          </div>
        </div>
    );
  }

  public show(options: IMaterialSnackbarComponentOptions): void {
    this.nativeMdcInstance.show({
      timeout: this.props.timeout,
      actionText: this.t(this.props.actionText),
      actionHandler: this.props.actionHandler,
      ...options,
    });
  }
}
