import * as React from 'react';
import * as R from 'ramda';
import * as $ from 'jquery';
import MaskedTextInput from 'react-text-mask';
import { LoggerFactory } from 'ts-smart-logger';

import { orNull, toClassName, nvl } from '../../../util';
import { IFocusEvent, IBasicEvent, IKeyboardEvent } from '../../../definitions.interface';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';
import { Field, IField } from '../field';
import { ProgressLabel } from '../../progress';
import { Keyboard } from '../../keyboard';
import {
  IBasicTextFieldInternalState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
  ActionPositionEnum,
} from './basic-textfield.interface';

export class BasicTextField<TComponent extends IField<TInternalProps, TInternalState>,
                            TInternalProps extends IBasicTextFieldInternalProps,
                            TInternalState extends IBasicTextFieldInternalState>
    extends Field<TComponent,
                  TInternalProps,
                  TInternalState>
    implements IBasicTextField<TInternalProps, TInternalState> {

  protected static logger = LoggerFactory.makeLogger(BasicTextField);

  private static CHAR_WIDTH_AT_PX = 10;
  private static DEFAULT_MASK_GUIDE = true;
  private static DEFAULT_MASK_PLACEHOLDER_CHAR = '\u2000';

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
    const autoFocusOrValuePresent = props.autoFocus || this.isValuePresent();
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
                                   this.uiFactory.textFieldLabel,
                                   autoFocusOrValuePresent && this.uiFactory.textFieldFocusedLabel
                               )}>
                          {props.label ? this.t(props.label) : props.children}
                        </label>
                    )
                )
              }
              {this.getInputElementAttachment()}
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
                      this.stopEvent(event);
                      action.onClick(event);
                    }
                  },
                }))
            )}
            {orNull(
              this.progress,
              () => <ProgressLabel className='rac-text-field-loader'/>
            )}
          </div>
          {this.getFieldMessage()}
          {this.getFieldErrorMessage()}
          {this.getAttachment()}
          {
            orNull<JSX.Element>(
              props.useKeyboard && this.state.keyboard,
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
            placeholderChar={nvl(props.maskPlaceholderChar, BasicTextField.DEFAULT_MASK_PLACEHOLDER_CHAR)}
            mask={mask}
            {...this.getInputElementProps()}/>
        : super.getInputElement();
  }

  protected getAttachment(): JSX.Element {
    return null;
  }

  protected getInputElementAttachment(): JSX.Element {
    return null;
  }

  protected getSelfElementClassName(): string {
    const props = this.props;
    const error = this.error;

    return toClassName(
        'rac-text-field',
        this.uiFactory.textField,
        this.uiFactory.textFieldUpgraded,
        this.hasInputFocus && this.uiFactory.textFieldFocused,
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
   * @stable [16.05.2018]
   * @param {IFocusEvent} event
   */
  protected onFocus(event: IFocusEvent): void {
    super.onFocus(event);
    this.openKeyboard();
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
    this.setState({keyboard: false});
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
    if (!props.useKeyboard || this.state.keyboard) {
      return;
    }
    this.setState({keyboard: true});
    this.eventManager.add(window, 'mousedown', this.onWindowMouseDown);

    BasicTextField.logger.debug(
      `[$BasicTextField][openKeyboard] A keyboard has been opened to the field "${props.name}".`
    );
  }

  private get actions(): IFieldActionConfiguration[] {
    const props = this.props;
    if (props.actionsPosition === ActionPositionEnum.LEFT) {
      return (this.defaultActions || []).concat(props.actions || []);
    } else {
      return (this.props.actions || []).concat(this.defaultActions || []);
    }
  }
}
