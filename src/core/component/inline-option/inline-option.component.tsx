import * as React from 'react';

import { GenericBaseComponent } from '../base';
import {
  IInlineOptionProps,
  InlineOptionClassesEnum,
} from '../../definition';
import {
  CalcUtils,
  ClsUtils,
} from '../../util';

/**
 * @component-impl
 * @stable [16.06.2020]
 */
export class InlineOption extends GenericBaseComponent<IInlineOptionProps> {

  /**
   * @stable [16.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
      onClick,
    } = this.mergedProps;
    const {
      option,
      selected,
    } = this.originalProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            InlineOptionClassesEnum.INLINE_OPTION,
            selected && InlineOptionClassesEnum.INLINE_OPTION_SELECTED,
            CalcUtils.calc(className))
        }
        onClick={onClick}
      >
        {this.fieldConverter.fromSelectOptionEntityToDisplayValue(option)}
      </div>
    );
  }

  /**
   * @stable [16.06.2020]
   * @returns {IInlineOptionProps}
   */
  protected get settingsProps(): IInlineOptionProps {
    return this.componentsSettings.inlineOption;
  }
}
