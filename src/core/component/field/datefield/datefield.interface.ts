import { CSSProperties, Component } from 'react';

import {
  IBasicTextFieldProps,
  IBasicTextFieldState,
} from '../textfield/base-textfield.interface';
import { IComponentEntity } from '../../../entities-definitions.interface';
import { IFormatWrapper } from '../../../definitions.interface';

export interface IDateFieldProps extends IBasicTextFieldProps,
                                         IFormatWrapper {
  container?: 'dialog' | 'inline';
  mode?: 'portrait' | 'landscape';
  cancelLabel?: string;
  autoOk?: boolean;
  dialogContainerStyle?: CSSProperties;
  disableYearSelection?: boolean;
  firstDayOfWeek?: number;
  maxDate?: Date;
  minDate?: Date;
  locale?: string;
  okLabel?: string;
  utils?: any;
  openToYearSelection?: boolean;
  shouldDisableDate?: (day: Date) => boolean;
  hideCalendarDate?: boolean;
}

export interface IDateFieldState extends IBasicTextFieldState {
}

export interface IMaterialDateDialogComponent extends Component<IComponentEntity, { open: boolean }> {
  show(): void;
}
