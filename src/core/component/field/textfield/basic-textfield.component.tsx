import * as React from 'react';
import * as R from 'ramda';
import * as $ from 'jquery';
import MaskedTextInput from 'react-text-mask';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { orNull, toClassName, nvl, cancelEvent } from '../../../util';
import { IFocusEvent, IBasicEvent, IKeyboardEvent, UNI_CODES } from '../../../definitions.interface';
import { IFieldActionConfiguration, FieldActionPositionEnum } from '../../../configurations-definitions.interface';
import { Field, IField } from '../field';
import { ProgressLabel } from '../../progress';
import { Keyboard } from '../../keyboard';
import {
  IBasicTextFieldState,
  IBasicTextFieldProps,
  IBasicTextField,
} from './basic-textfield.interface';
export class BasicTextField<TComponent extends IField<TInternalProps, TInternalState>,
                            TInternalProps extends IBasicTextFieldProps,
                            TInternalState extends IBasicTextFieldState>
    extends Field<TComponent,
                  TInternalProps,
                  TInternalState>
    implements IBasicTextField<TInternalProps, TInternalState> {

  protected static logger = LoggerFactory.makeLogger(BasicTextField);

  private static CHAR_WIDTH_AT_PX = 10;
  private static DEFAULT_MASK_GUIDE = false;

  protected defaultActions: IFieldActionConfiguration[] = [];

  constructor(props: TInternalProps) {
    super(props);
    this.closeKeyboard = this.closeKeyboard.bind(this);
    this.onWindowMouseDown = this.onWindowMouseDown.bind(this);

    if (this.props.clearAction !== false) {
      this.addClearAction();
    }
  }

  /**
   * @stable [16.05.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.onCloseKeyboard();
  }

  public render(): JSX.Element {
    const props = this.props;
    const fieldLabel = props.label ? this.t(props.label) : props.children;

    return (
        <div className={this.getFieldClassName()}
             style={orNull(this.context.muiTheme, () => this.context.muiTheme.prepareStyles({}))}>
          <div ref='self'
               style={props.style}
               className={this.getSelfElementClassName()}>
            {orNull(
                props.prefixLabel,
                <span className='rac-text-field-prefix-label'>{props.prefixLabel}</span>
            )}
            <div className={this.getInputElementWrapperClassName()}>
              {this.getInputElement()}
              {
                orNull(
                    fieldLabel,
                    () => (
                        <label style={{paddingLeft: props.prefixLabel
                              ? (props.prefixLabel.length * BasicTextField.CHAR_WIDTH_AT_PX) + 'px'
                              : undefined}}
                               className={toClassName(
                                   'rac-field-label',
                                   this.uiFactory.textFieldLabel,
                                   this.isFieldFocused() && 'rac-floating-focused-label',
                                   this.isFieldFocused() && this.uiFactory.textFieldFocusedLabel
                               )}>
                          {props.label ? this.t(props.label) : props.children}
                        </label>
                    )
                )
              }
              {this.getInputAttachmentElement()}
            </div>
            {orNull(
                this.actions,
                this.actions.map((action) => this.uiFactory.makeIcon({
                  type: action.type,
                  title: action.title && this.t(action.title),
                  className: action.className,
                  disabled: R.isNil(action.disabled)
                      ? this.isDeactivated()
                      : action.disabled,
                  onClick: (event: IBasicEvent) => {
                    if (action.onClick) {
                      cancelEvent(event);
                      action.onClick(event);
                    }
                  },
                }))
            )}
            {orNull(
              this.inProgress(),
              () => <ProgressLabel className='rac-text-field-loader'/>
            )}
          </div>
          {this.fieldMessage}
          {this.fieldErrorMessageElement}
          {this.getAttachment()}
          {
            orNull<JSX.Element>(
              props.useKeyboard && this.state.keyboardOpened,
              () => (
                <Keyboard ref='keyboard'
                          field={this.input}
                          onClose={this.closeKeyboard}
                          onChange={this.onChangeManually}/>
              )
            )
          }
        </div>
    );
  }

  /**
   * @stable [16.05.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyTab(event: IKeyboardEvent) {
    this.closeKeyboard();
    super.onKeyTab(event);
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
  protected getAttachment(): JSX.Element {
    return null;
  }

  protected getInputAttachmentElement(): JSX.Element {
    return null;
  }

  protected getSelfElementClassName(): string {
    const error = this.error;

    return toClassName(
        'rac-text-field',
        this.uiFactory.textField,
        this.uiFactory.textFieldUpgraded,
        this.isFieldFocused() && this.uiFactory.textFieldFocused,
        error && this.uiFactory.textFieldInvalid
    );
  }

  protected addClearAction(): void {
    const this0 = this;
    const clearAction: IFieldActionConfiguration = {
      type: 'clear',
      onClick() {
        this0.clearValue();
      },
      get disabled(): boolean {
        return this0.isDeactivated() || !this0.isValuePresent();
      },
    };
    this.defaultActions.push(clearAction);
  }

  /**
   * @stable [02.07.2018]
   * @param {IFocusEvent} event
   * @returns {boolean}
   */
  protected onFocus(event: IFocusEvent): boolean {
    const result = super.onFocus(event);
    if (result) {
      this.openKeyboard();
    }
    return result;
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
    this.closeKeyboard();
  }

  /**
   * @stable [16.05.2018]
   */
  private closeKeyboard(): void {
    const props = this.props;
    if (!props.useKeyboard) {
      return;
    }
    this.setState({keyboardOpened: false});
    this.onCloseKeyboard();

    BasicTextField.logger.debug(
      `[$BasicTextField][closeKeyboard] A keyboard has been closed to the field "${props.name}".`
    );
  }

  /**
   * @stable [16.05.2018]
   */
  private onCloseKeyboard(): void {
    if (!this.props.useKeyboard) {
      return;
    }
    this.eventManager.remove(window, 'mousedown', this.onWindowMouseDown);
  }

  /**
   * @stable [16.05.2018]
   */
  private openKeyboard(): void {
    const props = this.props;
    if (!props.useKeyboard || this.state.keyboardOpened) {
      return;
    }
    this.setState({keyboardOpened: true});
    this.eventManager.add(window, 'mousedown', this.onWindowMouseDown);

    BasicTextField.logger.debug(
      `[$BasicTextField][openKeyboard] A keyboard has been opened to the field "${props.name}".`
    );
  }

  private get actions(): IFieldActionConfiguration[] {
    const props = this.props;
    if (props.actionsPosition === FieldActionPositionEnum.LEFT) {
      return (this.defaultActions || []).concat(props.actions || []);
    } else {
      return (this.props.actions || []).concat(this.defaultActions || []);
    }
  }
}
