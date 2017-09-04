import * as React from 'react';
import MaskedTextInput from 'react-text-mask';
import { MDCTextfield } from '@material/textfield';

import { INativeMaterialComponent } from 'core/component/material';
import { AnyT, IKeyValue, ChangeEventT } from 'core/definition.interface';
import {
  Field,
  IField,
  IFieldInternalProps,
  IFieldInternalState
} from 'core/component/field/field';

export class BasicTextField<TComponent extends IField<TInternalProps, TInternalState, ChangeEventT>,
                            TInternalProps extends IFieldInternalProps,
                            TInternalState extends IFieldInternalState>
    extends Field<TComponent,
                  TInternalProps,
                  TInternalState,
                  INativeMaterialComponent,
                  ChangeEventT> {

  constructor(props: TInternalProps) {
    super(props, MDCTextfield);
  }

  public render(): JSX.Element {
    const props = this.props,
        error = this.error;

    const className = [
      'mdc-textfield mdc-textfield--upgraded app-textfield',
      props.className,
      props.autoFocus && 'mdc-textfield--focused'
    ];
    const labelClassName = [
      'mdc-textfield__label',
      props.autoFocus && 'mdc-textfield__label--float-above'
    ];

    const prepareStyles = this.context.muiTheme
        ? this.context.muiTheme.prepareStyles
        : (styles) => styles;

    return (
        <div className='app-textfield-wrapper'
             style={prepareStyles({...props.wrapperStyle as Object})}>
          <div ref='self'
               style={props.style}
               className={className.filter(cls => !!cls).join(' ')}>
            {this.getComponent()}
            <label className={labelClassName.filter(cls => !!cls).join(' ')}>
              {props.label ? this.t(props.label) : props.children}
            </label>
          </div>
          <p title={error || ''}
             className='mdc-textfield-helptext mdc-textfield-helptext--persistent mdc-textfield-helptext--validation-msg'>
            {error ? this.t(error) : '\u00a0'}
          </p>
        </div>
    );
  }

  protected getComponentProps(): IKeyValue {
    const props = this.props;
    return {
      ref: 'input',
      name: props.name,
      value: this.value,
      className: 'mdc-textfield__input',
      placeholder: props.placeholder,
      type: props.type || 'text',
      pattern: props.pattern,
      minLength: props.min,
      maxLength: props.max,
      required: props.required,
      autoFocus: props.autoFocus,
      autoComplete: 'off',
      onFocus: this.onFocus,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };
  }

  protected getComponent(): JSX.Element {
    const componentProps = this.getComponentProps();
    return componentProps.mask
        ? <MaskedTextInput guide={false}
                           {...componentProps}/>
        : <input {...componentProps}/>;
  }

  protected getEmptyValue(): string {
    return '';
  }

  protected getRawValueFromEvent(event: ChangeEventT): AnyT {
    return event.target.value;
  }
}
