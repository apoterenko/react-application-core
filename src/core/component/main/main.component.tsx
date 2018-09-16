import * as React from 'react';

import { toClassName } from '../../util';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';

export class Main extends BaseComponent<Main> {

  /**
   * @stable [16.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
        <main className={toClassName(
                          'rac-main',
                          'rac-flex',
                          'rac-flex-column',
                          'rac-flex-full',
                          props.className
                        )}>
          <FlexLayout className='rac-main-body-wrapper'>
            <FlexLayout className='rac-main-body'>
              {props.children}
            </FlexLayout>
          </FlexLayout>
        </main>
    );
  }
}
