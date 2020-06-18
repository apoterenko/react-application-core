import {
  ITextFieldProps,
  ITextFieldState,
  TextFieldClassesEnum,
} from '../../../definition';
import { BaseTextField } from './base-text-field.component';
import { ClsUtils } from '../../../util';

/**
 * @component-impl
 * @stable [18.06.2020]
 */
export class TextField extends BaseTextField<ITextFieldProps,
  ITextFieldState> {

  public static readonly defaultProps: ITextFieldProps = {
    clearActionRendered: false,
  };

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
