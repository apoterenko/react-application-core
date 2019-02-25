import { ITextField, ITextFieldInternalProps, ITextFieldInternalState } from './textfield.interface';
import { BaseTextField } from './base-textfield.component';
import { toClassName } from '../../../util';

export class TextField extends BaseTextField<ITextFieldInternalProps,
                                              ITextFieldInternalState>
    implements ITextField {

  public static defaultProps: ITextFieldInternalProps = {
    clearActionRendered: false,
  };

  /**
   * @stable [22.02.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-text');
  }
}
