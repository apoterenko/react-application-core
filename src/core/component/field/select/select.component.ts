import { BasicSelect } from './basic-select.component';
import { ISelectInternalProps, ISelectInternalState } from './select.interface';
import { SelectOptionT } from '../../field';

export class Select extends BasicSelect<Select, ISelectInternalProps, ISelectInternalState> {

  protected toFilteredOptions(options: SelectOptionT[]): SelectOptionT[] {
    return super.toFilteredOptions(options).filter((option) =>
        option.value !== this.value);
  }
}
