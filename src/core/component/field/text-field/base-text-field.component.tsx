import * as React from 'react';
import * as R from 'ramda';

import MaskedTextInput from 'react-text-mask';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  isInline,
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
  EventsEnum,
  FieldActionPositionsEnum,
  FieldActionTypesEnum,
  FieldClassesEnum,
  IBaseEvent,
  IBaseTextFieldProps,
  IBaseTextFieldState,
  IFieldActionEntity,
  IJQueryElement,
  IKeyboardProps,
  KeyboardClassNamesEnum,
  TextFieldClassesEnum,
  TouchEventsEnum,
} from '../../../definition';

export class BaseTextField<TProps extends IBaseTextFieldProps,
                           TState extends IBaseTextFieldState>
    extends Field2<TProps, TState> {

  private static readonly DEFAULT_MASK_GUIDE = false;

  protected defaultActions: IFieldActionEntity[] = [];
  private keyboardListenerUnsubscriber: () => void;
  private readonly keyboardRef = React.createRef<Keyboard>();
  private readonly mirrorInputRef = React.createRef<HTMLElement>();

  /**
   * @stable [17.06.2020]
   * @param {TProps} originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.onDocumentClickHandler = this.onDocumentClickHandler.bind(this);
    this.onKeyboardChange = this.onKeyboardChange.bind(this);

    if (WrapperUtils.isClearActionRendered(this.originalProps)) {
      this.addClearAction();
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
   * @stable [02.02.2020]
   * @returns {IKeyboardProps}
   */
  protected getKeyboardProps(): IKeyboardProps {
    return this.props.keyboardConfiguration || {};
  }

  /**
   * @stable [02.02.2020]
   */
  protected openVirtualKeyboard(): void {
    super.openVirtualKeyboard(() => {
      if (!this.isKeyboardInline) {
        this.keyboardListenerUnsubscriber = this.domAccessor.captureEvent({
          element: this.environment.document,
          callback: this.onDocumentClickHandler,
          capture: true,
          eventName: this.environment.touchedPlatform ? TouchEventsEnum.TOUCH_START : EventsEnum.MOUSE_DOWN,
        });
      }
    });
  }

  /**
   * @stable [15.06.2020]
   */
  protected onCloseVirtualKeyboard(): void {
    super.onCloseVirtualKeyboard();

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
    if (!this.isKeyboardUsed || !this.isSyntheticCursorUsed || this.isValueNotPresent) {
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
      this.isSyntheticCursorUsed && this.isKeyboardOpen() && state.caretVisibility && !R.isNil(state.caretPosition),
      () => (
        <div className='rac-field__input-caret'
             style={{left: state.caretPosition + parseValueAtPx(this.jqInput.css('paddingLeft')) - textOffset}}>
          |
        </div>
      )
    );
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
   * @stable [16.02.2019]
   * @param {IBaseEvent} e
   */
  private onDocumentClickHandler(e: IBaseEvent): void {
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
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isKeyboardInline(): boolean {
    return isInline(this.getKeyboardProps());
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
   * @stable [18.06.2020]
   * @returns {boolean}
   */
  private get isActioned(): boolean {
    return ObjectUtils.isObjectNotEmpty(this.fieldActions);
  }
}
