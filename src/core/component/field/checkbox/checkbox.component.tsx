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

  private inputId = uuid();

  public render(): JSX.Element {
    const props = this.props;

    return (
        <div className={this.getFieldClassName()}>
          <div ref='self'
               className={toClassName(
                 this.uiFactory.checkbox,
                 'rac-checkbox-field',
                 props.className,
               )}>
            {this.getComponent()}
            {this.uiFactory.makeCheckboxAttachment()}
          </div>
          <label htmlFor={this.inputId}>
            {props.label ? this.t(props.label) : props.children}
          </label>
        </div>
    );
  }

  protected getComponent(): JSX.Element {
    return <input {...this.getComponentProps()}/>;
  }

  protected getComponentProps(): IFieldInputProps {
    return {
      ...super.getComponentProps() as IFieldInputProps,

      id: this.inputId,
      type: 'checkbox',
      checked: this.toDisplayValue(),
      className: toClassName(this.uiFactory.checkboxInput, 'rac-field-input'),
    };
  }

  protected onClick(event: BasicEventT): void {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-form-checkbox');
  }

  protected getEmptyValue(): boolean {
    return false;
  }

  protected getEmptyDisplayValue(): boolean {
    return this.getEmptyValue();
  }
}
