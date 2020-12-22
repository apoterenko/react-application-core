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

/**
 * @component-impl
 * @stable [22.12.2020]
 */
export class Select extends BaseSelect<ISelectProps, ISelectState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ISelectProps>({
    preventFocus: true,
  }, BaseSelect);

  /**
   * @stable [22.12.2020]
   * @protected
   */
  protected getFilteredOptions(): IPresetsSelectOptionEntity[] {
    const id = this.fromSelectValueToId(this.value);
    return super.getFilteredOptions((option) => this.fromSelectValueToId(option) !== id);
  }

  /**
   * @stable [22.12.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), SelectClassesEnum.SELECT);
  }
}
