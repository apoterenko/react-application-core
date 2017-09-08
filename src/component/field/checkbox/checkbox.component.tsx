import * as React from 'react';
import { MDCCheckbox } from '@material/checkbox';

import { AnyT, IKeyValue, ChangeEventT } from 'core/definition.interface';
import { Field } from 'core/component/field';

import {
  ICheckboxInternalState,
  ICheckboxInternalProps,
  INativeMaterialCheckboxComponent,
} from './checkbox.interface';

export class Checkbox extends Field<Checkbox,
                                    ICheckboxInternalProps,
                                    ICheckboxInternalState,
                                    INativeMaterialCheckboxComponent,
                                    ChangeEventT> {
  constructor(props: ICheckboxInternalProps) {
    super(props, MDCCheckbox);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    Reflect.defineProperty(this.input, 'value', {
      get: () => this.nativeMdcInstance.checked,
    });
  }

  public render() {
    const props = this.props;
    const className = ['mdc-checkbox', props.className];

    return (
        <div className='mdc-form-field app-checkbox-wrapper'
             style={{...props.wrapperStyle as {}}}>
          <div ref='self'
               className={className.filter((cls) => !!cls).join(' ')}>
            <input {...this.getComponentProps()}/>
            <div className='mdc-checkbox__background'>
              <svg className='mdc-checkbox__checkmark'
                   viewBox='0 0 24 24'>
                <path className='mdc-checkbox__checkmark__path'
                      fill='none'
                      stroke='white'
                      d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
              </svg>
              <div className='mdc-checkbox__mixedmark'>
              </div>
            </div>
          </div>
          <label>
            {props.label ? this.t(props.label) : props.children}
          </label>
        </div>
    );
  }

  protected getComponentProps(): IKeyValue {
    const props = this.props;
    return {
      ref: 'input',
      type: 'checkbox',
      name: props.name,
      checked: this.value,
      className: 'mdc-checkbox__native-control',
      required: props.required,
      onChange: this.onChange,
    };
  }

  protected getEmptyValue(): boolean {
    return false;
  }

  protected getRawValueFromEvent(event: ChangeEventT): AnyT {
    return this.nativeMdcInstance.checked;
  }
}
