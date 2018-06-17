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
                                     TProps extends IUniversalFieldProps<TKeyboardEvent>,
                                     TState extends IUniversalFieldState,
                                     TKeyboardEvent>
  extends UniversalComponent<TComponent, TProps, TState>
  implements IUniversalField<TProps, TState> {

  /**
   * @stable [17.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onChangeManually = this.onChangeManually.bind(this);
  }

  /**
   * @stable [17.06.2018]
   */
  public resetError(): void {
    this.validateField(FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE, FIELD_EMPTY_ERROR_VALUE);
  }

  /**
   * @stable [06.06.2018]
   */
  public clearValue(): void {
    this.setFocus();

    if (this.isValuePresent()) {
      this.onChangeManually(this.getEmptyValue());
    }
  }

  /**
   * @stable [17.06.2018]
   * @param {TChangeEvent} event
   */
  public onChange<TChangeEvent>(event: TChangeEvent): void {
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
   * @stable [17.06.2018]
   * @param {AnyT} currentRawValue
   * @param {string} error
   */
  protected onChangeValue(currentRawValue: AnyT, error?: string): void {
    const actualChangedValue = toActualChangedValue({
      value: currentRawValue,
      emptyValue: this.getEmptyValue(),
      originalValue: this.props.originalValue,
      error,
    });
    const nextCurrentRawValue = actualChangedValue.value;

    this.validateField(nextCurrentRawValue, actualChangedValue.error);
    this.propsOnChange(nextCurrentRawValue);
    this.propsChangeForm(nextCurrentRawValue);      // Notify the form about changes
  }

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
   * @stable [17.06.2018]
   * @returns {AnyT}
   */
  protected getEmptyValue(): AnyT {
    return FIELD_EMPTY_VALUE;
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValueAndSetCustomValidity(value: AnyT): string {
    return null;
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
   * @returns {boolean}
   */
  protected get progress(): boolean {
    return false;
  }

  /**
   * @stable [18.06.2018]
   * @returns {AnyT}
   */
  protected get displayValue(): AnyT {
    return this.toDisplayValue(this.value);
  }

  protected toDisplayValue(value: AnyT, context?: AnyT): AnyT {
    const props = this.props;
    const displayValue = props.displayValue;

    return this.progress
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
   * @stable [17.06.2018]
   * @param {AnyT} rawValue
   * @param {string} err
   */
  private validateField(rawValue?: AnyT, err?: string): void {
    // State value cannot take an undefined value then we should pass a null value at least
    this.setState({error: R.isNil(err) ? this.validateValueAndSetCustomValidity(rawValue) : err});
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
