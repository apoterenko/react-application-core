import * as React from 'react';

import { toClassName } from '../../util';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';

export class Main extends BaseComponent<Main> {

  /**
   * @stable [12.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div className={toClassName('rac-main', props.className)}>
        <div className='rac-main-body-wrapper'>
          <FlexLayout className='rac-main-body'>
            {props.children}
          </FlexLayout>
        </div>
      </div>
    );
  }
}
