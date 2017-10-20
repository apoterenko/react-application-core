import * as React from 'react';
import MaskedTextInput from 'react-text-mask';
import { MDCTextfield } from '@material/textfield';

import { toClassName, uuid } from '../../../util';
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

    const className = [
      'mdc-textfield mdc-textfield--upgraded app-textfield',
      props.className,
      isFocused && 'mdc-textfield--focused'
    ];
    const labelClassName = [
      'mdc-textfield__label',
      isFocused && 'mdc-textfield__label--float-above'
    ];

    const prepareStyles = this.context.muiTheme
        ? this.context.muiTheme.prepareStyles
        : (styles) => styles;

    const actionsTpl = this.actions
        ? (
            this.actions.map((action) => (
                <button key={uuid()}
                        disabled={action.disabled}
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
               className={className.filter((cls) => !!cls).join(' ')}>
            {this.getComponent()}
            <label className={labelClassName.filter((cls) => !!cls).join(' ')}>
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
    return {
      ref: 'input',
      name: props.name,
      value: this.value,
      className: 'mdc-textfield__input',
      placeholder: props.placeholder ? this.t(props.placeholder) : null,
      type: props.type || 'text',
      pattern: props.pattern,
      minLength: props.min,
      maxLength: props.max,
      required: props.required,
      autoFocus: props.autoFocus,
      mask: props.mask,
      autoComplete: 'off',
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onClick: this.onClick,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
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
