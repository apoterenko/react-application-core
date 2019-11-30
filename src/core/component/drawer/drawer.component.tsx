import * as React from 'react';

import { IDrawerProps } from './drawer.interface';
import { toClassName } from '../../util';
import { BaseComponent } from '../base/base.component';
import { FlexLayout } from '../layout/flex';

export class Drawer extends BaseComponent<IDrawerProps> {

  /**
   * @stable [17.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const mini = props.mini;
    return (
      <FlexLayout className={toClassName('rac-drawer', mini && 'rac-drawer-mini')}
                  full={false}>
        {props.children}
      </FlexLayout>
    );
  }
}
