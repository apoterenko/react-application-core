import * as React from 'react';
import * as R from 'ramda';
import MaskedTextInput from 'react-text-mask';

import { orNull, toClassName } from '../../../util';
import { BasicEventT } from '../../../definition.interface';
import { Field, IField } from '../field';
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
    const isFocused = props.autoFocus || this.isValuePresent;

    const prepareStyles = this.context.muiTheme
        ? this.context.muiTheme.prepareStyles
        : (styles) => styles;

    return (
        <div className={this.uiFactory.formField}
             style={prepareStyles({})}>
          <div ref='self'
               style={props.style}
               className={toClassName(
                   'mdc-text-field',
                   'mdc-text-field--upgraded',
                   'rac-text-field',
                   'app-text-field',
                   props.className,
                   this.isDeactivated && 'app-text-field-deactivated',
                   isFocused && 'mdc-text-field--focused',
                   props.prefixLabel && 'app-text-field-prefixed'
                   )}>
            {orNull(
                props.prefixLabel,
                <span className='app-text-field-prefix'>{props.prefixLabel}</span>
            )}
            {this.getComponent()}
            <label style={{paddingLeft: props.prefixLabel
                  ? (props.prefixLabel.length * BasicTextField.CHAR_WIDTH_AT_PX) + 'px'
                  : undefined}}
                   className={
                     toClassName('mdc-text-field__label', isFocused && 'mdc-text-field__label--float-above')
                   }>
              {props.label ? this.t(props.label) : props.children}
            </label>
            {orNull(
                this.actions,
                this.actions.map((action) => this.uiFactory.makeIcon({
                  type: action.type,
                  title: action.title && this.t(action.title),
                  classes: ['rac-action', action.className],
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
                this.isLoaderShowed,
                this.uiFactory.makeIcon({
                  type: 'timelapse',
                  classes: ['app-text-field-loader'],
                })
            )}
          </div>
          {this.getMessage(props.message, false)}
          {orNull(
              !props.noErrorMessage,
              this.getMessage(error, !props.notErrorMessageRequired)
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

  protected get isLoaderShowed(): boolean {
    return false;
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

  private getMessage(m: string, required: boolean): JSX.Element {
    return m || required ? (
        <p title={m}
           className={toClassName(
               'mdc-text-field-helptext',
               'mdc-text-field-helptext--persistent',
               required && 'mdc-text-field-helptext--validation-msg'
           )}>
          {m ? this.t(m) : '\u00a0'}
        </p>
    ) : null;
  }
}
