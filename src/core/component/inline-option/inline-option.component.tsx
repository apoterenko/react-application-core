import * as React from 'react';

import { GenericComponent } from '../base/generic.component';
import {
  IconsEnum,
  IInlineOptionProps,
  InlineOptionClassesEnum,
} from '../../definition';
import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
  TypeUtils,
} from '../../util';

/**
 * @component-impl
 * @stable [16.06.2020]
 */
export class InlineOption extends GenericComponent<IInlineOptionProps> {

  public static readonly defaultProps: IInlineOptionProps = {
    closable: true,
  };

  /**
   * @stable [08.07.2020]
   * @param {IInlineOptionProps} originalProps
   */
  constructor(originalProps: IInlineOptionProps) {
    super(originalProps);

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  /**
   * @stable [16.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
      closable,
      disabled,
      onClick,
      onClose,
      option,
      selected,
    } = this.originalProps;

    const displayValue = this.fieldConverter.fromSelectValueToDisplayValue(option);

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            InlineOptionClassesEnum.INLINE_OPTION,
            CalcUtils.calc(className),
            disabled && InlineOptionClassesEnum.INLINE_OPTION_DISABLED,
            selected && InlineOptionClassesEnum.INLINE_OPTION_SELECTED
          )
        }
        {...PropsUtils.buildClickHandlerProps(this.onClick, !disabled && TypeUtils.isFn(onClick), false)}
      >
        <span
          className={InlineOptionClassesEnum.INLINE_OPTION_CONTENT}
          title={String(displayValue)}
        >
          {displayValue}
        </span>
        {
          CalcUtils.calc(closable, option) && TypeUtils.isFn(onClose) && this.uiFactory.makeIcon({
            className: InlineOptionClassesEnum.INLINE_OPTION_CLOSE,
            disabled,
            onClick: this.onClose,
            type: IconsEnum.TIMES,
          })
        }
      </div>
    );
  }

  /**
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): IInlineOptionProps {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.inlineOption
    );
  }

  /**
   * @stable [08.07.2020]
   */
  private onClose(): void {
    const {
      onClose,
      option,
    } = this.originalProps;

    onClose(option);
  }

  /**
   * @stable [08.07.2020]
   */
  private onClick(): void {
    const {
      onClick,
      option,
    } = this.originalProps;

    onClick(option);
  }
}
