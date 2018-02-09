import { INamedEntity } from '../../../definition.interface';
import { FieldT } from '../field';
import { IMultiFieldPlugin, MultiFieldEntityT } from './multifield.interface';
import { BasicMultiFieldPlugin } from './basic-multifield.plugin';
import { IBasicMultiFieldChangesResult } from './basic-multifield.interface';

export class MultiFieldPlugin extends BasicMultiFieldPlugin<FieldT> implements IMultiFieldPlugin {

  public onAdd(item: INamedEntity): IBasicMultiFieldChangesResult|void {
    this.onChange(this.toChangesPayload(super.onAdd(item) as IBasicMultiFieldChangesResult));
  }

  public onDelete(item: INamedEntity): IBasicMultiFieldChangesResult|void {
    this.onChange(this.toChangesPayload(super.onDelete(item) as IBasicMultiFieldChangesResult));
  }

  private getActiveValueLength(entity: MultiFieldEntityT<INamedEntity>): number {
    return Array.isArray(entity)
        ? entity.length
        : this.toActiveValue(entity).length;
  }

  private onChange(payload: MultiFieldEntityT<INamedEntity>): void {
    const activeValueLength = this.getActiveValueLength(payload);
    if (activeValueLength === 0) {
      this.field.cleanNativeInputBeforeHTML5Validation();
    } else {
      this.field.updateNativeInputBeforeHTML5Validation(this.field.toDisplayValue(activeValueLength));
    }
    this.field.onChangeValue(payload);
    this.field.setFocus();
  }
}
