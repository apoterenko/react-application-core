import { BasicSelect } from './basic-select.component';
import { ISelectInternalProps, ISelectInternalState } from './select.interface';
import { ISelectOption } from '../../field';

export class Select extends BasicSelect<Select, ISelectInternalProps, ISelectInternalState> {

  protected toFilteredOptions(options: ISelectOption[]): ISelectOption[] {
    return super.toFilteredOptions(options).filter((option) =>
        option.value !== this.value);
  }
}
