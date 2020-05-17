import { AnyT } from '../../../definitions.interface';
import {
  ChangeEventT,
  FieldConstants,
  IGenericFieldEntity2,
} from '../../../definition';
import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';
import { IUniversalFieldProps } from '../../../configurations-definitions.interface';
import { IUniversalFieldState } from './field.interface';
import {
  buildActualFieldValue,
  ConditionUtils,
  isDef,
} from '../../../util';

export class Field<TProps extends IUniversalFieldProps,
  TState extends IUniversalFieldState>
  extends EnhancedGenericComponent<TProps, TState> {

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
    const actualFieldValue = buildActualFieldValue({
      ...this.props as IGenericFieldEntity2,
      emptyValue: this.emptyValue,
      value: currentRawValue,
    });

    this.validateField(actualFieldValue);
    this.notifyAboutChanges(actualFieldValue);
    this.notifyFormAboutChanges(actualFieldValue);
  }

  protected validateField(rawValue: AnyT): void {
    // TODO
  }

  /**
   * @stable [17.05.2020]
   * @returns {AnyT}
   */
  protected get emptyValue(): AnyT {
    const props = this.props;
    return isDef(props.emptyValue) ? props.emptyValue : this.originalEmptyValue;
  }

  /**
   * @stable [17.05.2020]
   * @returns {AnyT}
   */
  protected get originalEmptyValue(): AnyT {
    return FieldConstants.DISPLAY_EMPTY_VALUE;
  }

  private notifyFormAboutChanges(rawValue: AnyT): void {
    const props = this.props;
    ConditionUtils.ifNotNilThanValue(this.props.changeForm, (changeForm) => changeForm(props.name, rawValue));
  }

  private notifyAboutChanges(rawValue: AnyT): void {
    ConditionUtils.ifNotNilThanValue(this.props.onChange, (onChange) => onChange(rawValue));
  }
}
