import * as React from 'react';
import MaskedTextInput from 'react-text-mask';
import { MDCTextfield } from '@material/textfield';

import { noop, toClassName, uuid } from '../../../util';
import { AnyT, IKeyValue, ChangeEventT, BasicEventT } from '../../../definition.interface';

import { Field, IField } from '../field';
import {
  IBasicTextFieldInternalState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
  INativeMaterialBasicTextFieldComponent,
  IBasicTextFieldAction,
} from './basic-textfield.interface';

export class BasicTextField<TComponent extends IField<TInternalProps, TInternalState, ChangeEventT>,
                            TInternalProps extends IBasicTextFieldInternalProps,
                            TInternalState extends IBasicTextFieldInternalState,
                            TNativeMaterialComponent extends INativeMaterialBasicTextFieldComponent>
    extends Field<TComponent,
                  TInternalProps,
                  TInternalState,
                  TNativeMaterialComponent,
                  ChangeEventT>
    implements IBasicTextField<TInternalProps, TInternalState> {

  constructor(props: TInternalProps) {
    super(props, MDCTextfield);
  }

  public render(): JSX.Element {
    const props = this.props;
    const error = this.error;
    const isFocused = props.autoFocus || this.isValuePresent;

    const prepareStyles = this.context.muiTheme
        ? this.context.muiTheme.prepareStyles
        : (styles) => styles;

    const actionsTpl = this.actions
        ? (
            this.actions.map((action) => (
                <button key={uuid()}
                        disabled={action.disabled || this.isDeactivated}
                        title={action.title && this.t(action.title)}
                        className={
                          toClassName('material-icons', 'mdc-toolbar__icon', 'app-action', action.className)
                        }
                        onClick={(event: BasicEventT) => {
                          if (action.actionHandler) {
                            this.stopEvent(event);
                            action.actionHandler(event);
                          }
                        }}>
                  {action.type}
                </button>
            ))
        )
        : null;

    return (
        <div className='app-textfield-wrapper'
             style={prepareStyles({...props.wrapperStyle as {}})}>
          <div ref='self'
               style={props.style}
               className={toClassName(
                   'mdc-textfield',
                   'mdc-textfield--upgraded',
                   'app-textfield',
                   props.className,
                   isFocused && 'mdc-textfield--focused')}>
            {this.getComponent()}
            <label className={
              toClassName('mdc-textfield__label', isFocused && 'mdc-textfield__label--float-above')
            }>
              {props.label ? this.t(props.label) : props.children}
            </label>
            {actionsTpl}
          </div>
          <p title={error || ''}
             className='mdc-textfield-helptext mdc-textfield-helptext--persistent mdc-textfield-helptext--validation-msg'>
            {error ? this.t(error) : '\u00a0'}
          </p>
          {this.getAttachment()}
        </div>
    );
  }

  public resetError(): void {
    super.resetError();
    this.nativeMdcInstance.getDefaultFoundation().setValid(true);
  }

  protected getComponentProps(): IKeyValue {
    const props = this.props;
    const autoFocus = props.autoFocus;
    const name = props.name;
    const type = props.type || 'text';
    const readOnly = props.readOnly;
    const mask = props.mask;
    const pattern = props.pattern;
    const required = props.required;
    const minLength = props.minLength;
    const maxLength = props.maxLength;
    const onFocus = this.onFocus;
    const onBlur = this.onBlur;
    const onClick = this.isDeactivated ? noop : this.onClick;
    const onChange = this.onChange;
    const onKeyDown = this.onKeyDown;
    const onKeyUp = this.onKeyUp;
    return {
      name, type, autoFocus, readOnly, mask, pattern, required, minLength, maxLength,
      onFocus, onBlur, onClick, onChange, onKeyDown, onKeyUp,
      ref: 'input',
      value: this.value,
      className: 'mdc-textfield__input',
      placeholder: props.placeholder ? this.t(props.placeholder) : null,
      autoComplete: 'off',
    };
  }

  protected getComponent(): JSX.Element {
    const componentProps = this.getComponentProps();
    return componentProps.mask
        ? <MaskedTextInput guide={false}
                           {...componentProps}/>
        : <input {...componentProps}/>;
  }

  protected getAttachment(): JSX.Element {
    return null;
  }

  protected getEmptyValue(): string {
    return '';
  }

  protected getRawValueFromEvent(event: ChangeEventT): AnyT {
    return event.target.value;
  }

  protected get actions(): IBasicTextFieldAction[] {
    return this.props.actions;
  }

  protected cleanNativeInputForSupportHTML5Validation(): void {
    this.input.value = '';  // We should reset the field manually before HTML5 validation will be called
  }
}
