import { IEntity } from '../../../definition.interface';
import { IBasicField } from '../field';
import { isDef, orDefault } from '../../../util';
import {
  IMultiEntity,
  IMultiFieldChangesResult,
  IMultiFieldPlugin,
  MultiFieldEntityT,
  MultiFieldValueT,
  NotMultiFieldEntityT,
} from './multifield.interface';
import { toActualEntities, normalizeEntities, isNotMultiEntity, toActualEntitiesLength } from './multifield.converter';

export class MultiFieldPlugin implements IMultiFieldPlugin {

  constructor(private field: IBasicField<MultiFieldEntityT<IEntity>>) {
  }

  public onAddItem(item: IEntity): void {
    this.onChangeManually(this.toChangesPayload(this.onAdd(item)));
  }

  public onDeleteItem(item: IEntity): void {
    this.onChangeManually(this.toChangesPayload(this.onDelete(item)));
  }

  public onAdd(item: IEntity): IMultiFieldChangesResult {
    const removeValue = this.removeValue;
    const addValue = this.addValue;
    const removeLen = removeValue.length;
    const removeArray = removeValue.filter(((removeItem) => removeItem.id !== item.id));
    let addArray = addValue;

    if (removeArray.length === removeLen) {
      addArray = addValue.concat({ ...item });
    }
    return { addArray, removeArray };
  }

  public onDelete(item: IEntity): IMultiFieldChangesResult {
    const removeValue = this.removeValue;
    const addValue = this.addValue;
    const deletedValue = item.id;
    const addLen = addValue.length;
    const addArray = addValue.filter(((addItem) => addItem.id !== deletedValue));
    let removeArray = removeValue;

    if (addArray.length === addLen) {
      const deletedEntity: IEntity = { id: deletedValue };
      if (this.originalValue.find((entity) => entity.id === deletedValue)) {
        removeArray = [deletedEntity].concat(removeValue);
      } else {
        removeArray = [].concat(removeValue);
      }
    }
    return { addArray, removeArray };
  }

  public get originalValue(): IEntity[] {
    return this.extract((currentValue) => currentValue.source);
  }

  public get activeValue(): IEntity[] {
    return toActualEntities({ source: this.originalValue, remove: this.removeValue, add: this.addValue });
  }

  public getActiveValueLength(value: MultiFieldValueT<IEntity>): number {
    return toActualEntitiesLength(value);
  }

  private onChangeManually(payload: MultiFieldEntityT<IEntity>): void {
    this.field.onChangeManually(payload, this.getActiveValueLength(payload));
  }

  private toChangesPayload(result: IMultiFieldChangesResult): MultiFieldEntityT<IEntity> {
    const add = result.addArray;
    const remove = result.removeArray;

    if (add.length || remove.length) {
      return { add, remove, source: this.originalValue };
    } else {
      return this.originalValue;
    }
  }

  private get addValue(): IEntity[] {
    return this.extract((currentValue) => currentValue.add, []);
  }

  private get removeValue(): IEntity[] {
    return this.extract((currentValue) => currentValue.remove, []);
  }

  private get value(): MultiFieldValueT<IEntity> {
    return this.field.value;
  }

  private extract(converter: (value: IMultiEntity) => IEntity[],
                  defaultValue?: IEntity[]): IEntity[] {
    const currentValue = this.value;
    return isNotMultiEntity(currentValue)
      ? orDefault<IEntity[], IEntity[]>(
          isDef(defaultValue),
          defaultValue,
          () => normalizeEntities(currentValue as NotMultiFieldEntityT<IEntity>)
      )
      : (currentValue ? converter(currentValue as IMultiEntity) : []);
  }
}
