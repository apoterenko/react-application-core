import {
  ITextFieldProps,
  ITextFieldState,
  TextFieldClassesEnum,
} from '../../../definition';
import { BaseTextField } from './base-text-field.component';
import {
  ClsUtils,
  PropsUtils,
} from '../../../util';

/**
 * @component-impl
 * @stable [21.08.2020]
 */
export class TextField extends BaseTextField<ITextFieldProps, ITextFieldState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ITextFieldProps>({
    clearActionRendered: false,
  }, BaseTextField);

  /**
   * @stable [18.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      TextFieldClassesEnum.TEXT_FIELD
    );
  }
}
