import * as React from 'react';

import { BaseComponent, IBaseComponentInternalProps } from '../../../component/base';

export class ProgressLabel extends BaseComponent<ProgressLabel, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    return (
      <span className={this.props.className}>
        {
          this.uiFactory.makeIcon({ type: 'timelapse', className: 'rac-loading-icon' })
        }
        {
          <span className='rac-loading-message'>
            {this.t(this.props.progressMessage || this.applicationSettings.messages.waitMessage)}
          </span>
        }
      </span>
    );
  }
}
