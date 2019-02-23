import { ITextField, ITextFieldInternalProps, ITextFieldInternalState } from './textfield.interface';
import { BaseTextField } from './base-textfield.component';

export class TextField extends BaseTextField<TextField,
                                              ITextFieldInternalProps,
                                              ITextFieldInternalState>
    implements ITextField {

  public static defaultProps: ITextFieldInternalProps = {
    clearActionRendered: false,
  };
}
