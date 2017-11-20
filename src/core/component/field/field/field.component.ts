import * as ramda from 'ramda';

import { lazyInject, DI_TYPES } from '../../../di';
import { isUndef } from '../../../util';
import { IApplicationSettings } from '../../../settings';
import {
  INativeMaterialComponent,
  MaterialComponent,
  IMaterialComponentFactory,
} from '../../../component/material';
import { AnyT, BasicEventT, FocusEventT, KeyboardEventT } from '../../../definition.interface';

import {
  IField,
  IFieldInternalProps,
  IFieldInternalState,
  IMaskedTextInputPureComponent,
} from './field.interface';

export abstract class Field<TComponent extends IField<TInternalProps, TInternalState, TValueEvent>,
                            TInternalProps extends IFieldInternalProps,
                            TInternalState extends IFieldInternalState,
                            TNativeMaterialComponent extends INativeMaterialComponent,
                            TValueEvent>
    extends MaterialComponent<TComponent,
                              TInternalProps,
                              TInternalState,
                              TNativeMaterialComponent>
    implements IField<TInternalProps, TInternalState, TValueEvent> {

  @lazyInject(DI_TYPES.Settings) protected applicationSettings: IApplicationSettings;

  constructor(props: TInternalProps,
              mdcFactory: IMaterialComponentFactory<TNativeMaterialComponent>) {
    super(props, mdcFactory);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    if (this.isPersistent) {
      this.state = {} as TInternalState;
    } else {
      this.state = {
        stateValue: this.prepareStateValueBeforeSerialization(this.definitePropsValue),
      } as TInternalState;
    }
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (!this.isPersistent) {
      const newValue = nextProps.value;
      if (!ramda.equals(this.stateValue, newValue)) {
        this.setState({ stateValue: this.prepareStateValueBeforeSerialization(newValue) });
      }
    }
  }

  public onChange(event: TValueEvent): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  public resetError(): void {
    this.validateField(null, null);
  }

  public onKeyDown(event: KeyboardEventT): void {
    const key = event.key;
    switch (key) {
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

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  public onKeyBackspace(event: KeyboardEventT): void {
    if (this.props.onKeyBackspace) {
      this.props.onKeyBackspace(event);
    }
  }

  public onKeyUp(event: KeyboardEventT): void {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  }

  public onKeyEnter(event: KeyboardEventT): void {
    if (this.props.onKeyEnter) {
      this.props.onKeyEnter(event);
    }
  }

  public onKeyEscape(event: KeyboardEventT): void {
    if (this.props.onKeyEscape) {
      this.props.onKeyEscape(event);
    }
  }

  public onKeyArrowDown(event: KeyboardEventT): void {
    if (this.props.onKeyArrowDown) {
      this.props.onKeyArrowDown(event);
    }
  }

  public onKeyArrowUp(event: KeyboardEventT): void {
    if (this.props.onKeyArrowUp) {
      this.props.onKeyArrowUp(event);
    }
  }

  public setFocus(): void {
    this.input.focus();
  }

  public get input(): HTMLInputElement {
    return this.refs.input && (this.refs.input as IMaskedTextInputPureComponent).inputElement
        || this.refs.input as HTMLInputElement;
  }

  protected onFocus(event: FocusEventT): void {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  protected onBlur(event: FocusEventT): void {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  protected onClick(event: BasicEventT): void {
    this.stopEvent(event);

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  protected onChangeValue(rawValue?: AnyT, error?: string): void {
    if (!this.isPersistent) {
      this.setState({ stateValue: this.prepareStateValueBeforeSerialization(rawValue) });
    }
    this.validateField(rawValue, error);

    this.propsOnChange(rawValue);
    this.propsChangeForm(rawValue);
  }

  protected propsChangeForm(rawValue: AnyT): void {
    if (this.props.changeForm) {
      this.props.changeForm(this.props.name, rawValue, this.props.validationGroup);
    }
  }

  protected prepareStateValueBeforeSerialization(value: AnyT): AnyT {
    // The state may be an external storage and the value must be able to be serialized
    return this.props.notAllowEmptyValue && ramda.isEmpty(value) ? undefined : value;
  }

  protected get value(): AnyT {
    return this.isPersistent ? this.definitePropsValue : this.stateValue;
  }

  protected get isValuePresent(): boolean {
    return !isUndef(this.value) && this.value !== this.getEmptyValue();
  }

  protected get error(): string {
    return this.state.error;
  }

  protected get inputCursorPosition(): number {
    return this.input.selectionStart;
  }

  protected get isInputFocused(): boolean {
    return document.activeElement === this.input;
  }

  protected get isDeactivated(): boolean {
    return this.props.disabled || this.props.readOnly;
  }

  protected abstract getEmptyValue(): AnyT;

  protected abstract getRawValueFromEvent(event: TValueEvent): AnyT;

  private validateValueAndSetCustomValidity(value: AnyT): string {
    const props = this.props;
    let error = null;
    if (this.input.validity.valid) {
      error = props.validate ? props.validate(value) : null;
      if (error) {
        this.input.setCustomValidity(error);
      }
    } else {
      error = this.input.validationMessage;
    }
    return error;
  }

  private propsOnChange(rawValue: AnyT): void {
    if (this.props.onChange) {
      this.props.onChange(rawValue);
    }
  }

  private get definitePropsValue(): AnyT {
    return isUndef(this.props.value)
        // Prevent warning: "Input is changing a uncontrolled input of type text to be controlled..."
        ? this.getEmptyValue()
        : this.props.value;
  }

  private get stateValue(): AnyT {
    return this.state.stateValue;
  }

  private validateField(rawValue: AnyT, error?: string): void {
    this.input.setCustomValidity(''); // Support of HTML5 Validation Api
    this.setState({ error: isUndef(error) ? this.validateValueAndSetCustomValidity(rawValue) : error });
  }
}
