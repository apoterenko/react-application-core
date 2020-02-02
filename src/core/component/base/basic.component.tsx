import * as React from 'react';

import { BaseComponent } from './base.component';
import { calc } from '../../util';

export class BasicComponent extends BaseComponent {

  /**
   * @stable [29.12.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div
        ref={this.selfRef}
        className={calc(props.className)}>
        {props.children}
      </div>
    );
  }
}
