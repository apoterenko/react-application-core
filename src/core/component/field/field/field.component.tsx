import * as R from 'ramda';

import { AnyT } from '../../../definitions.interface';
import {
  ChangeEventT,
  FieldConstants,
  IField,
  IFieldProps,
} from '../../../definition';
import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';
import { IUniversalFieldState } from './field.interface';
import {
  buildActualFieldValue,
  CalcUtils,
  ConditionUtils,
  isDef,
  mergeWithSystemProps,
  TypeUtils,
} from '../../../util';

export class Field<TProps extends IFieldProps,
  TState extends IUniversalFieldState>
  extends EnhancedGenericComponent<TProps, TState>
  implements IField<TProps, TState> {

  /**
   * @stable [17.05.2020]
   * @param {ChangeEventT} event
   */
  public onChange(event: ChangeEventT): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  public setFocus(): void {
    // Do nothing
  }

  /**
   * @stable [17.05.2020]
   * @param {ChangeEventT} event
   * @returns {AnyT}
   */
  public getRawValueFromEvent(event: ChangeEventT): AnyT {
    return event.target.value;
  }

  protected onChangeValue(currentRawValue: AnyT): void {
    const mergedProps = this.mergedProps;

    const actualFieldValue = buildActualFieldValue({
      ...mergedProps as {},
      emptyValue: this.emptyValue,
      value: currentRawValue,
    });

    this.validateField(actualFieldValue);

    ConditionUtils.ifNotNilThanValue(
      mergedProps.onChange,
      (onChange) => onChange(actualFieldValue)
    );

    ConditionUtils.ifNotNilThanValue(
      mergedProps.onFormChange,
      (onFormChange) => onFormChange(mergedProps.name, actualFieldValue)
    );
  }

  protected validateField(rawValue: AnyT): void {
    // TODO
  }

  /**
   * @stable [18.05.2020]
   * @param {AnyT} value
   * @param {boolean} forceApplyValue
   * @returns {AnyT}
   */
  protected getDecoratedDisplayValue(value: AnyT, forceApplyValue = false): AnyT {
    const {displayValue} = this.props;

    return R.isNil(displayValue)
      ? this.decorateDisplayValue(value)
      : (
        TypeUtils.isFn(displayValue)
          ? CalcUtils.calc(displayValue, this.decorateDisplayValue(value))
          : this.decorateDisplayValue(forceApplyValue ? value : displayValue)
      );
  }

  /**
   * @stable [18.05.2020]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected decorateDisplayValue(value: AnyT): AnyT {
    return value;
  }

  /**
   * @stable [17.05.2020]
   * @returns {AnyT}
   */
  protected get emptyValue(): AnyT {
    const mergedProps = this.mergedProps;
    return isDef(mergedProps.emptyValue) ? mergedProps.emptyValue : this.originalEmptyValue;
  }

  /**
   * @stable [17.05.2020]
   * @returns {AnyT}
   */
  protected get originalEmptyValue(): AnyT {
    return FieldConstants.DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [17.05.2020]
   * @returns {TProps}
   */
  protected get mergedProps(): TProps {
    return mergeWithSystemProps(this.props, this.settings.components.field) as TProps;
  }
}
