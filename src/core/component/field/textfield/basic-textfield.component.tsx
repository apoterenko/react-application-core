import * as React from 'react';
import * as R from 'ramda';
import * as $ from 'jquery';
import MaskedTextInput from 'react-text-mask';

import { orNull, toClassName, nvl } from '../../../util';
import { BasicEventT, IFocusEvent, IBasicEvent } from '../../../definitions.interface';
import { Field, IField } from '../field';
import { ProgressLabel } from '../../progress';
import { Keyboard } from '../../keyboard';
import {
  IBasicTextFieldInternalState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
  IBasicTextFieldAction,
  ActionPositionEnum,
} from './basic-textfield.interface';

export class BasicTextField<TComponent extends IField<TInternalProps, TInternalState>,
                            TInternalProps extends IBasicTextFieldInternalProps,
                            TInternalState extends IBasicTextFieldInternalState>
    extends Field<TComponent,
                  TInternalProps,
                  TInternalState>
    implements IBasicTextField<TInternalProps, TInternalState> {

  private static CHAR_WIDTH_AT_PX = 10;
  private static DEFAULT_MASK_GUIDE = true;
  private static DEFAULT_MASK_PLACEHOLDER_CHAR = '\u2000';

  protected defaultActions: IBasicTextFieldAction[] = [];

  constructor(props: TInternalProps) {
    super(props);
    this.onKeyboardClose = this.onKeyboardClose.bind(this);
    this.onWindowMouseDown = this.onWindowMouseDown.bind(this);

    if (this.props.clearAction !== false) {
      this.addClearAction();
    }
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
                  onClick: (event: BasicEventT) => {
                    if (action.actionHandler) {
                      this.stopEvent(event);
                      action.actionHandler(event);
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
                <Keyboard field={this.input}
                          onClose={this.onKeyboardClose}
                          onChange={this.onChangeManually}/>
              )
            )
          }
        </div>
    );
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
    const clearAction: IBasicTextFieldAction = {
      type: 'clear',
      actionHandler() {
        this0.clearValue();
      },
      get disabled(): boolean {
        return this0.isDeactivated() || !this0.isValuePresent();
      },
    };
    this.defaultActions.push(clearAction);
  }

  /**
   * @stable [09.05.2018]
   * @param {IFocusEvent} event
   */
  protected onFocus(event: IFocusEvent): void {
    super.onFocus(event);
    this.setState({keyboard: true});
    this.eventManager.add(window, 'mousedown', this.onWindowMouseDown);
  }

  /**
   * @stable [09.05.2018]
   * @param {IFocusEvent} event
   */
  protected onBlur(event: IFocusEvent): void {
    super.onBlur(event);
    this.eventManager.remove(window, 'mousedown', this.onWindowMouseDown);
  }

  /**
   * @stable [09.05.2018]
   * @param {IBasicEvent} e
   */
  private onWindowMouseDown(e: IBasicEvent): void {
    if (this.input === e.target || $(e.target).parents('.rac-keyboard').length !== 0) {
      return;
    }
    this.onKeyboardClose();
  }

  /**
   * @stable [09.05.2018]
   */
  private onKeyboardClose(): void {
    this.setState({keyboard: false});
  }

  private get actions(): IBasicTextFieldAction[] {
    const props = this.props;
    if (props.actionsPosition === ActionPositionEnum.LEFT) {
      return (this.defaultActions || []).concat(props.actions || []);
    } else {
      return (this.props.actions || []).concat(this.defaultActions || []);
    }
  }
}
