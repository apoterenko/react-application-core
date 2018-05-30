import { MDCCheckbox } from '@material/checkbox';

import { noop } from '../../../util';
import { INativeMaterialCheckboxComponent } from '../../material';
import { Checkbox } from '../../field';
import { MaterialPlugin } from './material.plugin';

export class CheckboxMaterialPlugin
    extends MaterialPlugin<Checkbox, INativeMaterialCheckboxComponent> {

  /**
   * @stable [30.05.2018]
   * @param {Checkbox} field
   */
  constructor(field: Checkbox) {
    super(field, MDCCheckbox);

    field.getRawValueFromEvent = this.getRawValueFromEvent.bind(this);
  }

  /**
   * @stable [30.05.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    Reflect.defineProperty(this.component.input, 'value', {
      get: () => this.getRawValueFromEvent,
      set: noop,
    });
  }

  /**
   * @stable [30.05.2018]
   * @returns {boolean}
   */
  private getRawValueFromEvent(): boolean {
    return this.mdc.checked;
  }
}
