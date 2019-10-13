import { isFn, asMultiFieldEntities, asMultiFieldEntitiesLength } from '../../../util';
import { IEntity } from '../../../definitions.interface';
import { ICrossPlatformField } from '../../../entities-definitions.interface';
import {
  IMultiFieldChangesEntity,
  IMultiFieldPlugin,
} from './multifield.interface';
import {
  extractMultiEditItemEntities,
  extractMultiRemoveItemEntities,
  extractMultiAddItemEntities,
  extractMultiSourceItemEntities,
  fromMultiItemEntityToEntity,
  toMultiFieldChangesEntityOnEdit,
  toMultiFieldChangesEntityOnDelete,
} from './multifield.support';
import { IMultiItemEntity, MultiFieldEntityT } from '../../../definition';

export class MultiFieldPlugin implements IMultiFieldPlugin {

  /**
   * @stable [28.11.2018]
   * @param {ICrossPlatformField} field
   */
  constructor(private field: ICrossPlatformField) {
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
  public onDelete(item: IMultiItemEntity): IMultiFieldChangesEntity {
    return toMultiFieldChangesEntityOnDelete(item, this.addValue, this.removeValue, this.editValue, this.originalValue);
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
    return asMultiFieldEntities({
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
    return asMultiFieldEntitiesLength(value);
  }

  /**
   * @stable [04.07.2018]
   * @returns {IMultiItemEntity[]}
   */
  public get editValue(): IMultiItemEntity[] {
    return extractMultiEditItemEntities(this.value);
  }

  /**
   * @stable [04.07.2018]
   * @returns {IEntity[]}
   */
  public get addValue(): IEntity[] {
    return extractMultiAddItemEntities(this.value);
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
   * @returns {IMultiItemEntity[]}
   */
  private get removeValue(): IMultiItemEntity[] {
    return extractMultiRemoveItemEntities(this.value);
  }

  /**
   * @stable [28.11.2018]
   * @returns {MultiFieldEntityT}
   */
  private get value(): MultiFieldEntityT {
    const field = this.field;
    return isFn(field.getValue) ? field.getValue() : field.value;
  }
}
