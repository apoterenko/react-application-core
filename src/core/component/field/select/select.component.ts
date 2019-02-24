import { BasicSelect } from './basic-select.component';
import { ISelectInternalProps, ISelectInternalState } from './select.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { toClassName } from '../../../util';

export class Select extends BasicSelect<ISelectInternalProps, ISelectInternalState> {

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
    return toClassName(super.getFieldClassName(), 'rac-select');
  }
}
