import { INamedEntity } from '../../../definition.interface';
import {
  MultiFieldEntityT,
  IMultiEntity,
} from './multifield.interface';
import {
  IBasicMultiFieldPlugin,
  IBasicMultiFieldChangesResult,
  BasicMultiFieldT,
} from './basic-multifield.interface';

export class BasicMultiFieldPlugin<TField extends BasicMultiFieldT>
    implements IBasicMultiFieldPlugin {

  constructor(protected field: TField,
              protected entityAccessor?: (entity) => INamedEntity) {
  }

  public onAdd(item: INamedEntity): IBasicMultiFieldChangesResult|void {
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

  public onDelete(item: INamedEntity): IBasicMultiFieldChangesResult|void {
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

  protected toChangesPayload(result: IBasicMultiFieldChangesResult): MultiFieldEntityT<INamedEntity> {
    const add = result.addArray;
    const remove = result.removeArray;

    if (add.length || remove.length) {
      return {add, remove, source: this.originalValue};
    } else {
      return this.originalValue;
    }
  }

  protected toActiveValue(multiEntity: IMultiEntity): INamedEntity[] {
    const originalValue = multiEntity.source || [];
    const removeValue = multiEntity.remove;
    return originalValue
        .map((entity) => this.entityAccessor ? this.entityAccessor(entity) : entity)
        .concat(multiEntity.add)
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
    return this.field.value;
  }
}
