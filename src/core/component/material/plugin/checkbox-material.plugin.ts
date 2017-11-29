import { MDCCheckbox } from '@material/checkbox';

import { INativeMaterialCheckboxComponent } from '../../../component/material';
import { Checkbox } from '../../../component/field';
import { FieldMaterialPlugin } from './field-material.plugin';
import { ChangeEventT } from '../../../definition.interface';

export class CheckboxMaterialPlugin
    extends FieldMaterialPlugin<Checkbox, INativeMaterialCheckboxComponent> {

  constructor(field: Checkbox) {
    super(field, MDCCheckbox);

    field.getRawValueFromEvent = this.getRawValueFromEvent.bind(this);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    Reflect.defineProperty(this.component.input, 'value', {
      get: () => {
        return this.mdc.checked;
      },
    });
  }

  private getRawValueFromEvent(event: ChangeEventT): boolean {
    return this.mdc.checked;
  }
}
