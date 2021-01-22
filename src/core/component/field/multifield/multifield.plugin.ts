import {
  asMultiFieldEntitiesLength,
  FilterUtils,
  MultiFieldUtils,
} from '../../../util';
import { IEntity } from '../../../definitions.interface';
import {
  IMultiFieldChangesEntity,
  IMultiFieldPlugin,
} from './multifield.interface';
import {
  toMultiFieldChangesEntityOnDelete,
  toMultiFieldChangesEntityOnEdit,
} from './multifield.support';
import {
  IFieldConverter,
  IMultiItemEntity,
  IUniversalField,
  MultiFieldValueT,
} from '../../../definition';
import {
  DI_TYPES,
  lazyInject,
} from '../../../di';

export class MultiFieldPlugin implements IMultiFieldPlugin {
  @lazyInject(DI_TYPES.FieldConverter) private readonly fieldConverter: IFieldConverter;

  /**
   * @stable [21.01.2021]
   * @param field
   */
  constructor(private readonly field: IUniversalField) {
  }

  /**
   * @stable [21.01.2021]
   * @param item
   */
  public onAddItem(item: IMultiItemEntity): void {
    this.onChangeManually(this.asMultiFieldValue(this.onAdd(item)));
  }

  /**
   * @stable [21.01.2021]
   * @param item
   */
  public onEditItem(item: IMultiItemEntity): void {
    this.onChangeManually(this.asMultiFieldValue(this.onEdit(item)));
  }

  /**
   * @stable [01.06.2018]
   * @param {IMultiItemEntity} item
   */
  public onDeleteItem(item: IEntity): void {
    this.onChangeManually(this.asMultiFieldValue(this.onDelete(item)));
  }

  /**
   * @stable [21.01.2021]
   * @param item
   */
  public onMergeItem(item: IMultiItemEntity): void {
    if (item.newEntity) {
      this.onAddItem(item);
    } else {
      this.onEditItem(item);
    }
  }

  public onAdd(item: IMultiItemEntity): IMultiFieldChangesEntity {
    const removeValue = this.removeValue;
    const addValue = this.addValue;
    const editArray = this.editValue;
    const removeValueLength = removeValue.length;

    const removeArray = removeValue.filter(((removedItem) => !FilterUtils.SAME_ENTITY_PREDICATE(removedItem, item)));
    let addArray = addValue;

    if (removeArray.length === removeValueLength) {
      addArray = addValue.concat(MultiFieldUtils.multiItemEntityAsEntity(item));
    }
    return {
      addArray,
      editArray,
      removeArray,
    };
  }

  /**
   * @stable [11.08.2018]
   * @param {IMultiItemEntity} item
   * @returns {IMultiFieldChangesEntity}
   */
  public onEdit(item: IMultiItemEntity): IMultiFieldChangesEntity {
    return toMultiFieldChangesEntityOnEdit(item, this.addValue, this.removeValue, this.editValue, this.originalValue);
  }

  /**
   * @stable [18.08.2018]
   * @param {IMultiItemEntity} item
   * @returns {IMultiFieldChangesEntity}
   */
  public onDelete(item: IEntity): IMultiFieldChangesEntity {
    return toMultiFieldChangesEntityOnDelete(item, this.addValue, this.removeValue, this.editValue, this.originalValue);
  }

  /**
   * @stable [21.01.2021]
   */
  public get originalValue(): IMultiItemEntity[] {
    return MultiFieldUtils.multiFieldValueAsMultiItemSourceEntities(this.value);
  }

  /**
   * @stable [14.10.2020]
   */
  public get activeValue(): IEntity[] {
    return this.fieldConverter.fromMultiFieldValueToDefinedEntities({
      source: this.originalValue,
      remove: this.removeValue,
      add: this.addValue,
      edit: this.editValue,
    });
  }

  /**
   * @stable [02.06.2018]
   * @param {MultiFieldValueT} value
   * @returns {number}
   */
  public getActiveValueLength(value: MultiFieldValueT): number {
    return asMultiFieldEntitiesLength(value);
  }

  /**
   * @stable [21.01.2021]
   */
  public get editValue(): IMultiItemEntity[] {
    return MultiFieldUtils.multiFieldValueAsMultiItemEditEntities(this.value);
  }

  /**
   * @stable [21.01.2021]
   */
  public get addValue(): IEntity[] {
    return MultiFieldUtils.multiFieldValueAsMultiItemAddEntities(this.value);
  }

  /**
   * @stable [21.01.2021]
   * @param payload
   */
  private onChangeManually(payload: MultiFieldValueT): void {
    this.field.onChangeManually(payload);
  }

  /**
   * @stable [29.08.2020]
   * @private
   */
  private get removeValue(): IEntity[] {
    return MultiFieldUtils.multiFieldValueAsMultiItemRemoveEntities(this.value);
  }

  /**
   * @stable [21.01.2021]
   * @param result
   */
  private asMultiFieldValue(result: IMultiFieldChangesEntity): MultiFieldValueT {
    const add = result.addArray;
    const remove = result.removeArray;
    const edit = result.editArray;

    if (add.length || remove.length || edit.length) {
      return MultiFieldUtils.fromMultiEntity({
        add,
        edit,
        remove,
        source: this.originalValue,
      });
    } else {
      return this.originalValue;
    }
  }

  /**
   * @stable [21.01.2021]
   */
  private get value(): MultiFieldValueT {
    return this.field.value;
  }
}
