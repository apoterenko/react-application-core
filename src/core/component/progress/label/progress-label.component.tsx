import * as React from 'react';

import { BaseComponent } from '../../base';
import { IProgressLabelProps } from './progress-label.interface';

export class ProgressLabel extends BaseComponent<ProgressLabel, IProgressLabelProps> {

  /**
   * @stable - 08.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <span className={props.className}>
        {this.uiFactory.makeIcon({ type: 'timelapse', className: 'rac-loading-icon' })}
        {
          <span className='rac-loading-message'>
            {this.t(props.progressMessage || this.settings.messages.waitMessage)}
          </span>
        }
      </span>
    );
  }
}
