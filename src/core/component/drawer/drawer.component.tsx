import * as React from 'react';

import { IDrawerProps } from './drawer.interface';
import {
  calc,
  joinClassName,
} from '../../util';
import { BaseComponent } from '../base/base.component';

export class Drawer extends BaseComponent<IDrawerProps> {

  /**
   * @stable [23.12.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const mini = props.mini;
    return (
      <div
        className={joinClassName(
          'rac-drawer',
          mini && 'rac-drawer-mini',
          calc(props.className)
        )}>
        {props.children}
      </div>
    );
  }
}
