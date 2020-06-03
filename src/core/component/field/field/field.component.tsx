import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../../definitions.interface';
import {
  ChangeEventT,
  FieldClassesEnum,
  FieldComposedInputAttributesT,
  FieldConstants,
  IField,
  IFieldInputAttributes,
  IFieldProps,
  IMaskedInputCtor,
  InputElementT,
} from '../../../definition';
import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';
import { IUniversalFieldState } from './field.interface';
import {
  CalcUtils,
  ConditionUtils,
  FieldUtils,
  TypeUtils,
  ValueUtils,
  WrapperUtils,
} from '../../../util';
import { Info } from '../../info';

export class Field<TProps extends IFieldProps,
  TState extends IUniversalFieldState>  // TODO
  extends EnhancedGenericComponent<TProps, TState>
  implements IField<TProps, TState> {

  protected readonly inputRef = React.createRef<InputElementT | IMaskedInputCtor>();

  /**
   * @stable [03.06.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.state = {} as TState;

    this.onChangeManually = this.onChangeManually.bind(this);
  }

  /**
   * @stable [03.06.2020]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    // Need to invoke a user validator if it exists (After F5, etc...)
    this.validateValueAndSetCustomValidity(this.value);

    if (this.mergedProps.autoFocus) {
      this.setFocus();
    }
  }

  /**
   * @stable [17.05.2020]
   * @param {ChangeEventT} event
   */
  public onChange(event: ChangeEventT): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  /**
   * @stable [03.06.2020]
   * @param {TValue} currentRawValue
   */
  public onChangeManually<TValue = AnyT>(currentRawValue: TValue): void {
    if (WrapperUtils.isPreventManualChanges(this.mergedProps)) {
      this.onChangeValue(currentRawValue);
    }
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

  /**
   * @stable [03.06.2020]
   * @returns {AnyT}
   */
  public get value(): AnyT {
    const value = this.originalProps.value;
    return this.isValueDefined(value) ? value : this.defaultValue;
  }

  /**
   * @stable [03.06.2020]
   * @returns {InputElementT}
   */
  public get input(): InputElementT {
    return ConditionUtils.ifNotNilThanValue(
      this.inputRef.current,
      (input) => (input as IMaskedInputCtor).inputElement || input as InputElementT
    );
  }

  /**
   * @stable [03.06.2020]
   * @param {AnyT} currentRawValue
   */
  protected onChangeValue(currentRawValue: AnyT): void {
    const mergedProps = this.mergedProps;
    const {
      onChange,
      onFormChange,
    } = mergedProps;
    const {
      name,
    } = this.originalProps;

    const actualFieldValue = FieldUtils.asActualFieldValue({
      ...mergedProps as {},
      emptyValue: this.emptyValue,
      value: currentRawValue,
    });

    this.validateField(actualFieldValue);

    ConditionUtils.ifNotNilThanValue(onChange, () => onChange(actualFieldValue));
    ConditionUtils.ifNotNilThanValue(onFormChange, () => onFormChange(name, actualFieldValue));
  }

  protected validateField(rawValue: AnyT): void {
    // TODO
  }

  /**
   * @stable [03.06.2020]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValueAndSetCustomValidity(value: AnyT): string {
    if (this.hasInput) {
      this.input.setCustomValidity('');
    }
    if (this.isInputValid) {
      return null;
    }
    return this.inputValidationMessage;
  }

  /**
   * @stable [18.05.2020]
   * @param {AnyT} value
   * @param {boolean} forceApplyValue
   * @returns {AnyT}
   */
  protected getDecoratedDisplayValue(value: AnyT, forceApplyValue = false): AnyT {
    const {displayValue} = this.originalProps;

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
   * @stable [18.05.2020]
   * @returns {FieldComposedInputAttributesT}
   */
  protected getInputElementProps(): FieldComposedInputAttributesT {
    return {}; // TODO
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected get inputWrapperElement(): JSX.Element {
    if (this.isFieldRendered) {
      return (
        <div className={FieldClassesEnum.FIELD_INPUT_WRAPPER}>
          {this.getInputElement()}
          {this.mirrorInputElement}
          {this.inputCaretElement}
          {this.inputAttachmentElement}
        </div>
      );
    }
    return this.inputAttachmentElement;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return <input {...this.getInputElementProps() as IFieldInputAttributes}/>;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected get mirrorInputElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected get inputCaretElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [19.05.2020]
   * @returns {JSX.Element}
   */
  protected get progressInfoElement(): JSX.Element {
    return ConditionUtils.orNull(this.isFieldBusy, () => <Info progress={true}/>);
  }

  /**
   * @stable [03.06.2020]
   * @returns {AnyT}
   */
  protected get emptyValue(): AnyT {
    const {emptyValue} = this.originalProps;
    return TypeUtils.isDef(emptyValue) ? emptyValue : this.originalEmptyValue;
  }

  /**
   * @stable [17.05.2020]
   * @returns {AnyT}
   */
  protected get originalEmptyValue(): AnyT {
    return FieldConstants.DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [03.06.2020]
   * @returns {AnyT}
   */
  protected get defaultValue(): AnyT {
    return this.originalProps.defaultValue;
  }

  /**
   * @stable [03.06.2020]
   * @param {AnyT} value
   * @returns {boolean}
   */
  protected isValueObject(value: AnyT): boolean {
    return TypeUtils.isObject(value);
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isValuePresent(): boolean {
    return ValueUtils.isValuePresent(this.value, this.emptyValue);
  }

  /**
   * @stable [03.06.2020]
   * @param {AnyT} value
   * @returns {boolean}
   */
  protected isValueDefined(value: AnyT): boolean {
    return TypeUtils.isDef(value);
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isInputValid(): boolean {
    return !this.hasInput || this.input.validity.valid;
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isFocusPrevented() {
    return WrapperUtils.isFocusPrevented(this.mergedProps);
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isFieldBusy(): boolean {
    return WrapperUtils.inProgress(this.originalProps);
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isFieldRendered(): boolean {
    return WrapperUtils.isFieldRendered(this.mergedProps);
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get hasInput(): boolean {
    return !R.isNil(this.inputRef.current);
  }

  /**
   * @stable [03.06.2020]
   * @returns {string}
   */
  protected get inputValidationMessage(): string {
    return this.input.validationMessage;
  }

  /**
   * @stable [03.06.2020]
   * @returns {TProps}
   */
  protected get settingsProps(): TProps {
    return this.componentsSettings.field as TProps;
  }
}
