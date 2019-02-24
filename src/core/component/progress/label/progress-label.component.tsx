import * as React from 'react';

import { BaseComponent } from '../../base';
import { IProgressLabelProps } from './progress-label.interface';
import { FlexLayout } from '../../layout';

export class ProgressLabel extends BaseComponent<IProgressLabelProps> {

  /**
   * @stable [26.12.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout full={false}
                  row={true}
                  alignItemsCenter={true}
                  className={props.className}>
        <FlexLayout full={false}
                    justifyContentCenter={true}>
          {this.uiFactory.makeIcon({ type: 'spinner', className: 'rac-loading-icon' })}
        </FlexLayout>
        {
          <FlexLayout className='rac-loading-message'>
            {this.t(props.progressMessage || this.settings.messages.waitMessage)}
          </FlexLayout>
        }
      </FlexLayout>
    );
  }
}
