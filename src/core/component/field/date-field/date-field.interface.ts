import { CSSProperties, Component } from 'react';

import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from '../textfield/base-textfield.interface';
import {
  ICurrentTimeWrapper,
  IFormatWrapper,
  IDialogOpenedWrapper,
} from '../../../definitions.interface';

export interface IDateFieldProps extends IBaseTextFieldProps,
                                         IFormatWrapper {
  maxDate?: Date;
  minDate?: Date;
}

export interface IDateFieldState
  extends IBaseTextFieldState,
    ICurrentTimeWrapper<Date>,
    IDialogOpenedWrapper {
  year?: number; // TODO
}
