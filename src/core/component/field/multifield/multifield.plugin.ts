import { INamedEntity } from '../../../definition.interface';
import { IBasicField } from '../field';
import {
  IMultiEntity,
  IMultiFieldChangesResult,
  IMultiFieldPlugin,
  MultiFieldEntityT,
} from './multifield.interface';

export class MultiFieldPlugin implements IMultiFieldPlugin {

  constructor(private field: IBasicField<MultiFieldEntityT<INamedEntity>>,
              private entityAccessor?: (entity) => INamedEntity) {
  }

  public onAddItem(item: INamedEntity): void {
    this.onChangeManually(this.toChangesPayload(this.onAdd(item)));
  }

  public onDeleteItem(item: INamedEntity): void {
    this.onChangeManually(this.toChangesPayload(this.onDelete(item)));
  }

  public onAdd(item: INamedEntity): IMultiFieldChangesResult {
    const removeValue = this.removeValue;
    const addValue = this.addValue;
    const removeLen = removeValue.length;
    const removeArray = removeValue.filter(((removeItem) => removeItem.id !== item.id));
    let addArray = addValue;

    if (removeArray.length === removeLen) {
      addArray = addValue.concat({...item});
    }
    return {addArray, removeArray};
  }

  public onDelete(item: INamedEntity): IMultiFieldChangesResult {
    const removeValue = this.removeValue;
    const addValue = this.addValue;
    const deletedValue = item.id;
    const addLen = addValue.length;
    const addArray = addValue.filter(((addItem) => addItem.id !== deletedValue));
    let removeArray = removeValue;

    if (addArray.length === addLen) {
      const deletedEntity: INamedEntity = {id: deletedValue};
      if (this.originalValue.find((entity) => entity.id === deletedValue)) {
        removeArray = [deletedEntity].concat(removeValue);
      } else {
        removeArray = [].concat(removeValue);
      }
    }
    return {addArray, removeArray};
  }

  public get originalValue(): INamedEntity[] {
    const currentValue = this.value;
    return Array.isArray(currentValue) ? currentValue : currentValue.source;
  }

  public get activeValue(): INamedEntity[] {
    return this.toActiveValue({
      source: this.originalValue || [],
      remove: this.removeValue,
      add: this.addValue,
    });
  }

  protected toActiveValue(multiEntity: IMultiEntity): INamedEntity[] {
    const originalValue = multiEntity.source || [];
    const removeValue = multiEntity.remove;
    return originalValue
      .map((entity) => this.entityAccessor ? this.entityAccessor(entity) : entity)
      .concat(multiEntity.add)
      .filter((item) => !removeValue.find((removeItem) => removeItem.id === item.id));
  }

  private getActiveValueLength(entity: MultiFieldEntityT<INamedEntity>): number {
    return Array.isArray(entity)
      ? entity.length
      : this.toActiveValue(entity).length;
  }

  private onChangeManually(payload: MultiFieldEntityT<INamedEntity>): void {
    const activeValueLength = this.getActiveValueLength(payload);
    this.field.onChangeManually(payload, activeValueLength === 0, activeValueLength);
    this.field.setFocus();
  }

  private toChangesPayload(result: IMultiFieldChangesResult): MultiFieldEntityT<INamedEntity> {
    const add = result.addArray;
    const remove = result.removeArray;

    if (add.length || remove.length) {
      return {add, remove, source: this.originalValue};
    } else {
      return this.originalValue;
    }
  }

  private get addValue(): INamedEntity[] {
    const currentValue = this.value;
    return Array.isArray(currentValue) ? [] : currentValue.add;
  }

  private get removeValue(): INamedEntity[] {
    const currentValue = this.value;
    return Array.isArray(currentValue) ? [] : currentValue.remove;
  }

  private get value(): MultiFieldEntityT<INamedEntity> {
    return this.field.value;
  }
}
