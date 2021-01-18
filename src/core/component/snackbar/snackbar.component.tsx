import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FnUtils, joinClassName } from '../../util';
import { ISnackbarProps } from './snackbar.interface';
import { EnhancedGenericComponent } from '../base/enhanced-generic.component';

export class Snackbar extends EnhancedGenericComponent<ISnackbarProps> {

  public static defaultProps: ISnackbarProps = {
    timeout: 3000,
    actionHandler: FnUtils.noop,
    submitText: 'Close',
  };

  /**
   * @stable [22.08.2018]
   * @returns {JSX.Element}
   */
  public render(): React.ReactNode {
    return ReactDOM.createPortal(
      <div ref={this.selfRef}
           className={joinClassName('mdc-snackbar', 'rac-snackbar')}
           aria-live='assertive'>
        <div className={joinClassName('mdc-snackbar__text', 'rac-snackbar-text')}/>
        <div className={joinClassName('mdc-snackbar__action-wrapper', 'rac-snackbar-action-wrapper')}>
          <button className={joinClassName('rac-snackbar-button', 'mdc-snackbar__action-button')}/>
        </div>
      </div>,
      this.domAccessor.documentBody
    );
  }
}
