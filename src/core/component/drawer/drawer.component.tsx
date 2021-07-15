import * as React from 'react';

import {
  ClsUtils,
  PropsUtils,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import {
  DrawerClassesEnum,
  IDrawerProps,
} from '../../definition';

/**
 * @component-impl
 * @stable [15.07.2021]
 */
export class Drawer extends GenericComponent<IDrawerProps> {

  /**
   * @stable [15.07.2021]
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      mini,
    } = mergedProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            DrawerClassesEnum.DRAWER,
            mini && DrawerClassesEnum.DRAWER_MINI,
            this.getOriginalClassName(mergedProps)
          )}
      >
        {this.originalChildren}
      </div>
    );
  }

  /**
   * @stable [15.07.2021]
   */
  protected getComponentSettingsProps(): Readonly<IDrawerProps> {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.drawer
    );
  }
}
