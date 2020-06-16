import * as React from 'react';

import { EntityIdT, IKeyboardEvent, AnyT } from '../../../definitions.interface';
import { BaseSelect } from '../../field/select';
import { IMultiFieldState, IMultiFieldProps, IMultiField } from './multifield.interface';
import { MultiFieldPlugin } from './multifield.plugin';
import { toClassName } from '../../../util';
import {
  IMultiItemEntity,
  IPresetsSelectOptionEntity,
  MultiFieldEntityT,
} from '../../../definition';

export class MultiField<TProps extends IMultiFieldProps = IMultiFieldProps,
                        TState extends IMultiFieldState = IMultiFieldState>
  extends BaseSelect<TProps, TState>
  implements IMultiField {

  /**
   * @stable [01.06.2018]
   */
  public static defaultProps: IMultiFieldProps = {
    displayMessage: '%d value(s)',
    clearActionRendered: false,
    errorMessageRendered: false,
    preventFocus: true,
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
   * @stable [19.11.2018]
   * @param {IMultiItemEntity} item
   */
  public addItem(item: IMultiItemEntity): void {
    this.multiFieldPlugin.onAddItem(item);
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
  protected get originalEmptyValue(): EntityIdT[] {
    return [];
  }

  /**
   * @stable [11.08.2018]
   * @param {IPresetsSelectOptionEntity} option
   */
  protected onSelect(option: IPresetsSelectOptionEntity): void {
    this.multiFieldPlugin.onAddItem({id: option.value, rawData: option.rawData});

    const props = this.props;
    if (props.onSelect) {
      props.onSelect(option);
    }
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
   * @param {IPresetsSelectOptionEntity[]} options
   * @returns {IPresetsSelectOptionEntity[]}
   */
  protected getFilteredOptions(): IPresetsSelectOptionEntity[] {
    const activeValue = this.multiFieldPlugin.activeValue;

    return this.props.ignoreSelectedValue
      ? this.options
      : this.options.filter((option) => !activeValue.find((item) => item.id === option.value));
  }

  /**
   * @stable [21.09.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-multi-field');
  }

  /**
   * @stable [14.01.2019]
   * @param {AnyT} value
   * @returns {string}
   */
  protected decorateDisplayValue(value: AnyT): string {
    const len = this.multiFieldPlugin.getActiveValueLength(value);
    return this.buildDisplayMessage(len > 0, len);
  }
}
