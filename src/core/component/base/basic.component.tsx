import * as React from 'react';

import { CalcUtils } from '../../util';
import { EnhancedGenericComponent } from './enhanced-generic.component';

export class BasicComponent extends EnhancedGenericComponent {

  /**
   * @stable [05.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      className,
      style,
    } = originalProps;

    return (
      <div
        ref={this.actualRef}
        style={style}
        className={CalcUtils.calc(className)}
      >
        {this.originalChildren}
      </div>
    );
  }
}
