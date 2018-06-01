import * as React from 'react';

import {
  EntityIdT,
  IEntity,
  IKeyboardEvent,
} from '../../../definitions.interface';
import { INamedEntity } from '../../../entities-definitions.interface';
import { ISelectOptionEntity, BasicSelect } from '../../field/select';
import { IField } from '../../field/field';
import { IMultiFieldState, IMultiFieldProps, MultiFieldValueT } from './multifield.interface';
import { MultiFieldPlugin } from './multifield.plugin';

export class MultiField<TComponent extends MultiField<TComponent, TProps, TState>,
                        TProps extends IMultiFieldProps,
                        TState extends IMultiFieldState>
  extends BasicSelect<TComponent, TProps, TState> {

  /**
   * @stable [01.06.2018]
   */
  public static defaultProps: IMultiFieldProps = {
    displayMessage: '%d value(s)',
    clearAction: false,
    forceAll: true,
    displayValue: (value: MultiFieldValueT<IEntity>,
                   field: MultiField<IField, IMultiFieldProps, IMultiFieldState>) => {
      const len = field.multiFieldPlugin.getActiveValueLength(value);
      return field.printfDisplayMessage(len > 0, len);
    },
  };

  protected multiFieldPlugin = new MultiFieldPlugin(this);

  /**
   * @stable [01.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyBackspace(event: IKeyboardEvent): void {
    // Nothing to do, only need to invoke the props callback

    if (this.props.onKeyBackspace) {
      this.props.onKeyBackspace(event);
    }
  }

  /**
   * @stable [01.06.2018]
   * @returns {EntityIdT[]}
   */
  protected getEmptyValue(): EntityIdT[] {
    return [];
  }

  /**
   * @stable [01.06.2018]
   * @param {ISelectOptionEntity} option
   */
  protected onSelect(option: ISelectOptionEntity): void {
    this.multiFieldPlugin.onAddItem({id: option.value, name: option.label});
    this.setFocus();
  }

  /**
   * @stable [01.06.2018]
   * @param {ISelectOptionEntity[]} options
   * @returns {ISelectOptionEntity[]}
   */
  protected toFilteredOptions(options: ISelectOptionEntity[]): ISelectOptionEntity[] {
    const activeValue = this.multiFieldPlugin.activeValue;

    return super.toFilteredOptions(options).filter(
      (option) => !activeValue.find((item) => item.id === option.value)
    );
  }

  /**
   * @stable [01.06.2018]
   * @param {INamedEntity} item
   */
  protected onDelete(item: INamedEntity): void {
    this.multiFieldPlugin.onDeleteItem(item);
    this.setFocus();
  }
}
