import { INamedEntity } from '../../../definition.interface';
import { IFieldValueAccessor } from '../field/field.interface';
import {
  IMultiFieldChangesResult,
  IMultiFieldPlugin,
  MultiFieldEntityT,
} from './multifield.interface';

export class MultiFieldPlugin implements IMultiFieldPlugin {

  constructor(private valueAccessor: IFieldValueAccessor<MultiFieldEntityT<INamedEntity>>,
              private entityAccessor?: (entity) => INamedEntity) {
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
    const originalValue = this.originalValue || [];
    const removeValue = this.removeValue;
    return originalValue
        .map((entity) => this.entityAccessor ? this.entityAccessor(entity) : entity)
        .concat(this.addValue)
        .filter((item) => !removeValue.find((removeItem) => removeItem.id === item.id));
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
    return this.valueAccessor.value;
  }
}
