import * as React from 'react';

import { BasicEventT } from '../../../definition.interface';
import { Field, IFieldInputProps } from '../../../component/field';
import { toClassName, uuid } from '../../../util';
import {
  ICheckboxInternalState,
  ICheckboxInternalProps,
} from './checkbox.interface';

export class Checkbox extends Field<Checkbox,
                                    ICheckboxInternalProps,
                                    ICheckboxInternalState> {

  public render(): JSX.Element {
    const props = this.props;
    const id = uuid();

    return (
        <div className={toClassName(this.uiFactory.formField, 'rac-form-field', 'rac-checkbox-field')}>
          <div ref='self'
               className={toClassName(this.uiFactory.checkbox, props.className)}>
            <input id={id} {...this.getComponentProps()}/>
            {this.uiFactory.makeCheckboxAttachment()}
          </div>
          <label htmlFor={id}>
            {props.label ? this.t(props.label) : props.children}
          </label>
        </div>
    );
  }

  protected getComponentProps(): IFieldInputProps {
    return {
      ...super.getComponentProps(),

      type: 'checkbox',
      checked: this.toDisplayValue(),
      className: this.uiFactory.checkboxInput,
    };
  }

  protected onClick(event: BasicEventT): void {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  protected getEmptyValue(): boolean {
    return false;
  }

  protected getEmptyDisplayValue(): boolean {
    return this.getEmptyValue();
  }
}
