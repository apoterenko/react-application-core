import { ITextField, ITextFieldInternalProps, ITextFieldInternalState } from './textfield.interface';
import { BasicTextField } from './basic-textfield.component';
import { INativeMaterialBasicTextFieldComponent } from './basic-textfield.interface';

export class TextField extends BasicTextField<TextField,
                                              ITextFieldInternalProps,
                                              ITextFieldInternalState,
                                              INativeMaterialBasicTextFieldComponent>
    implements ITextField {
}
