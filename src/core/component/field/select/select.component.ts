import { BasicSelect } from './basic-select.component';
import { ISelectInternalProps, ISelectInternalState } from './select.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';

export class Select extends BasicSelect<Select, ISelectInternalProps, ISelectInternalState> {

  public static defaultProps: ISelectInternalProps = {
    forceReload: true,
  };

  /**
   * @stable [20.08.2018]
   * @returns {ISelectOptionEntity[]}
   */
  protected toFilteredOptions(): ISelectOptionEntity[] {
    return super.toFilteredOptions().filter((option) => option.value !== this.value);
  }
}
