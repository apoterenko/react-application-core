import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  WrapperUtils,
} from '../../../util';
import {
  IBasicListProps,
  ListClassesEnum,
} from '../../../definition';
import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';

/**
 * @component-impl
 * @stable [11.06.2020]
 */
export class BasicList extends EnhancedGenericComponent<IBasicListProps> {

  /**
   * @stable [04.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      className,
    } = mergedProps;

    return (
      <ul
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            ListClassesEnum.LIST,
            WrapperUtils.isFull(mergedProps) && ListClassesEnum.FULL_LIST,
            CalcUtils.calc(className)
          )
        }
      >
        {this.props.children}
      </ul>
    );
  }

  /**
   * @stable [11.06.2020]
   * @returns {IBasicListProps}
   */
  protected get componentsSettingsProps(): IBasicListProps {
    return this.componentsSettings.basicList;
  }
}
