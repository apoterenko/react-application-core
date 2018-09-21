import * as React from 'react';

import { noop, toClassName } from '../../util';
import { Button } from '../../component/button';

import { ISnackbarProps } from './snackbar.interface';
import { BaseComponent } from '../base';

export class Snackbar extends BaseComponent<Snackbar, ISnackbarProps> {

  public static defaultProps: ISnackbarProps = {
    timeout: 3000,
    actionHandler: noop,
    actionText: 'Close',
  };

  /**
   * @stable [22.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div ref='self'
           className={toClassName(this.uiFactory.snackbar, 'rac-snackbar')}
           aria-live='assertive'>
        <div className={toClassName(this.uiFactory.snackbarText, 'rac-snackbar-text')}/>
        <div className={toClassName(this.uiFactory.snackbarActionWrapper, 'rac-snackbar-action-wrapper')}>
          <Button className={toClassName(this.uiFactory.snackbarActionButton)}/>
        </div>
      </div>
    );
  }
}
