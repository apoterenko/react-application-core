import { BaseSelect } from './base-select.component';
import {
  ISelectProps,
  ISelectState,
} from './select.interface';
import { ISelectOptionEntity } from '../../../definition';
import { joinClassName } from '../../../util';

export class Select extends BaseSelect<ISelectProps, ISelectState> {

  public static readonly defaultProps: ISelectProps = {
    preventFocus: true,
  };

  /**
   * @stable [28.01.2020]
   * @returns {ISelectOptionEntity[]}
   */
  protected getFilteredOptions(): ISelectOptionEntity[] {
    const id = this.selectOptionEntityAsId(this.value);
    return super.getFilteredOptions((option) => this.selectOptionEntityAsId(option) !== id);
  }

  /**
   * @stable [30.11.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-select');
  }
}
