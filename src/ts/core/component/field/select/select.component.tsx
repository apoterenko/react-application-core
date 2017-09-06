import * as React from 'react';
import * as ramda from 'ramda';
import { MDCSelect, MDCSelectFoundation } from '@material/select';

import { BasicTextField } from 'core/component/field';
import { Menu, IMenu } from 'core/component/menu';
import { AnyT, BasicEventT, ChangeEventT, IKeyValue } from 'core/definition.interface';

import {
  INativeMaterialSelectComponent,
  ISelectInternalProps,
  ISelectInternalState,
  ISelectOption
} from './select.interface';

export class Select extends BasicTextField<Select,
                                           ISelectInternalProps,
                                           ISelectInternalState,
                                           INativeMaterialSelectComponent> {

  static EMPTY_VALUE = -1;

  static defaultProps: ISelectInternalProps = {
    options: []
  };

  constructor(props: ISelectInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  public onChange(event: ChangeEventT): void {
    this.input.value = '';  // We should reset the field manually before HTML5 validation will be called
    this.onChangeValue(undefined);
  }

  protected onClick(event: BasicEventT): void {
    super.onClick(event);
    this.menu.show();
  }

  protected getComponent(): JSX.Element {
    return (
        <div className='app-textfield-input-wrapper'>
          {super.getComponent()}
          <Menu ref='menu'
                options={this.props.options}
                onSelect={this.onSelect}>
          </Menu>
        </div>
    );
  }

  protected getComponentProps(): IKeyValue {
    return {
      ...super.getComponentProps(),
      value: this.toDisplayValue()
    };
  }

  protected getEmptyValue(): AnyT {
    return Select.EMPTY_VALUE;
  }

  private onSelect(option: ISelectOption): void {
    this.onChangeValue(option.value, null);
  }

  private toDisplayValue(): string {
    const value = this.value;
    const selectedItem = this.getSelectedOption(value);
    return selectedItem
        ? (selectedItem.label ? this.t(selectedItem.label) : selectedItem.value)
        : (value === Select.EMPTY_VALUE ? '' : value);
  }

  private getSelectedOption(value: AnyT): ISelectOption {
    return ramda.find(option => option.value === value, this.props.options);
  }

  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }
}
