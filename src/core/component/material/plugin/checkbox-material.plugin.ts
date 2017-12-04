import { MDCCheckbox } from '@material/checkbox';

import { noop } from '../../../util';
import { INativeMaterialCheckboxComponent } from '../../../component/material';
import { Checkbox } from '../../../component/field';
import { FieldMaterialPlugin } from './field-material.plugin';

export class CheckboxMaterialPlugin
    extends FieldMaterialPlugin<Checkbox, INativeMaterialCheckboxComponent> {

  constructor(field: Checkbox) {
    super(field, MDCCheckbox);

    field.getRawValueFromEvent = this.getRawValueFromEvent.bind(this);
  }

  public componentDidMount(): void {
    super.componentDidMount();

    Reflect.defineProperty(this.component.input, 'value', {
      get: () => this.getRawValueFromEvent,
      set: noop,
    });
  }

  private getRawValueFromEvent(): boolean {
    return this.mdc.checked;
  }
}
