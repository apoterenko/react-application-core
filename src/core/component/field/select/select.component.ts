import { BaseSelect } from './base-select.component';
import {
  IPresetsSelectOptionEntity,
  ISelectProps,
  ISelectState,
  SelectClassesEnum,
} from '../../../definition';
import {
  ClsUtils,
  PropsUtils,
} from '../../../util';

export class Select extends BaseSelect<ISelectProps, ISelectState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ISelectProps>({
    preventFocus: true,
  }, BaseSelect);

  /**
   * @stable [28.01.2020]
   * @returns {IPresetsSelectOptionEntity[]}
   */
  protected getFilteredOptions(): IPresetsSelectOptionEntity[] {
    const id = this.fromSelectValueToId(this.value);
    return super.getFilteredOptions((option) => this.fromSelectValueToId(option) !== id);
  }

  /**
   * @stable [17.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), SelectClassesEnum.SELECT);
  }
}
