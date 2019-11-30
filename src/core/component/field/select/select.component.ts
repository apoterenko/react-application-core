import { BaseSelect } from './base-select.component';
import {
  ISelectProps,
  ISelectState,
} from './select.interface';
import { ISelectOptionEntity } from '../../../definition';
import { joinClassName } from '../../../util';

export class Select extends BaseSelect<ISelectProps, ISelectState> {

  public static readonly defaultProps: ISelectProps = {
    forceReload: true,
    preventFocus: true,
  };

  /**
   * @stable [30.11.2019]
   * @returns {ISelectOptionEntity[]}
   */
  protected get filteredOptions(): ISelectOptionEntity[] {
    return this.options.filter((option) => option.value !== this.value);
  }

  /**
   * @stable [30.11.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-select');
  }
}
