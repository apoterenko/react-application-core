import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
} from '../../util';
import { GenericBaseComponent } from '../base/generic-base.component';
import {
  DrawerClassesEnum,
  IDrawerProps,
} from '../../definition';

/**
 * @component-impl
 * @stable [29.05.2020]
 */
export class Drawer extends GenericBaseComponent<IDrawerProps> {

  /**
   * @stable [29.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
      mini,
    } = this.mergedProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            DrawerClassesEnum.DRAWER,
            mini && DrawerClassesEnum.DRAWER_MINI,
            CalcUtils.calc(className)
          )}
      >
        {this.props.children}
      </div>
    );
  }

  /**
   * @stable [02.06.2020]
   * @returns {IDrawerProps}
   */
  protected get settingsProps(): IDrawerProps {
    return this.componentsSettings.drawer;
  }
}
