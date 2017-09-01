import * as React from 'react';

import { ITextFieldInternalProps, ITextFieldInternalState } from './textfield.interface';
import { BasicTextField } from './basic-textfield.component';

export class TextField extends BasicTextField<TextField,
                                              ITextFieldInternalProps,
                                              ITextFieldInternalState> {
}
