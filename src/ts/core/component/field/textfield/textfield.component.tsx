import * as React from 'react';

import { INativeMaterialComponent } from 'core/component/material';

import { ITextField, ITextFieldInternalProps, ITextFieldInternalState } from './textfield.interface';
import { BasicTextField } from './basic-textfield.component';

export class TextField extends BasicTextField<TextField,
                                              ITextFieldInternalProps,
                                              ITextFieldInternalState,
                                              INativeMaterialComponent>
    implements ITextField {
}
