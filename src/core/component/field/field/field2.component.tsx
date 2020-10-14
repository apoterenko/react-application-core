import * as React from 'react';

import {
  defValuesFilter,
  isFull,
  joinClassName,
  orUndef,
  PropsUtils,
} from '../../../util';
import {
  ComponentClassesEnum,
  FieldComposedInputAttributesT,
  IField,
  IFieldState,
} from '../../../definition';
import { IFieldProps2 } from '../../../configurations-definitions.interface';
import { Field } from './field.component';

export class Field2<TProps extends IFieldProps2,
                   TState extends IFieldState = IFieldState>
    extends Field<TProps,
                           TState>
    implements IField<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IFieldProps2>({}, Field);

  /**
   * @stable [30.10.2019]
   * @returns {FieldComposedInputAttributesT}
   */
  protected getInputElementProps(): FieldComposedInputAttributesT {
    const props = this.props;
    /**/
    const autoComplete = props.autoComplete || 'off';                                                       /* @stable [29.10.2019] */
    const disabled = this.isDisabled;                                                                       /* @stable [28.10.2019] */
    const name = props.name;                                                                                /* @stable [28.10.2019] */
    const placeholder = orUndef(props.placeholder && !this.isBusy, () => this.t(props.placeholder));   /* @stable [29.10.2019] */
    const readOnly = this.isInactive;                                                                       /* @stable [28.10.2019] */
    const type = props.type || 'text';                                                                      /* @stable [28.10.2019] */
    const value = this.displayValue;                                                                        /* @stable [28.10.2019] */

    const result = defValuesFilter<FieldComposedInputAttributesT, FieldComposedInputAttributesT>({
      className: 'rac-field__input rac-flex-x1',
      autoComplete, disabled, name,
      placeholder, readOnly, type, value,
    });
    return {
      ...super.getInputElementProps(),
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
