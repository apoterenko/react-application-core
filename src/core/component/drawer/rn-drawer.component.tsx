import * as React from 'react';
import { Drawer } from 'react-native-drawer';

import { UniversalComponent } from '../base/universal.component';
import {
  IRnNativeDrawer,
  IRnDrawerProps,
  IRnDrawer,
} from './rn-drawer.interface';

export class RnDrawer extends UniversalComponent<IRnDrawerProps>
  implements IRnDrawer {

  private drawer: IRnNativeDrawer;

  /**
   * @stable [27.04.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    // A drawer is based on https://github.com/root-two/react-native-drawer.
    // See the docs for more details.
    return (
      <Drawer
        ref={(ref) => (this.drawer = ref as IRnNativeDrawer)}
        panCloseMask={0.8}
        captureGestures={false}
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
