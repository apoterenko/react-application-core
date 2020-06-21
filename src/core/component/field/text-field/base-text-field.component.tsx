import * as React from 'react';
import * as R from 'ramda';

import MaskedTextInput from 'react-text-mask';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  DelayedTask,
  FilterUtils,
  nvl,
  ObjectUtils,
  orNull,
  parseValueAtPx,
  toJqEl,
  WrapperUtils,
} from '../../../util';
import {
  IChangeEvent,
  UniCodesEnum,
} from '../../../definitions.interface';
import { Field2 } from '../field';
import { Keyboard } from '../../keyboard';
import {
  ComponentClassesEnum,
  FieldActionPositionsEnum,
  FieldActionTypesEnum,
  FieldClassesEnum,
  IBaseEvent,
  IBaseTextFieldProps,
  IBaseTextFieldState,
  IFieldActionEntity,
  IFieldState,
  IJQueryElement,
  KeyboardClassNamesEnum,
  TextFieldClassesEnum,
} from '../../../definition';

export class BaseTextField<TProps extends IBaseTextFieldProps = IBaseTextFieldProps,
                           TState extends IBaseTextFieldState = IBaseTextFieldState>
    extends Field2<TProps, TState> {

  private static readonly DEFAULT_MASK_GUIDE = false;

  protected defaultActions: IFieldActionEntity[] = [];
  private readonly keyboardRef = React.createRef<Keyboard>();
  private readonly mirrorInputRef = React.createRef<HTMLElement>();

  /**
   * @stable [17.06.2020]
   * @param {TProps} originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.closeVirtualKeyboard = this.closeVirtualKeyboard.bind(this);
    this.onCloseVirtualKeyboard = this.onCloseVirtualKeyboard.bind(this);
    this.onDocumentClickHandler = this.onDocumentClickHandler.bind(this);
    this.onKeyboardChange = this.onKeyboardChange.bind(this);

    if (WrapperUtils.isClearActionRendered(this.originalProps)) {
      this.addClearAction();
    }

    if (this.isKeyboardUsed && this.isCursorUsed) {
      const {
        caretBlinkingFrequencyTimeout,
      } = originalProps;

      this.caretBlinkingTask = new DelayedTask(
        this.setCaretVisibility.bind(this),
        caretBlinkingFrequencyTimeout || 400,
        true
      );
    }
  }

  /**
   * @stable [21.06.2020]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.onCloseVirtualKeyboard();
  }

  /**
   * @stable [21.06.2020]
   * @param {TProps} prevProps
   * @param {TState} prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    super.componentDidUpdate(prevProps, prevState);

    const {
      useKeyboard,
      value,
    } = prevProps;

    if (this.isKeyboardUsed) {
      if (this.isKeyboardOpen()
        && ObjectUtils.isCurrentValueNotEqualPreviousValue(this.value, value)) {
        this.refreshCaretPosition();
      }
    } else if (useKeyboard) { // Previous props
      this.closeVirtualKeyboard();
    }
  }

  /**
   * @stable [25.02.2019]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return R.isNil(this.getFieldMask())
      ? super.getInputElement()
      : this.getMaskedInputElement();
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected get keyboardElement(): JSX.Element {
    return (
      <Keyboard
        ref={this.keyboardRef}
        field={this}
        onClose={this.closeVirtualKeyboard}
        onChange={this.onKeyboardChange}
        {...this.getKeyboardProps()}/>
    );
  }

  /**
   * @stable [13.01.2019]
   * @returns {boolean}
   */
  protected isKeyboardOpen(): boolean {
    return super.isKeyboardOpen() || this.isKeyboardInline;
  }

  /**
   * @stable [21.06.2020]
   */
  protected onCloseVirtualKeyboard(): void {
    ConditionUtils.ifNotNilThanValue(this.caretBlinkingTask, (caretBlinkingTask) => caretBlinkingTask.stop());

    ConditionUtils.ifNotNilThanValue(
      this.keyboardListenerUnsubscriber,
      () => {
        this.keyboardListenerUnsubscriber();
        this.keyboardListenerUnsubscriber = null;
      }
    );
  }

  /**
   * @stable [04.09.2018]
   */
  protected refreshCaretPosition(): void {
    super.refreshCaretPosition();
    this.input.scrollLeft = this.input.scrollWidth;
  }

  /**
   * @stable [04.09.2018]
   * @returns {number}
   */
  protected getCaretPosition(): number {
    return this.isValuePresent
      ? Math.min(this.jMirrorInput.width(), this.jqInput.width())
      : 0;
  }

  /**
   * @stable [18.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const {
      prefixLabel,
    } = this.originalProps;

    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      TextFieldClassesEnum.BASE_TEXT_FIELD,
      this.isActioned && TextFieldClassesEnum.BASE_TEXT_FIELD_ACTIONED,
      prefixLabel
        ? TextFieldClassesEnum.BASE_TEXT_FIELD_LABEL_PREFIXED
        : TextFieldClassesEnum.BASE_TEXT_FIELD_LABEL_NOT_PREFIXED
    );
  }

  /**
   * @stable [12.09.2018]
   * @returns {JSX.Element}
   */
  protected get mirrorInputElement(): JSX.Element {
    if (!this.isKeyboardUsed || !this.isCursorUsed || this.isValueNotPresent) {
      return null;
    }

    // TODO Move to support
    const value = this.value;
    const content = String((
      this.props.type === 'password'
        ? String(value).replace(/./g, this.environment.passwordPlaceholder)
        : value
    )).replace(/ /g, UniCodesEnum.NO_BREAK_SPACE);

    return (
      <span
        ref={this.mirrorInputRef}
        className={
          ClsUtils.joinClassName(
            this.getInputElementProps().className,
            FieldClassesEnum.FIELD_INPUT_MIRROR,
            ComponentClassesEnum.INVISIBLE
          )
        }
      >
        {content}
      </span>
    );
  }

  // TODO
  protected get inputCaretElement(): JSX.Element {
    const state = this.state;
    const textOffset = 2;

    return orNull(
      this.isCursorUsed && this.isKeyboardOpen() && state.caretVisibility && !R.isNil(state.caretPosition),
      () => (
        <div className='rac-field__input-caret'
             style={{left: state.caretPosition + parseValueAtPx(this.jqInput.css('paddingLeft')) - textOffset}}>
          |
        </div>
      )
    );
  }

  // TODO
  protected onDocumentClickHandler(e: IBaseEvent): void {
    const element = event.target as HTMLElement;
    const keyboardEl = this.keyboardRef.current.getSelf();
    if (!keyboardEl) {
      return;
    }

    if (this.domAccessor.getParentsAsElements({parentClassName: KeyboardClassNamesEnum.KEYBOARD, element})
        .includes(keyboardEl)) {
      return;
    }
    this.closeVirtualKeyboard();
  }

  /**
   * @stable [28.10.2019]
   * @param {} action
   * @returns {boolean}
   */
  protected isFieldActionDisabled(action: IFieldActionEntity): boolean {
    return CalcUtils.calc(action.disabled) || this.isInactive;
  }

  /**
   * @stable [21.06.2020]
   */
  private closeVirtualKeyboard(): void {
    this.setState({keyboardOpen: false}, this.onCloseVirtualKeyboard);
  }

  /**
   * @stable [04.09.2018]
   * @param {string} rawValue
   */
  private onKeyboardChange(rawValue: string): void {
    // Synthetic event creation to reduce source code
    const syntheticEvent = {target: {value: rawValue}} as IChangeEvent;

    // To handle various field types, NumberField, etc..
    this.onChangeManually(this.getRawValueFromEvent(syntheticEvent));
  }

  /**
   * TODO domAccessor
   */
  private get jMirrorInput(): IJQueryElement {
    return toJqEl(this.mirrorInputRef.current);
  }

  /**
   * @stable [25.02.2019]
   * @returns {JSX.Element}
   */
  private getMaskedInputElement(): JSX.Element {
    const mask = this.getFieldMask();
    const props = this.props;

    return (
      <MaskedTextInput
        guide={nvl(props.maskGuide, BaseTextField.DEFAULT_MASK_GUIDE)}
        placeholderChar={nvl(props.maskPlaceholderChar, UniCodesEnum.SPACE)}
        mask={mask}
        {...this.getInputElementProps()}/>
    );
  }

  /**
   * @stable [18.04.2020]
   * @returns {JSX.Element}
   */
  protected get actionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {
          this.fieldActions.map(
            (action, index) => (
              <React.Fragment key={`field-action-key-${index}`}>
                {
                  this.uiFactory.makeIcon({
                    ...action,
                    disabled: this.isFieldActionDisabled(action),
                  })
                }
              </React.Fragment>
            )
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [30.10.2019]
   */
  private addClearAction(): void {
    this.defaultActions.push({
      type: FieldActionTypesEnum.CLOSE,
      onClick: () => this.clearValue(),
      disabled: () => this.isInactive,
    });
  }

  /**
   * @stable [21.06.2020]
   */
  private setCaretVisibility(): void {
    this.setState((prevState) => FilterUtils.notNilValuesFilter<IFieldState, IFieldState>({
      caretVisibility: !prevState.caretVisibility,
      caretPosition: ConditionUtils.ifNilThanValue(
        prevState.caretPosition,
        () => this.getCaretPosition()
      ),
    }));
  }

  /**
   * @stable [17.06.2020]
   * @returns {IFieldActionEntity[]}
   */
  private get fieldActions(): IFieldActionEntity[] {
    if (this.isReadOnly) {
      return [];
    }
    const originalProps = this.originalProps;
    const {
      actions = [],
      actionsPosition,
    } = originalProps;

    const defaultActions = this.defaultActions || [];
    const fieldActions = actionsPosition === FieldActionPositionsEnum.LEFT
      ? defaultActions.concat(actions)
      : actions.concat(defaultActions);

    return fieldActions.filter(
      (action) => {
        switch (action.type) {
          case FieldActionTypesEnum.CLOSE:
            return this.isValuePresent;
        }
        return true;
      }
    );
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isCursorUsed(): boolean {
    return WrapperUtils.isCursorUsed(this.originalProps);
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isActioned(): boolean {
    return ObjectUtils.isObjectNotEmpty(this.fieldActions);
  }
}
