import { CSSProperties, PureComponent } from 'react';

import { IBaseComponentInternalProps } from '../../../component/base';

import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldInternalState,
} from '../textfield/basic-textfield.interface';

export interface IDateFieldInternalProps extends IBasicTextFieldInternalProps {
  container?: 'dialog' | 'inline';
  mode?: 'portrait' | 'landscape';
  format?: string;
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
  shouldDisableDate?: () => boolean;
  hideCalendarDate?: boolean;
}

export interface IDateFieldInternalState extends IBasicTextFieldInternalState {
}

export interface IMaterialDateDialogComponent
    extends PureComponent<IBaseComponentInternalProps, { open: boolean }> {
  show(): void;
}
