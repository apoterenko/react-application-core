import * as React from 'react';
import { Drawer } from 'native-base';

import { UniversalComponent } from '../base/universal.component';
import {
  IRnNativeDrawer,
  IRnDrawerProps,
  IRnDrawer,
} from './rn-drawer.interface';

export class RnDrawer extends UniversalComponent<RnDrawer, IRnDrawerProps>
  implements IRnDrawer {

  private drawer: IRnNativeDrawer;

  /**
   * @stable [27.04.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <Drawer
        ref={(ref) => (this.drawer = ref as IRnNativeDrawer)}
        panCloseMask={0.8}
        content={props.content}>
        {props.children}
      </Drawer>
    );
  }

  /**
   * @stable [27.04.2018]
   */
  public open(): void {
    this.drawer._root.open();
  }

  /**
   * @stable [27.04.2018]
   */
  public close(): void {
    this.drawer._root.close();
  }
}
