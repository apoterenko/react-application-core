import * as React from 'react';

import { joinClassName, calc } from '../../util';
import { BaseComponent } from '../base';
import { IThumbProps } from './thumb.interface';

export class Thumb extends BaseComponent<IThumbProps> {

  /**
   * @stable [03.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {disabled, value} = props;
    return (
      <div className={joinClassName(
        calc(props.className),
        'rac-thumb',
        disabled ? 'rac-thumb-disabled' : 'rac-thumb-enabled',
        value ? 'rac-thumb-checked' : 'rac-thumb-unchecked'
      )}/>
    );
  }
}
