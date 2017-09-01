import { CSSProperties, PureComponent } from 'react';

import { IBaseComponentInternalProps } from 'core/component/base';
import { IFieldInternalProps, IFieldInternalState } from 'core/component/field/field';

export interface IDateFieldInternalProps extends IFieldInternalProps {
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
  shouldDisableDate?: () => boolean;
  hideCalendarDate?: boolean;
}

export interface IDateFieldInternalState extends IFieldInternalState {
}

export interface IMaterialDatePickerDialogComponent
    extends PureComponent<IBaseComponentInternalProps, { open: boolean }> {
  show(): void;
}
