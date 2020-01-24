import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { noop, toClassName } from '../../util';
import { ISnackbarProps } from './snackbar.interface';
import { BaseComponent } from '../base/base.component';

export class Snackbar extends BaseComponent<ISnackbarProps> {

  public static defaultProps: ISnackbarProps = {
    timeout: 3000,
    actionHandler: noop,
    submitText: 'Close',
  };

  /**
   * @stable [22.08.2018]
   * @returns {JSX.Element}
   */
  public render(): React.ReactNode {
    return ReactDOM.createPortal(
      <div ref={this.selfRef}
           className={toClassName(this.uiFactory.snackbar, 'rac-snackbar')}
           aria-live='assertive'>
        <div className={toClassName(this.uiFactory.snackbarText, 'rac-snackbar-text')}/>
        <div className={toClassName(this.uiFactory.snackbarActionWrapper, 'rac-snackbar-action-wrapper')}>
          <button className={toClassName('rac-snackbar-button', this.uiFactory.snackbarActionButton)}/>
        </div>
      </div>,
      this.domAccessor.documentBody
    );
  }
}
