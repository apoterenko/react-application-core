import { isDef, isPrimitive } from '../../../util';
import { INamedEntity, EntityIdT } from '../../../definition.interface';
import { IBasicField } from '../field';
import {
  IMultiEntity,
  IMultiFieldChangesResult,
  IMultiFieldPlugin,
  MultiFieldEntityT,
} from './multifield.interface';
import { toActualEntities } from './multifield.converter';

export class MultiFieldPlugin implements IMultiFieldPlugin {

  constructor(private field: IBasicField<MultiFieldEntityT<INamedEntity>>) {
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
    return this.extract((currentValue) => currentValue.source);
  }

  public get activeValue(): INamedEntity[] {
    return toActualEntities({
      source: this.originalValue || [],
      remove: this.removeValue,
      add: this.addValue,
    });
  }

  public getActiveValueLength(value: MultiFieldEntityT<INamedEntity>|EntityIdT): number {
    return this.isNotMultiEntity(value)
      ? [].concat(value).length
      : (value ? toActualEntities(value as IMultiEntity).length : 0);
  }

  private onChangeManually(payload: MultiFieldEntityT<INamedEntity>): void {
    this.field.onChangeManually(payload, this.getActiveValueLength(payload));
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
    return this.extract((currentValue) => currentValue.add, []);
  }

  private get removeValue(): INamedEntity[] {
    return this.extract((currentValue) => currentValue.remove, []);
  }

  private get value(): MultiFieldEntityT<INamedEntity>|EntityIdT {
    return this.field.value;
  }

  private extract(converter: (value: IMultiEntity) => INamedEntity[],
                  defaultValue?: INamedEntity[]): INamedEntity[] {
    const currentValue = this.value;
    const isCurrentValuePrimitive = isPrimitive(currentValue);
    return this.isNotMultiEntity(currentValue)
      ? (isDef(defaultValue)
          ? defaultValue
          : (isCurrentValuePrimitive ? [{id: currentValue as EntityIdT}] : currentValue as INamedEntity[]))
      : (currentValue ? converter(currentValue as IMultiEntity) : []);
  }

  private isNotMultiEntity(value: MultiFieldEntityT<INamedEntity>|EntityIdT): boolean {
    return Array.isArray(value) || isPrimitive(value);
  }
}
