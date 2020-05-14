import * as React from 'react';

import {
  calc,
  joinClassName,
  mergeWithSystemProps,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import {
  DrawerClassesEnum,
  IDrawerProps,
} from '../../definition';

export class Drawer extends GenericComponent<IDrawerProps> {

  /**
   * @stable [23.12.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;

    return (
      <div
        ref={this.actualRef}
        className={
          joinClassName(
            DrawerClassesEnum.DRAWER,
            mergedProps.mini && DrawerClassesEnum.DRAWER_MINI,
            calc(mergedProps.className)
          )}
      >
        {this.props.children}
      </div>
    );
  }

  /**
   * @stable [14.05.2020]
   * @returns {IDrawerProps}
   */
  private get mergedProps(): IDrawerProps {
    return mergeWithSystemProps(this.props, this.settings.components.drawer);
  }
}
