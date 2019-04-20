import { CSSProperties, Component } from 'react';

import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from '../textfield/base-textfield.interface';
import { IFormatWrapper, ICurrentTimeWrapper } from '../../../definitions.interface';

export interface IDateFieldProps extends IBaseTextFieldProps,
                                         IFormatWrapper {
  autoOk?: boolean;
  firstDayOfWeek?: number;
  maxDate?: Date;
  minDate?: Date;
  locale?: string;
  okLabel?: string;
}

export interface IDateFieldState extends IBaseTextFieldState,
                                        ICurrentTimeWrapper<Date> {
  year?: number; // TODO
}
