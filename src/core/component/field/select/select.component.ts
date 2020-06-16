import { BaseSelect } from './base-select.component';
import {
  ISelectProps,
  ISelectState,
} from './select.interface';
import { IPresetsSelectOptionEntity } from '../../../definition';
import { joinClassName } from '../../../util';

export class Select extends BaseSelect<ISelectProps, ISelectState> {

  public static readonly defaultProps: ISelectProps = {
    preventFocus: true,
  };

  /**
   * @stable [28.01.2020]
   * @returns {IPresetsSelectOptionEntity[]}
   */
  protected getFilteredOptions(): IPresetsSelectOptionEntity[] {
    const id = this.fromSelectOptionEntityToId(this.value);
    return super.getFilteredOptions((option) => this.fromSelectOptionEntityToId(option) !== id);
  }

  /**
   * @stable [30.11.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-select');
  }
}
