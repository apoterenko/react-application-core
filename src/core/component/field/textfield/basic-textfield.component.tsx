import * as React from 'react';
import * as R from 'ramda';
import MaskedTextInput from 'react-text-mask';

import { orNull, toClassName } from '../../../util';
import { BasicEventT } from '../../../definition.interface';
import { Field, IField } from '../field';
import { ProgressLabel } from '../../progress';
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

  protected defaultActions: IBasicTextFieldAction[] = [];

  constructor(props: TInternalProps) {
    super(props);

    if (this.props.clearAction !== false) {
      this.addClearAction();
    }
  }

  public render(): JSX.Element {
    const props = this.props;
    const error = this.error;
    const autoFocusOrValuePresent = props.autoFocus || this.isValuePresent;

    return (
        <div className={this.getFieldClassName()}
             style={orNull(this.context.muiTheme, () => this.context.muiTheme.prepareStyles({}))}>
          <div ref='self'
               style={props.style}
               className={toClassName(
                 this.uiFactory.textField,
                 'mdc-text-field--upgraded',
                 'rac-text-field',
                 props.className,
                 this.hasInputFocus && this.uiFactory.textFieldFocused,
                 error && this.uiFactory.textFieldInvalid
               )}>
            {orNull(
                props.prefixLabel,
                <span className='rac-text-field-prefix-label'>{props.prefixLabel}</span>
            )}
            {this.getComponent()}
            <label style={{paddingLeft: props.prefixLabel
                ? (props.prefixLabel.length * BasicTextField.CHAR_WIDTH_AT_PX) + 'px'
                : undefined}}
                   className={toClassName(
                     this.uiFactory.textFieldLabel,
                     autoFocusOrValuePresent && this.uiFactory.textFieldFocusedLabel
                   )}>
              {props.label ? this.t(props.label) : props.children}
            </label>
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
          {this.getMessage(props.message, false, 'rac-text-field-help-text-info')}
          {orNull(
            !props.noErrorMessage,
            this.getMessage(error, true, this.uiFactory.textFieldValidationText)
          )}
          {this.getAttachment()}
        </div>
    );
  }

  protected getComponent(): JSX.Element {
    const mask = this.getFieldMask();
    return !R.isNil(mask)
        ? <MaskedTextInput guide={false}
                           mask={mask}
                           {...this.getComponentProps()}/>
        : super.getComponent();
  }

  protected getAttachment(): JSX.Element {
    return null;
  }

  protected addClearAction(): void {
    const this0 = this;
    const clearAction: IBasicTextFieldAction = {
      type: 'clear',
      actionHandler() {
        this0.clearValue();
      },
      get disabled(): boolean {
        return this0.isDeactivated() || !this0.isValuePresent;
      },
    };
    this.defaultActions.push(clearAction);
  }

  private get actions(): IBasicTextFieldAction[] {
    const props = this.props;
    if (props.actionsPosition === ActionPositionEnum.LEFT) {
      return (this.defaultActions || []).concat(props.actions || []);
    } else {
      return (this.props.actions || []).concat(this.defaultActions || []);
    }
  }

  private getMessage(message: string, required: boolean, addClassName?: string): JSX.Element {
    return orNull(
      message || required,
      <p title={message}
         className={toClassName(
           'rac-text-field-help-text',
           this.uiFactory.textFieldHelpText,
           addClassName,
         )}>
        {message ? this.t(message) : '\u00a0'}
      </p>
    );
  }
}
