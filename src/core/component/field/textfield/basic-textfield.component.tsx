import * as React from 'react';
import * as R from 'ramda';
import * as $ from 'jquery';

import MaskedTextInput from 'react-text-mask';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { DI_TYPES, lazyInject } from '../../../di';
import { IEventManager } from '../../../event';
import { orNull, toClassName, nvl, cancelEvent, IJqElement, parseValueAtPx } from '../../../util';
import { UNI_CODES, IChangeEvent } from '../../../definitions.interface';
import { IFieldActionConfiguration, FieldActionPositionEnum } from '../../../configurations-definitions.interface';
import { Field, IField } from '../field';
import { ProgressLabel } from '../../progress';
import { Keyboard } from '../../keyboard';
import { ENV } from '../../../env';
import {
  IBasicTextFieldState,
  IBasicTextFieldProps,
  IBasicTextField,
} from './basic-textfield.interface';
import { IBasicEvent } from '../../../react-definitions.interface';

export class BasicTextField<TComponent extends IField<TInternalProps, TInternalState>,
                            TInternalProps extends IBasicTextFieldProps,
                            TInternalState extends IBasicTextFieldState>
    extends Field<TComponent,
                  TInternalProps,
                  TInternalState>
    implements IBasicTextField<TInternalProps, TInternalState> {

  protected static logger = LoggerFactory.makeLogger('BasicTextField');

  private static DEFAULT_MASK_GUIDE = false;

  @lazyInject(DI_TYPES.EventManager) protected eventManager: IEventManager;
  protected defaultActions: IFieldActionConfiguration[] = [];
  private mirrorInputRef = React.createRef<HTMLElement>();

  constructor(props: TInternalProps) {
    super(props);
    this.onWindowMouseDown = this.onWindowMouseDown.bind(this);
    this.onKeyboardChange = this.onKeyboardChange.bind(this);

    if (this.props.clearActionRendered !== false) {
      this.addClearAction();
    }
  }

  /**
   * @stable [15.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div className={this.getFieldClassName()}
           style={orNull(this.context.muiTheme, () => this.context.muiTheme.prepareStyles({}))}>
        {this.getSelfElement()}
        {this.getMessageElement()}
        {this.getErrorMessageElement()}
        {this.getAttachmentElement()}
        {this.getKeyboardElement()}
      </div>
    );
  }

  protected getInputElement(): JSX.Element {
    const mask = this.getFieldMask();
    const props = this.props;

    return !R.isNil(mask)
        ? <MaskedTextInput
            guide={nvl(props.maskGuide, BasicTextField.DEFAULT_MASK_GUIDE)}
            placeholderChar={nvl(props.maskPlaceholderChar, UNI_CODES.space)}
            mask={mask}
            {...this.getInputElementProps()}/>
        : super.getInputElement();
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
    return 'rac-text-field rac-flex rac-flex-row';
  }

  protected addClearAction(): void {
    const this0 = this;
    const clearAction: IFieldActionConfiguration = {
      type: 'clear',
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
  protected toKeyboardElement(): JSX.Element {
    return (
      <Keyboard ref='keyboard'
                field={this.input}
                onClose={this.closeSyntheticKeyboard}
                onChange={this.onKeyboardChange}/>
    );
  }

  /**
   * @stable [20.08.2018]
   */
  protected openSyntheticKeyboard(): boolean {
    const result = super.openSyntheticKeyboard();
    if (result) {
      this.eventManager.add(window, 'mousedown', this.onWindowMouseDown);
    }
    return result;
  }

  /**
   * @stable [04.09.2018]
   */
  protected onCloseKeyboard(): boolean {
    const result = super.onCloseKeyboard();
    if (result) {
      this.eventManager.remove(window, 'mousedown', this.onWindowMouseDown);
    }
    return result;
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
   * @stable [16.05.2018]
   * @param {IBasicEvent} e
   */
  private onWindowMouseDown(e: IBasicEvent): void {
    const keyboard = $((this.refs.keyboard as Keyboard).self);
    const targetEl = e.target as HTMLElement;

    if (this.input === targetEl || keyboard.find(targetEl).length !== 0) {
      return;
    }
    this.closeSyntheticKeyboard();
  }

  private get actions(): IFieldActionConfiguration[] {
    const props = this.props;
    if (props.actionsPosition === FieldActionPositionEnum.LEFT) {
      return (this.defaultActions || []).concat(props.actions || []);
    } else {
      return (this.props.actions || []).concat(this.defaultActions || []);
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
          {orNull(
            this.actions,
            this.actions.map((action) => this.uiFactory.makeIcon({
              type: action.type,
              title: action.title && this.t(action.title),
              className: action.className,
              disabled: R.isNil(action.disabled)
                ? this.isFieldInactive()
                : action.disabled,
              onClick: (event: IBasicEvent) => {
                if (action.onClick) {
                  cancelEvent(event);
                  action.onClick(event);
                }
              },
            }))
          )}
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
    if (!props.useKeyboard || !this.isValuePresent()) {
      return null;
    }

    // TODO Move to support
    const value = this.value;
    const content = String((
      props.type === 'password'
        ? value.replace(/./g, ENV.passwordInputPlaceholder)
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
    const fieldLabel = props.label ? this.t(props.label) : props.children;
    return orNull<JSX.Element>(
      fieldLabel,
      () => (
        <label className={'rac-field-label'}>
          {fieldLabel}
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

    return orNull<JSX.Element>(
      state.keyboardOpened && state.caretVisibility && !R.isNil(state.caretPosition),
      () => (
        <div className='rac-field-input-caret'
             style={{left: state.caretPosition + parseValueAtPx(this.jqInput.css('paddingLeft'))}}>
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
   * @stable [12.09.2018]
   * @returns {IJqElement}
   */
  private get jMirrorInput(): IJqElement {
    return $(this.mirrorInputRef.current);
  }
}
