import * as React from 'react';

import { IDrawerProps } from './drawer.interface';
import { toClassName } from '../../util';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';

export class Drawer extends BaseComponent<Drawer, IDrawerProps> {

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
