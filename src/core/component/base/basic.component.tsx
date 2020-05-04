import * as React from 'react';

import { calc } from '../../util';
import { EnhancedGenericComponent } from './enhanced-generic.component';

export class BasicComponent extends EnhancedGenericComponent {

  /**
   * @stable [05.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div
        ref={this.actualRef}
        style={props.style}
        className={calc(props.className)}
      >
        {props.children}
      </div>
    );
  }
}
