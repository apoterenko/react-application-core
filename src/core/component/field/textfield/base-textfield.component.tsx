import * as React from 'react';
import * as R from 'ramda';

import MaskedTextInput from 'react-text-mask';

import { DI_TYPES, lazyInject } from '../../../di';
import { IEventManager } from '../../../event';
import {
  orNull,
  toClassName,
  nvl,
  cancelEvent,
  toJqEl,
  parseValueAtPx,
  ifNotNilThanValue,
  isFn,
  ifNotFalseThanValue,
} from '../../../util';
import { UNI_CODES, IChangeEvent, IJQueryElement } from '../../../definitions.interface';
import {
  IFieldActionConfiguration,
  FieldActionPositionEnum,
  IKeyboardConfiguration,
} from '../../../configurations-definitions.interface';
import { Field } from '../field';
import { ProgressLabel } from '../../progress';
import { Keyboard } from '../../keyboard';
import { ENV } from '../../../env';
import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
  IBaseTextField,
} from './base-textfield.interface';
import { IBasicEvent } from '../../../react-definitions.interface';

export class BaseTextField<TProps extends IBaseTextFieldProps,
                           TState extends IBaseTextFieldState>
    extends Field<TProps, TState>
    implements IBaseTextField<TProps, TState> {

  private static readonly DEFAULT_MASK_GUIDE = false;

  @lazyInject(DI_TYPES.EventManager) protected eventManager: IEventManager;
  protected defaultActions: IFieldActionConfiguration[] = [];
  private readonly mirrorInputRef = React.createRef<HTMLElement>();
  private readonly keyboardRef = React.createRef<Keyboard>();
  private keyboardWindowMouseDownSubscriber: () => void;

  /**
   * @stable [25.02.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onKeyboardChange = this.onKeyboardChange.bind(this);
    this.onKeyboardWindowMouseDownHandler = this.onKeyboardWindowMouseDownHandler.bind(this);

    ifNotFalseThanValue(props.clearActionRendered, () => this.addClearAction());
  }

  /**
   * @stable [25.02.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div className={this.getFieldClassName()}>
        {this.props.children}
        {this.getSelfElement()}
        {this.getMessageElement()}
        {this.getErrorMessageElement()}
        {this.getAttachmentElement()}
        {this.getKeyboardElement()}
      </div>
    );
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
   * @stable [01.06.2018]
   * @returns {JSX.Element}
   */
  protected getAttachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [07.11.2018]
   * @returns {string}
   */
  protected getSelfElementClassName(): string {
    return toClassName(
      super.getSelfElementClassName(),
      'rac-text-field',
      'rac-flex',
      'rac-flex-row'
    );
  }

  protected addClearAction(): void {
    const this0 = this;
    const clearAction: IFieldActionConfiguration = {
      type: 'close',
      onClick() {
        this0.clearValue();
      },
      get disabled(): boolean {
        return this0.isFieldInactive() || !this0.isValuePresent();
      },
    };
    this.defaultActions.push(clearAction);
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected keyboardElement(): JSX.Element {
    return (
      <Keyboard
        ref={this.keyboardRef}
        field={this.input}
        onClose={this.closeSyntheticKeyboard}
        onChange={this.onKeyboardChange}
        {...this.getKeyboardConfiguration()}/>
    );
  }

  /**
   * @stable [13.01.2019]
   * @returns {boolean}
   */
  protected isKeyboardOpened(): boolean {
    return super.isKeyboardOpened() || this.getKeyboardConfiguration().renderToBody === false;
  }

  /**
   * @stable [21.11.2018]
   * @returns {IKeyboardConfiguration}
   */
  protected getKeyboardConfiguration(): IKeyboardConfiguration {
    return this.props.keyboardConfiguration || {};
  }

  /**
   * @stable [23.02.2019]
   */
  protected openSyntheticKeyboard(): boolean {
    const result = super.openSyntheticKeyboard();
    if (result) {
      this.keyboardWindowMouseDownSubscriber =
        this.eventManager.subscribe(window, 'mousedown', this.onKeyboardWindowMouseDownHandler);
    }
    return result;
  }

  /**
   * @stable [23.02.2019]
   */
  protected onCloseKeyboard(): void {
    super.onCloseKeyboard();

    if (isFn(this.keyboardWindowMouseDownSubscriber)) {
      this.keyboardWindowMouseDownSubscriber();
      this.keyboardWindowMouseDownSubscriber = null;
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
    return this.isValuePresent()
      ? Math.min(this.jMirrorInput.width(), this.jqInput.width())
      : 0;
  }

  /**
   * @stable [21.09.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-base-text-field');
  }

  /**
   * @stable [16.02.2019]
   * @param {IBasicEvent} e
   */
  private onKeyboardWindowMouseDownHandler(e: IBasicEvent): void {
    const clickedEl = e.target as Element;

    if (this.domAccessor.hasParent('.rac-action-close-icon', clickedEl)) {
      if (this.isValuePresent()) {
        this.clearValue();
      }
    } else if (!(this.input === clickedEl
                  || this.domAccessor.hasElements(clickedEl, this.keyboardRef.current.getSelf()))) {
      this.closeSyntheticKeyboard();
    }
  }

  private get actions(): IFieldActionConfiguration[] {
    const props = this.props;
    const defaultActions = this.defaultActions || [];
    const actions = props.actions || [];
    if (props.actionsPosition === FieldActionPositionEnum.LEFT) {
      return defaultActions.concat(actions);
    } else {
      return actions.concat(defaultActions);
    }
  }

  private getSelfElement(): JSX.Element {
    const props = this.props;
    return orNull<JSX.Element>(
      props.fieldRendered !== false,
      () => (
        <div ref='self'
             style={props.style}
             className={this.getSelfElementClassName()}>
          {this.getPrefixLabelElement()}
          <div className={this.getInputElementWrapperClassName()}>
            {this.getInputElement()}
            {this.getLabelElement()}
            {this.getMirrorInputElement()}
            {this.getInputCaretElement()}
            {this.getInputAttachmentElement()}
          </div>
          {this.actionsElement}
          {this.getProgressLabelElement()}
        </div>
      )
    );
  }

  /**
   *
   * @returns {JSX.Element}
   */
  private getProgressLabelElement(): JSX.Element {
    return orNull<JSX.Element>(
      this.inProgress(),
      () => <ProgressLabel className='rac-field-loader rac-absolute-center-position'/>
    );
  }

  /**
   * @stable [15.09.2018]
   * @returns {JSX.Element}
   */
  private getPrefixLabelElement(): JSX.Element {
    const props = this.props;
    return (
      orNull<JSX.Element>(
        props.prefixLabel,
        <span className='rac-field-prefix-label rac-absolute-left-center-position'>{props.prefixLabel}</span>
      )
    );
  }

  /**
   * @stable [12.09.2018]
   * @returns {JSX.Element}
   */
  private getMirrorInputElement(): JSX.Element {
    const props = this.props;
    if (!props.useKeyboard || !this.isValuePresent() || !this.useSyntheticCursor) {
      return null;
    }

    // TODO Move to support
    const value = this.value;
    const content = String((
      props.type === 'password'
        ? String(value).replace(/./g, ENV.passwordInputPlaceholder)
        : value
    )).replace(/ /g, UNI_CODES.noBreakSpace);

    return (
      <span ref={this.mirrorInputRef}
            className={toClassName(
              this.getInputElementProps().className,
              'rac-field-input-mirror',
              'rac-invisible'
            )}>
        {content}
      </span>
    );
  }

  /**
   * @stable [03.10.2018]
   * @returns {JSX.Element}
   */
  private getLabelElement(): JSX.Element {
    const props = this.props;
    return ifNotNilThanValue(
      props.label,
      () => (
        <label className='rac-field-label'>
          {this.t(props.label)}
        </label>
      )
    );
  }

  /**
   * @stable [04.09.2018]
   * @returns {JSX.Element}
   */
  private getInputCaretElement(): JSX.Element {
    const state = this.state;
    const textOffset = 2;

    return orNull<JSX.Element>(
      this.useSyntheticCursor && state.keyboardOpened && state.caretVisibility && !R.isNil(state.caretPosition),
      () => (
        <div className='rac-field-input-caret'
             style={{left: state.caretPosition + parseValueAtPx(this.jqInput.css('paddingLeft')) - textOffset}}>
          |
        </div>
      )
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
   * @stable [24.05.2019]
   * @returns {JSX.Element}
   */
  private get actionsElement(): JSX.Element {
    return (
      <React.Fragment>
        {
          this.actions.map((action) => this.uiFactory.makeIcon({
            key: `action-key-${action.type}`,
            type: action.type,
            title: action.title && this.t(action.title),
            className: action.className,
            disabled: nvl(action.disabled, this.isFieldInactive()),
            onClick: (event: IBasicEvent) => {
              if (isFn(action.onClick)) {
                cancelEvent(event);
                action.onClick(event);
              }
            },
          }))
        }
      </React.Fragment>
    );
  }
}
