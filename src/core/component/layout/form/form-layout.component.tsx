import * as React from 'react';

import {
  calc,
  joinClassName,
} from '../../../util';
import { BaseComponent } from '../../base/base.component';
import { IFormLayoutProps } from '../../../definition';

export class FormLayout extends BaseComponent<IFormLayoutProps> {

  /**
   * @stable [13.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <div className={joinClassName(calc(props.className), 'rac-form-layout')}>
        <div className='rac-form-layout__content'>
          {
            props.topTitle && (
              <div className='rac-form-layout__top-header'>
                {this.t(props.topTitle)}
              </div>
            )
          }
          {props.children}
        </div>
      </div>
    );
  }
}
