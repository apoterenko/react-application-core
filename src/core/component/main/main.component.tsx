import * as React from 'react';

import { toClassName } from '../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../base';

export class Main extends BaseComponent<Main, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;
    return (
        <main className='rac-main rac-flex-full'>
          <div className={toClassName(
                              'rac-main-body',
                              'rac-flex',
                              'rac-flex-column',
                              props.className
                          )}>
            {props.children}
          </div>
        </main>
    );
  }
}
