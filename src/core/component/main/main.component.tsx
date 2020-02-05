import * as React from 'react';

import { IMainProps } from '../../definition';
import { BaseComponent } from '../base/base.component';
import {
  calc,
  joinClassName,
} from '../../util';

export class Main extends BaseComponent<IMainProps> {

  /**
   * @stable [05.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div
        className={joinClassName('rac-main', calc(props.className))}>
        <div
          ref={this.selfRef}
          className='rac-main__body'
        >
          <div className='rac-main__body-content'>
            {props.children}
          </div>
        </div>
      </div>
    );
  }
}
