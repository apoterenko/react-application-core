import * as React from 'react';

import {
  EntityIdT,
  IKeyboardEvent,
  AnyT,
} from '../../../definitions.interface';
import { BasicSelect } from '../../field/select';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { IMultiFieldState, IMultiFieldProps, MultiFieldEntityT, IMultiItemEntity, IMultiField } from './multifield.interface';
import { MultiFieldPlugin } from './multifield.plugin';

export class MultiField<TComponent extends MultiField<TComponent, TProps, TState>,
                        TProps extends IMultiFieldProps,
                        TState extends IMultiFieldState>
  extends BasicSelect<TComponent, TProps, TState>
  implements IMultiField {

  /**
   * @stable [01.06.2018]
   */
  public static defaultProps: IMultiFieldProps = {
    displayMessage: '%d value(s)',
    clearAction: false,
    notUseErrorMessage: true,
    forceReload: true,
    displayValue: (value: MultiFieldEntityT,
                   field: MultiField<AnyT, IMultiFieldProps, IMultiFieldState>) => {
      const len = field.multiFieldPlugin.getActiveValueLength(value);
      return field.printfDisplayMessage(len > 0, len);
    },
  };

  public multiFieldPlugin = new MultiFieldPlugin(this);

  /**
   * @stable [01.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyBackspace(event: IKeyboardEvent): void {
    // Do nothing, only need to invoke the props callback

    const props = this.props;
    if (props.onKeyBackspace) {
      props.onKeyBackspace(event);
    }
  }

  /**
   * @stable [19.08.2018]
   * @param {IMultiItemEntity} item
   */
  public deleteItem(item: IMultiItemEntity): void {
    this.onDelete(item);
  }

  /**
   * @stable [29.08.2018]
   * @param {IMultiItemEntity} item
   */
  public editItem(item: IMultiItemEntity): void {
    this.onEdit(item);
  }

  /**
   * @stable [29.08.2018]
   * @param {IMultiItemEntity} item
   */
  public mergeItem(item: IMultiItemEntity): void {
    this.onMerge(item);
  }

  /**
   * @stable [01.06.2018]
   * @returns {EntityIdT[]}
   */
  protected getEmptyValue(): EntityIdT[] {
    return [];
  }

  /**
   * @stable [11.08.2018]
   * @param {ISelectOptionEntity} option
   */
  protected onSelect(option: ISelectOptionEntity): void {
    this.multiFieldPlugin.onAddItem({id: option.value, rawData: option.rawData});
  }

  /**
   * @stable [01.06.2018]
   * @param {IMultiItemEntity} item
   */
  protected onDelete(item: IMultiItemEntity): void {
    this.multiFieldPlugin.onDeleteItem(item);
  }

  /**
   * @stable [29.08.2018]
   * @param {IMultiItemEntity} item
   */
  protected onEdit(item: IMultiItemEntity): void {
    this.multiFieldPlugin.onEditItem(item);
  }

  /**
   * @stable [29.08.2018]
   * @param {IMultiItemEntity} item
   */
  protected onMerge(item: IMultiItemEntity): void {
    this.multiFieldPlugin.onMergeItem(item);
  }

  /**
   * @stable [19.06.2018]
   * @param {ISelectOptionEntity[]} options
   * @returns {ISelectOptionEntity[]}
   */
  protected toFilteredOptions(): ISelectOptionEntity[] {
    const activeValue = this.multiFieldPlugin.activeValue;
    const result = super.toFilteredOptions();

    return this.props.notUseActiveValueFilter
      ? result
      : result.filter((option) => !activeValue.find((item) => item.id === option.value));
  }
}
