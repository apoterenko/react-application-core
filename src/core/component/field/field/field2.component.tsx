import * as React from 'react';

import {
  defValuesFilter,
  isFull,
  joinClassName,
  orUndef,
  PropsUtils,
} from '../../../util';
import { UniversalField } from './universal-field.component';
import {
  ComponentClassesEnum,
  FieldComposedInputAttributesT,
  IField,
  IFieldState,
  IKeyboardEvent,
} from '../../../definition';
import { IFieldProps2 } from '../../../configurations-definitions.interface';

export class Field2<TProps extends IFieldProps2,
                   TState extends IFieldState = IFieldState>
    extends UniversalField<TProps,
                           TState>
    implements IField<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IFieldProps2>({}, UniversalField);

  /**
   * @stable [03.09.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyDown(event: IKeyboardEvent): void {
    const key = event.key;

    switch (key) {
      case 'Tab':
        this.onKeyTab(event);
        break;
      case 'Enter':
        this.onKeyEnter(event);
        break;
      case 'Escape':
        this.onKeyEscape(event);
        break;
      case 'ArrowDown':
        this.onKeyArrowDown(event);
        break;
      case 'ArrowUp':
        this.onKeyArrowUp(event);
        break;
      case 'Backspace':
        this.onKeyBackspace(event);
        break;
    }

    super.onKeyDown(event);
  }

  /**
   * @stable [30.10.2019]
   * @returns {FieldComposedInputAttributesT}
   */
  protected getInputElementProps(): FieldComposedInputAttributesT {
    const props = this.props;
    /**/
    const autoComplete = props.autoComplete || 'off';                                                       /* @stable [29.10.2019] */
    const cols = props.cols;                                                                                /* @stable [28.10.2019] */
    const disabled = this.isDisabled;                                                                       /* @stable [28.10.2019] */
    const maxLength = props.maxLength;                                                                      /* @stable [28.10.2019] */
    const minLength = props.minLength;                                                                      /* @stable [28.10.2019] */
    const name = props.name;                                                                                /* @stable [28.10.2019] */
    const pattern = this.getFieldPattern();                                                                 /* @stable [29.10.2019] */
    const placeholder = orUndef(props.placeholder && !this.isBusy, () => this.t(props.placeholder));   /* @stable [29.10.2019] */
    const readOnly = this.isInactive;                                                                       /* @stable [28.10.2019] */
    const required = this.isRequired;                                                                       /* @stable [29.10.2019] */
    const rows = props.rows;                                                                                /* @stable [28.10.2019] */
    const step = props.step;                                                                                /* @stable [28.10.2019] */
    const tabIndex = props.tabIndex;                                                                        /* @stable [28.10.2019] */
    const type = props.type || 'text';                                                                      /* @stable [28.10.2019] */
    const value = this.displayValue;                                                                        /* @stable [28.10.2019] */

    const result = defValuesFilter<FieldComposedInputAttributesT, FieldComposedInputAttributesT>({
      className: 'rac-field__input rac-flex-x1',
      autoComplete, cols, disabled, maxLength, minLength, name, pattern,
      placeholder, readOnly, rows, step, tabIndex, type, value, required,
      ...(
        this.isActive
          ? {
            onBlur: this.onBlur,
            onChange: this.onChange,
            onClick: this.onClick,
            onFocus: this.onFocus,
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
          }
          : {}
      ),
    });
    return {
      ...result,
      ref: this.inputRef,
    } as FieldComposedInputAttributesT;
  }

  /**
   * @stable [06.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const props = this.props;

    return joinClassName(
      super.getFieldClassName(),
      isFull(props) && ComponentClassesEnum.FLEX_X1, // TODO full-field
      this.isReadOnly && 'rac-field-readonly',
      this.isFocusPrevented && 'rac-field-prevent-focus'
    );
  }
}
