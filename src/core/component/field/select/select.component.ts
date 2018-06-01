import { BasicSelect } from './basic-select.component';
import { ISelectInternalProps, ISelectInternalState } from './select.interface';
import { ISelectOptionEntity } from '../../field';

export class Select extends BasicSelect<Select, ISelectInternalProps, ISelectInternalState> {

  public static defaultProps: ISelectInternalProps = {
    forceAll: true,
  };

  /**
   * @stable [01.06.2018]
   * @param {ISelectOptionEntity[]} options
   * @returns {ISelectOptionEntity[]}
   */
  protected toFilteredOptions(options: ISelectOptionEntity[]): ISelectOptionEntity[] {
    return super.toFilteredOptions(options).filter((option) => option.value !== this.value);
  }
}
