import * as R from 'ramda';

import { IBasicField } from '../field';
import { orDefault } from '../../../util';
import {
  IMultiFieldChangesEntity,
  IMultiFieldPlugin,
  MultiFieldEntityT,
  IMultiItemEntity,
} from './multifield.interface';
import {
  toActualMultiItemEntities,
  toActualMultiItemEntitiesLength,
  extractMultiEditItemEntities,
  extractMultiRemoveItemEntities,
  extractMultiAddItemEntities,
  extractMultiSourceItemEntities,
  fromMultiItemEntityToEntity,
} from './multifield.support';
import { UNDEF, IEntity } from '../../../definitions.interface';

export class MultiFieldPlugin implements IMultiFieldPlugin {

  /**
   * @stable [01.06.2018]
   * @param {IBasicField<MultiFieldEntityT>} field
   */
  constructor(private field: IBasicField<MultiFieldEntityT>) {
  }

  /**
   * @stable [01.06.2018]
   * @param {IMultiItemEntity} item
   */
  public onAddItem(item: IMultiItemEntity): void {
    this.onChangeManually(this.toChangesPayload(this.onAdd(item)));
  }

  /**
   * @stable [01.07.2018]
   * @param {IMultiItemEntity} item
   */
  public onMergeItem(item: IMultiItemEntity): void {
    if (item.newEntity) {
      this.onAddItem(item);
    } else {
      this.onEditItem(item);
    }
  }

  /**
   * @stable [01.06.2018]
   * @param {IMultiItemEntity} item
   */
  public onEditItem(item: IMultiItemEntity): void {
    this.onChangeManually(this.toChangesPayload(this.onEdit(item)));
  }

  /**
   * @stable [01.06.2018]
   * @param {IMultiItemEntity} item
   */
  public onDeleteItem(item: IMultiItemEntity): void {
    this.onChangeManually(this.toChangesPayload(this.onDelete(item)));
  }

  public onAdd(item: IMultiItemEntity): IMultiFieldChangesEntity {
    const removeValue = this.removeValue;
    const addValue = this.addValue;
    const editArray = this.editValue;
    const removeLen = removeValue.length;
    const removeArray = removeValue.filter(((removeItem) => removeItem.id !== item.id));
    let addArray = addValue;

    if (removeArray.length === removeLen) {
      addArray = addValue.concat(fromMultiItemEntityToEntity(item));
    }
    return {addArray, removeArray, editArray};
  }

  /**
   * @stable [02.06.2018]
   * @param {IMultiItemEntity} item
   * @returns {IMultiFieldChangesEntity}
   */
  public onEdit(item: IMultiItemEntity): IMultiFieldChangesEntity {
    const removeArray = this.removeValue;
    const addValue = this.addValue;
    const editValue = this.editValue;

    const editedOriginalItem = this.originalValue.find((originalItem0) => originalItem0.id === item.id);
    const editedNewItem = addValue.find((editedNewItem0) => editedNewItem0.id === item.id);
    const isEditedNewItem = !R.isNil(editedNewItem);

    const editArray = orDefault<IMultiItemEntity[], IMultiItemEntity[]>(
      isEditedNewItem,
      editValue,
      () => (
        editValue
          .filter(
            (editedItem) =>
              !(item.id === editedItem.id && item.name === editedItem.name)
          )
          .concat(item)
          .filter((editedItem) => R.isNil(editedOriginalItem)
            || !(item.id === editedItem.id && item.name === editedItem.name && editedOriginalItem[item.name] === item.value))
      )
    );

    const addArray = orDefault<IMultiItemEntity[], IMultiItemEntity[]>(
      isEditedNewItem,
      () => (
        item.value === UNDEF    // Destroy added entity
          ? R.filter<IEntity>((itm) => itm.id !== item.id, addValue)
          : addValue.map((newItem) => newItem.id === item.id ? fromMultiItemEntityToEntity(item) : newItem)
      ),
      addValue
    );
    return {addArray, removeArray, editArray};
  }

  public onDelete(item: IMultiItemEntity): IMultiFieldChangesEntity {
    const removeValue = this.removeValue;
    const addValue = this.addValue;
    const editArray = this.editValue;
    const deletedValue = item.id;
    const addLen = addValue.length;
    const addArray = addValue.filter(((addItem) => addItem.id !== deletedValue));
    let removeArray = removeValue;

    if (addArray.length === addLen) {
      const deletedEntity: IMultiItemEntity = { id: deletedValue };
      if (this.originalValue.find((entity) => entity.id === deletedValue)) {
        removeArray = [deletedEntity].concat(removeValue);
      } else {
        removeArray = [].concat(removeValue);
      }
    }
    return {addArray, removeArray, editArray};
  }

  /**
   * @stable [23.06.2018]
   * @returns {IMultiItemEntity[]}
   */
  public get originalValue(): IMultiItemEntity[] {
    return extractMultiSourceItemEntities(this.value);
  }

  /**
   * @stable [01.06.2018]
   * @returns {IMultiItemEntity[]}
   */
  public get activeValue(): IMultiItemEntity[] {
    return toActualMultiItemEntities({
      source: this.originalValue,
      remove: this.removeValue,
      add: this.addValue,
      edit: this.editValue,
    });
  }

  /**
   * @stable [02.06.2018]
   * @param {MultiFieldEntityT} value
   * @returns {number}
   */
  public getActiveValueLength(value: MultiFieldEntityT): number {
    return toActualMultiItemEntitiesLength(value);
  }

  /**
   * @stable [01.06.2018]
   * @param {MultiFieldEntityT} payload
   */
  private onChangeManually(payload: MultiFieldEntityT): void {
    this.field.onChangeManually(payload, this.getActiveValueLength(payload));
  }

  /**
   * @stable [01.06.2018]
   * @param {IMultiFieldChangesEntity} result
   * @returns {MultiFieldEntityT}
   */
  private toChangesPayload(result: IMultiFieldChangesEntity): MultiFieldEntityT {
    const add = result.addArray;
    const remove = result.removeArray;
    const edit = result.editArray;

    if (add.length || remove.length || edit.length) {
      return {add, remove, edit, source: this.originalValue};
    } else {
      return this.originalValue;
    }
  }

  /**
   * @stable [23.06.2018]
   * @returns {IEntity[]}
   */
  private get addValue(): IEntity[] {
    return extractMultiAddItemEntities(this.value);
  }

  /**
   * @stable [23.06.2018]
   * @returns {IMultiItemEntity[]}
   */
  private get removeValue(): IMultiItemEntity[] {
    return extractMultiRemoveItemEntities(this.value);
  }

  /**
   * @stable [23.06.2018]
   * @returns {IMultiItemEntity[]}
   */
  private get editValue(): IMultiItemEntity[] {
    return extractMultiEditItemEntities(this.value);
  }

  /**
   * @stable [01.06.2018]
   * @returns {MultiFieldEntityT}
   */
  private get value(): MultiFieldEntityT {
    return this.field.value;
  }
}
