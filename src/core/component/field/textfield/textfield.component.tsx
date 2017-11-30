import { ITextField, ITextFieldInternalProps, ITextFieldInternalState } from './textfield.interface';
import { BasicTextField } from './basic-textfield.component';

export class TextField extends BasicTextField<TextField,
                                              ITextFieldInternalProps,
                                              ITextFieldInternalState>
    implements ITextField {

  public static defaultProps: ITextFieldInternalProps = {
    clearAction: false,
  };
}
