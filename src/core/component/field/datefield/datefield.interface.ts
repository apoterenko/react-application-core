import { CSSProperties, Component } from 'react';

import {
  IBasicTextFieldProps,
  IBasicTextFieldState,
} from '../textfield/base-textfield.interface';
import { IFormatWrapper, ICurrentTimeWrapper } from '../../../definitions.interface';

export interface IDateFieldProps extends IBasicTextFieldProps,
                                         IFormatWrapper {
  autoOk?: boolean;
  firstDayOfWeek?: number;
  maxDate?: Date;
  minDate?: Date;
  locale?: string;
  okLabel?: string;
}

export interface IDateFieldState extends IBasicTextFieldState,
                                        ICurrentTimeWrapper<Date> {
}
