import * as React from 'react';
import * as R from 'ramda';

import MaskedTextInput from 'react-text-mask';

import {
  calc,
  ifNotFalseThanValue,
  isFn,
  joinClassName,
  nvl,
  orNull,
  parseValueAtPx,
  toJqEl,
} from '../../../util';
import { UNI_CODES, IChangeEvent, UniCodesEnum } from '../../../definitions.interface';
import {
  IKeyboardConfiguration,
} from '../../../configurations-definitions.interface';
import { Field } from '../field';
import { ProgressLabel } from '../../progress';
import { Keyboard } from '../../keyboard';
import {
  IBaseTextField,
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from './base-textfield.interface';
import {
  FieldActionPositionsEnum,
  FieldActionTypesEnum,
  IBaseEvent,
  IFieldActionEntity,
  IJQueryElement,
} from '../../../definition';

export class BaseTextField<TProps extends IBaseTextFieldProps,
                           TState extends IBaseTextFieldState>
    extends Field<TProps, TState>
    implements IBaseTextField<TProps, TState> {

  private static readonly DEFAULT_MASK_GUIDE = false;

  protected defaultActions: IFieldActionEntity[] = [];
  private readonly mirrorInputRef = React.createRef<HTMLElement>();
  private readonly keyboardRef = React.createRef<Keyboard>();
  private keyboardListenerUnsubscriber: () => void;

  /**
   * @stable [25.02.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onKeyboardChange = this.onKeyboardChange.bind(this);
    this.onDocumentClickHandler = this.onDocumentClickHandler.bind(this);

    ifNotFalseThanValue(props.clearActionRendered, () => this.addClearAction());
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
   * @stable [24.10.2019]
   * @returns {string}
   */
  protected getSelfElementClassName(): string {
    return joinClassName(super.getSelfElementClassName(), 'rac-text-field');
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
        {...this.getKeyboardConfiguration()}/>
    );
  }

  /**
   * @stable [13.01.2019]
   * @returns {boolean}
   */
  protected isKeyboardOpen(): boolean {
    return super.isKeyboardOpen() || this.getKeyboardConfiguration().renderToBody === false;
  }

  /**
   * @stable [21.11.2018]
   * @returns {IKeyboardConfiguration}
   */
  protected getKeyboardConfiguration(): IKeyboardConfiguration {
    return this.props.keyboardConfiguration || {};
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected openVirtualKeyboard(): boolean {
    const result = super.openVirtualKeyboard();
    if (result) {
      this.keyboardListenerUnsubscriber = this.domAccessor.attachClickListenerToDocument(this.onDocumentClickHandler);
    }
    return result;
  }

  /**
   * @stable [30.10.2019]
   */
  protected onCloseVirtualKeyboard(): void {
    super.onCloseVirtualKeyboard();

    if (isFn(this.keyboardListenerUnsubscriber)) {
      this.keyboardListenerUnsubscriber();
      this.keyboardListenerUnsubscriber = null;
    }
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
   * @stable [23.10.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-base-text');
  }

  /**
   *
   * @returns {JSX.Element}
   */
  protected getProgressLabelElement(): JSX.Element {
    return orNull(
      this.inProgress,
      () => <ProgressLabel className='rac-field-loader rac-absolute-center-position'/>
    );
  }

  /**
   * @stable [12.09.2018]
   * @returns {JSX.Element}
   */
  protected getMirrorInputElement(): JSX.Element {
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
      <span ref={this.mirrorInputRef}
            className={joinClassName(
              this.getInputElementProps().className,
              'rac-field-input-mirror',
              'rac-invisible'
            )}>
        {content}
      </span>
    );
  }

  // TODO
  protected getInputCaretElement(): JSX.Element {
    const state = this.state;
    const textOffset = 2;

    return orNull(
      this.isSyntheticCursorUsed && this.isKeyboardOpen() && state.caretVisibility && !R.isNil(state.caretPosition),
      () => (
        <div className='rac-field-input-caret'
             style={{left: state.caretPosition + parseValueAtPx(this.jqInput.css('paddingLeft')) - textOffset}}>
          |
        </div>
      )
    );
  }

  /**
   * @stable [15.09.2018]
   * @returns {JSX.Element}
   */
  protected getPrefixLabelElement(): JSX.Element {
    const props = this.props;
    return (
      orNull<JSX.Element>(
        props.prefixLabel,
        <span className='rac-field-prefix-label rac-absolute-left-center-position'>{props.prefixLabel}</span>
      )
    );
  }

  /**
   * @stable [28.10.2019]
   * @param {} action
   * @returns {boolean}
   */
  protected isFieldActionDisabled(action: IFieldActionEntity): boolean {
    return calc(action.disabled) || this.isInactive;
  }

  /**
   * @stable [16.02.2019]
   * @param {IBaseEvent} e
   */
  private onDocumentClickHandler(e: IBaseEvent): void {
    // TODO refactoring
    const clickedEl = e.target as Element;

    if (this.domAccessor.hasParent('.rac-action-close-icon', clickedEl)) {
      if (this.isValuePresent) {
        this.clearValue();
      }
    } else if (!(this.input === clickedEl
                  || this.domAccessor.hasElements(clickedEl, this.keyboardRef.current.getSelf()))) {
      this.closeVirtualKeyboard();
    }
  }

  /**
   * @stable [30.10.2019]
   * @returns {IFieldActionEntity[]}
   */
  private get actions(): IFieldActionEntity[] {
    const props = this.props;
    const defaultActions = this.defaultActions || [];
    const actions = props.actions || [];

    return (
      props.actionsPosition === FieldActionPositionsEnum.LEFT
        ? defaultActions.concat(actions)
        : actions.concat(defaultActions)
    ).filter(
      (action) => action.type !== FieldActionTypesEnum.CLOSE ||
        (action.type === FieldActionTypesEnum.CLOSE && this.isValuePresent)
    );
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
        placeholderChar={nvl(props.maskPlaceholderChar, UNI_CODES.space)}
        mask={mask}
        {...this.getInputElementProps()}/>
    );
  }

  /**
   * @stable [28.10.2019]
   * @returns {JSX.Element}
   */
  protected get actionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {
          this.actions.map((action) => this.uiFactory.makeIcon({
            ...action,
            key: `action-key-${action.type}`,
            disabled: this.isFieldActionDisabled(action),
          }))
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
      disabled: () => this.isInactive || this.isValueNotPresent,
    });
  }
}
