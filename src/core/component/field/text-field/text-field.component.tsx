import { ITextFieldProps, ITextFieldState } from './textfield.interface';
import { BaseTextField } from './base-textfield.component';
import { joinClassName } from '../../../util';

export class TextField extends BaseTextField<ITextFieldProps,
                                             ITextFieldState> {

  public static readonly defaultProps: ITextFieldProps = {
    clearActionRendered: false,
  };

  /**
   * @stable [22.02.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-text');
  }
}
