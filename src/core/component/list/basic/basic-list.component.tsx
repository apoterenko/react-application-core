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
   * @stable [17.08.2020]
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      className,
    } = originalProps;

    return (
      <ul
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            ListClassesEnum.LIST,
            WrapperUtils.isFull(originalProps) && ListClassesEnum.FULL_LIST,
            CalcUtils.calc(className)
          )
        }
      >
        {this.originalChildren}
      </ul>
    );
  }

  /**
   * @stable [17.08.2020]
   */
  protected get componentsSettingsProps(): IBasicListProps {
    return this.componentsSettings.basicList;
  }
}
