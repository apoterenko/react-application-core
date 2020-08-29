import * as React from 'react';

import {
  AnyT,
  EntityIdT,
  IEntity,
} from '../../../definitions.interface';
import { BaseSelect } from '../../field/select/base-select.component';
import { IMultiField } from './multifield.interface';
import { MultiFieldPlugin } from './multifield.plugin';
import {
  ClsUtils,
  PropsUtils,
} from '../../../util';
import {
  IKeyboardEvent,
  IMenuProps,
  IMultiFieldProps,
  IMultiFieldState,
  IMultiItemEntity,
  IPresetsRawDataLabeledValueEntity,
  IPresetsSelectOptionEntity,
  MultiFieldClassesEnum,
} from '../../../definition';

export class MultiField<TProps extends IMultiFieldProps = IMultiFieldProps,
                        TState extends IMultiFieldState = IMultiFieldState>
  extends BaseSelect<TProps, TState>
  implements IMultiField {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IMultiFieldProps>({
    clearActionRendered: false,
    displayMessage: '%d value(s)',
    errorMessageRendered: false,
    preventFocus: true,
  }, BaseSelect);

  /**
   * @stable [16.06.2020]
   */
  protected readonly multiFieldPlugin = new MultiFieldPlugin(this);

  /**
   * @stable [08.07.2020]
   * @param {TProps} originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);
    this.onMenuInlineOptionClose = this.onMenuInlineOptionClose.bind(this);
  }

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
   * @stable [29.08.2020]
   * @param item
   */
  public deleteItem(item: IEntity): void {
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
   * @stable [29.08.2020]
   * @param item
   * @protected
   */
  protected onDelete(item: IEntity): void {
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
   * @stable [08.07.2020]
   * @returns {IMenuProps}
   */
  protected getMenuProps(): IMenuProps {
    return {
      inlineOptions: this.menuInlineOptions,
      onInlineOptionClose: this.onMenuInlineOptionClose,
      ...super.getMenuProps(),
    };
  }

  /**
   * @stable [16.06.2020]
   * @returns {IPresetsSelectOptionEntity[]}
   */
  protected getFilteredOptions(): IPresetsSelectOptionEntity[] {
    const activeValue = this.multiFieldPlugin.activeValue;
    const {
      selectedValueIgnored,
    } = this.mergedProps;

    return selectedValueIgnored
      ? this.options
      : (
        this.options.filter(
          (option) => !activeValue.some((item) => item.id === this.fromSelectValueToId(option))
        )
      );
  }

  /**
   * @stable [16.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      MultiFieldClassesEnum.MULTI_FIELD
    );
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

  /**
   * @stable [08.07.2020]
   * @param {IPresetsRawDataLabeledValueEntity} option
   */
  private onMenuInlineOptionClose(option: IPresetsRawDataLabeledValueEntity): void {
    this.onDelete({id: this.fieldConverter.fromSelectValueToId(option)});
  }

  /**
   * @stable [08.07.2020]
   * @returns {IPresetsRawDataLabeledValueEntity[]}
   */
  private get menuInlineOptions(): IPresetsRawDataLabeledValueEntity[] {
    const activeValue = this.multiFieldPlugin.activeValue;
    return activeValue.map(this.fieldConverter.fromNamedEntityToRawDataLabeledValueEntity);
  }
}
