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
  autoOk?: boolean;
  firstDayOfWeek?: number;
  maxDate?: Date;
  minDate?: Date;
  locale?: string;
  okLabel?: string;
}

export interface IDateFieldState
  extends IBaseTextFieldState,
    ICurrentTimeWrapper<Date>,
    IDialogOpenedWrapper {
  year?: number; // TODO
}
