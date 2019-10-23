import { BaseSelect } from './basic-select.component';
import { ISelectInternalProps, ISelectInternalState } from './select.interface';
import { ISelectOptionEntity } from '../../../definition';
import { joinClassName } from '../../../util';

export class Select extends BaseSelect<ISelectInternalProps, ISelectInternalState> {

  public static defaultProps: ISelectInternalProps = {
    forceReload: true,
    preventFocus: true,
  };

  /**
   * @stable [20.08.2018]
   * @returns {ISelectOptionEntity[]}
   */
  protected toFilteredOptions(): ISelectOptionEntity[] {
    return super.toFilteredOptions().filter((option) => option.value !== this.value);
  }

  /**
   * @stable [21.09.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-select');
  }
}
