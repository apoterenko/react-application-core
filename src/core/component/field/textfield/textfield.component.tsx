import * as React from 'react';

import { ITextField, ITextFieldInternalProps, ITextFieldInternalState } from './textfield.interface';
import { BasicTextField } from './basic-textfield.component';
import { INativeMaterialTextfieldComponent } from './basic-textfield.interface';

export class TextField extends BasicTextField<TextField,
                                              ITextFieldInternalProps,
                                              ITextFieldInternalState,
                                              INativeMaterialTextfieldComponent>
    implements ITextField {
}
