import * as React from 'react';

import { IMaterialComponent } from 'core/component/material';

import { ITextFieldInternalProps, ITextFieldInternalState } from './textfield.interface';
import { BasicTextField } from './basic-textfield.component';

export class TextField extends BasicTextField<TextField,
                                              ITextFieldInternalProps,
                                              ITextFieldInternalState,
                                              IMaterialComponent> {
}
