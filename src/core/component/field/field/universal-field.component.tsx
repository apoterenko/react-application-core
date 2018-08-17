import * as R from 'ramda';
import * as Printf from 'sprintf-js';

import { isDef, isFn, isUndef, orDefault } from '../../../util';
import {
  IUniversalField,
  IUniversalFieldDisplayValueConverter,
} from '../../../entities-definitions.interface';
import { IUniversalFieldProps } from '../../../props-definitions.interface';
import { AnyT } from '../../../definitions.interface';
import {
  FIELD_EMPTY_VALUE,
  FIELD_EMPTY_ERROR_VALUE,
  FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
  IUniversalFieldState,
} from './field.interface';
import { UniversalComponent } from '../../base/universal.component';
import { toActualChangedValue } from './field.support';

export abstract class UniversalField<TComponent extends IUniversalField<TProps, TState>,
                                     TProps extends IUniversalFieldProps<TKeyboardEvent,
                                                                         TFocusEvent,
                                                                         TBasicEvent>,
                                     TState extends IUniversalFieldState,
                                     TKeyboardEvent,
                                     TFocusEvent,
                                     TBasicEvent>
  extends UniversalComponent<TComponent, TProps, TState>
  implements IUniversalField<TProps, TState> {

  /**
   * @stable [17.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeManually = this.onChangeManually.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {} as TState;
  }

  /**
   * @stable [01.08.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    // Need to invoke a user validator if it exists (After F5, etc...)
    this.validateValueAndSetCustomValidity(this.value);
  }

  /**
   * @stable [17.06.2018]
   */
  public resetError(): void {
    this.validateField(FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE);
  }

  /**
   * @stable [06.06.2018]
   */
  public clearValue(): void {
    this.setFocus();

    if (this.isValuePresent()) {
      this.onChangeManually(this.getEmptyValue());
    }

    if (this.props.onClear) {
      this.props.onClear();
    }
  }

  /**
   * @stable [27.07.2018]
   * @param {AnyT} event
   */
  public onChange(event: AnyT): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} currentRawValue
   * @param {AnyT} context
   */
  public onChangeManually(currentRawValue: AnyT, context?: AnyT): void {
    this.onChangeValue(currentRawValue);
  }

  /**
   * @stable [17.06.2018]
   * @returns {AnyT}
   */
  public get value(): AnyT {
    return this.props.value;
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyBackspace(event: TKeyboardEvent): void {
    if (this.props.onKeyBackspace) {
      this.props.onKeyBackspace(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyUp(event: TKeyboardEvent): void {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyEnter(event: TKeyboardEvent): void {
    if (this.props.onKeyEnter) {
      this.props.onKeyEnter(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyTab(event: TKeyboardEvent): void {
    if (this.props.onKeyTab) {
      this.props.onKeyTab(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyEscape(event: TKeyboardEvent): void {
    if (this.props.onKeyEscape) {
      this.props.onKeyEscape(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyArrowDown(event: TKeyboardEvent): void {
    if (this.props.onKeyArrowDown) {
      this.props.onKeyArrowDown(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyArrowUp(event: TKeyboardEvent): void {
    if (this.props.onKeyArrowUp) {
      this.props.onKeyArrowUp(event);
    }
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} event
   * @returns {AnyT}
   */
  public abstract getRawValueFromEvent(event: AnyT): AnyT;

  /**
   * @stable [06.06.2018]
   */
  public abstract setFocus(): void;

  /**
   * The state may be an external storage and the value must be able to be serialized.
   *
   * @stable [17.06.2018]
   * @param {AnyT} rawValue
   * @returns {AnyT}
   */
  protected toSerializedValue(rawValue: AnyT): AnyT {
    return rawValue;
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} value
   * @returns {boolean}
   */
  protected isValuePresent(value = this.value): boolean {
    return isDef(value) && !R.equals(value, this.getEmptyValue());
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  protected isFieldFocused(): boolean {
    return this.hasInputFocus() || this.isValuePresent();
  }

  /**
   * @stable [02.08.2018]
   * @returns {boolean}
   */
  protected isFieldRequired(): boolean {
    const props = this.props;
    return isFn(props.required) ? (props.required as (() => boolean))() : props.required as boolean;
  }

  /**
   * @stable [17.06.2018]
   * @returns {AnyT}
   */
  protected getEmptyValue(): AnyT {
    return FIELD_EMPTY_VALUE;
  }

  /**
   * @stable [18.06.2018]
   * @returns {AnyT}
   */
  protected get definiteValue(): AnyT {
    return isUndef(this.value) ? this.getEmptyValue() : this.value;
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValueAndSetCustomValidity(value: AnyT): string {
    const props = this.props;
    let error = FIELD_EMPTY_ERROR_VALUE;

    this.setNativeInputValidity('');

    if (this.isNativeInputValid()) {
      error = isFn(props.validate) ? props.validate(value) : error;
      if (R.isNil(error)) {
        error = this.validateValue(value); // The custom internal validator
      }

      if (!R.isNil(error)) {
        this.setNativeInputValidity(error);
      }
    } else {
      error = this.getNativeInputValidationMessage();
    }
    return error;
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValue(value: AnyT): string {
    return FIELD_EMPTY_ERROR_VALUE;
  }

  /**
   * @stable [31.07.2018]
   * @returns {boolean}
   */
  protected isNativeInputValid(): boolean {
    return true;
  }

  /**
   * @stable [31.07.2018]
   * @returns {string}
   */
  protected getNativeInputValidationMessage(): string {
    return FIELD_EMPTY_ERROR_VALUE;
  }

  /**
   * @stable [31.07.2018]
   * @param {string} error
   */
  protected setNativeInputValidity(error: string): void {
    // Nothing to do
  }

  /**
   * @stable [17.06.2018]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string | RegExp> {
    return this.props.mask;
  }

  /**
   * @stable [17.06.2018]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return this.props.pattern;
  }

  /**
   * @stable [18.06.2018]
   * @returns {AnyT}
   */
  protected get displayValue(): AnyT {
    return this.toDisplayValue(this.value);
  }

  /**
   * @stable [18.06.2018]
   * @param {AnyT} value
   * @param {AnyT} context
   * @returns {AnyT}
   */
  protected toDisplayValue(value: AnyT, context?: AnyT): AnyT {
    const props = this.props;
    const displayValue = props.displayValue;

    return this.inProgress()
      ? FIELD_EMPTY_VALUE // The dictionaries data is cleaned before request
      : (
        this.isValuePresent(value)
          ? (isUndef(displayValue)
              ? value
              : (isFn(displayValue)
                  ? (displayValue as IUniversalFieldDisplayValueConverter)(value, this)
                  : displayValue))
          : FIELD_EMPTY_VALUE
      );
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  protected isDeactivated(): boolean {
    const props = this.props;
    return props.disabled || props.readOnly || this.inProgress();
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  protected inProgress(): boolean {
    const props = this.props;
    return props.progress === true;
  }

  /**
   * @stable [18.06.2018]
   * @param {boolean} usePrintf
   * @param {AnyT} args
   * @returns {string}
   */
  protected printfDisplayMessage(usePrintf: boolean, ...args: AnyT[]): string {
    const props = this.props;
    return orDefault<string, string>(
      usePrintf,
      () => Printf.sprintf(this.t(props.displayMessage), ...args),
      FIELD_EMPTY_VALUE
    );
  }

  /**
   * @stable [02.07.2018]
   * @param {TFocusEvent} event
   * @returns {boolean}
   */
  protected onFocus(event: TFocusEvent): boolean {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    return true;
  }

  /**
   * @stable [18.06.2018]
   * @param {TFocusEvent} event
   */
  protected onBlur(event: TFocusEvent): void {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TBasicEvent} event
   */
  protected onClick(event: TBasicEvent): void {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  protected abstract hasInputFocus(): boolean;

  /**
   * @stable [31.07.2018]
   * @param {AnyT} currentRawValue
   */
  private onChangeValue(currentRawValue: AnyT): void {
    const props = this.props;
    const actualChangedValue = toActualChangedValue({
      value: currentRawValue,
      emptyValue: this.getEmptyValue(),
      originalValue: props.originalValue,
      canReturnClearDirtyChangesValue: props.canReturnClearDirtyChangesValue,
    });

    this.validateField(actualChangedValue);
    this.propsOnChange(actualChangedValue);
    this.propsChangeForm(actualChangedValue);      // Notify the form about changes
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} rawValue
   */
  private validateField(rawValue: AnyT): void {
    // State value cannot take an undefined value then we should pass a null value at least
    this.setState({error: this.validateValueAndSetCustomValidity(rawValue)});
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} rawValue
   */
  private propsChangeForm(rawValue: AnyT): void {
    const props = this.props;
    if (!isFn(props.changeForm)) {
      return;
    }
    props.changeForm(props.name, this.toSerializedValue(rawValue), props.validationGroup);
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} rawValue
   */
  private propsOnChange(rawValue: AnyT): void {
    const props = this.props;
    if (props.onChange) {
      props.onChange(rawValue);
    }
  }
}
