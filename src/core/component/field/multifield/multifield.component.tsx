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
  ConditionUtils,
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
  MultiItemEntityT,
} from '../../../definition';

export class MultiField<TProps extends IMultiFieldProps = IMultiFieldProps,
                        TState extends IMultiFieldState = IMultiFieldState>
  extends BaseSelect<TProps, TState>
  implements IMultiField {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IMultiFieldProps>({
    clearActionRendered: false,
    displayMessage: '%d value(s)',
    preventFocus: true,
  }, BaseSelect);

  /**
   * @stable [16.06.2020]
   */
  protected readonly multiFieldPlugin = new MultiFieldPlugin(this);

  /**
   * @stable [21.01.2021]
   * @param originalProps
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
   * @stable [21.01.2021]
   * @param item
   */
  public addItem<TEntity extends IEntity = IEntity>(item: MultiItemEntityT<TEntity>): void {
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
   * @stable [21.01.2021]
   * @param item
   */
  public editItem(item: IMultiItemEntity): void {
    this.multiFieldPlugin.onEditItem(item);
  }

  /**
   * @stable [21.01.2021]
   * @param item
   */
  public mergeItem(item: IMultiItemEntity): void {
    this.multiFieldPlugin.onMergeItem(item);
  }

  /**
   * @stable [01.06.2018]
   * @returns {EntityIdT[]}
   */
  protected get originalEmptyValue(): EntityIdT[] {
    return [];
  }

  /**
   * @stable [21.01.2021]
   * @param option
   */
  protected onSelect(option: IPresetsSelectOptionEntity): void {
    this.multiFieldPlugin.onAddItem({id: option.value, rawData: option.rawData});
    ConditionUtils.ifNotNilThanValue(this.originalProps.onSelect, (onSelect) => onSelect(option));
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
   * @stable [21.01.2021]
   */
  private get menuInlineOptions(): IPresetsRawDataLabeledValueEntity[] {
    return this.multiFieldPlugin
      .activeValue
      .map(this.fieldConverter.fromNamedEntityToRawDataLabeledValueEntity);
  }
}
