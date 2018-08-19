import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as R from 'ramda';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

import { cancelEvent, isUndef, orUndef } from '../../../util';
import { ChangeEventT, KeyboardEventT, BasicEventT, AnyT } from '../../../definitions.interface';
import { DateTimeLikeTypeT } from '../../../converter';
import { IApplicationDateTimeSettings } from '../../../settings';
import {
  IDateFieldInternalProps,
  IDateFieldInternalState,
  IMaterialDateDialogComponent,
} from './datefield.interface';
import { BasicTextField } from '../textfield';

export class DateField extends BasicTextField<DateField,
                                              IDateFieldInternalProps,
                                              IDateFieldInternalState> {
  public static defaultProps: IDateFieldInternalProps = {
    container: 'dialog',
    autoOk: true,
    disableYearSelection: false,
    firstDayOfWeek: 1,
    hideCalendarDate: false,
    style: {},
    openToYearSelection: false,
  };

  public static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props: IDateFieldInternalProps) {
    super(props);
    this.onAccept = this.onAccept.bind(this);

    this.defaultActions = R.insert(0,
        {
          type: 'date_range',
          onClick: () => {
            this.setFocus();
            this.dialogWindow.show();
          },
        },
        this.defaultActions
    );
  }

  public onKeyEnter(event: KeyboardEventT): void {
    super.onKeyEnter(event);

    if (this.dialogWindow.state.open) {
      cancelEvent(event);
    }
  }

  public getRawValueFromEvent(event: ChangeEventT): DateTimeLikeTypeT {
    return this.tryConvertToDate(super.getRawValueFromEvent(event));
  }

  protected toSerializedValue(rawValue: DateTimeLikeTypeT): string {
    // Date value must be able to be serialized as a string
    return orUndef(!isUndef(rawValue), () => this.formatDate(rawValue));
  }

  protected getInputAttachmentElement(): JSX.Element {
    const props = this.props;
    return (
        <DatePickerDialog ref='dialogWindow'
                          autoOk={props.autoOk}
                          cancelLabel={props.cancelLabel}
                          container={props.container}
                          containerStyle={props.dialogContainerStyle}
                          disableYearSelection={props.disableYearSelection}
                          firstDayOfWeek={props.firstDayOfWeek}
                          initialDate={this.dialogDate}
                          locale={props.locale}
                          maxDate={props.maxDate}
                          minDate={props.minDate}
                          mode={props.mode}
                          okLabel={props.okLabel}
                          onAccept={this.onAccept}
                          shouldDisableDate={props.shouldDisableDate}
                          hideCalendarDate={props.hideCalendarDate}
                          openToYearSelection={props.openToYearSelection}
                          utils={props.utils}/>
    );
  }

  protected getFieldMask(): Array<string|RegExp> {
    return super.getFieldMask() || this.dateTimeSettings.uiDateMask;
  }

  protected getFieldPattern(): string {
    return super.getFieldPattern() || this.dateTimeSettings.uiDatePattern;
  }

  protected toDisplayValue(value: AnyT): string {
    return this.formatDate(super.toDisplayValue(value));
  }

  protected onClick(event: BasicEventT): void {
    super.onClick(event);
    this.dialogWindow.show();
  }

  /**
   * @stable [20.08.2018]
   * @param {Date} date
   */
  private onAccept(date: Date): void {
    this.onChangeManually(date);
    this.setFocus();  // UX
  }

  private get dialogDate(): Date {
    const value = this.value;
    const defaultDate = this.dc.getCurrentDate();
    if (R.isNil(value)) {
      return defaultDate;
    }
    const dateValue = this.tryConvertToDate(value);
    return dateValue instanceof Date
        ? dateValue as Date
        : defaultDate;
  }

  private get dialogWindow(): IMaterialDateDialogComponent {
    return this.refs.dialogWindow as IMaterialDateDialogComponent;
  }

  private get fieldFormat(): string {
    return this.props.format || this.dateTimeSettings.uiDateFormat;
  }

  private get dateTimeSettings(): IApplicationDateTimeSettings {
    return this.settings.dateTime || {};
  }

  private formatDate(value: DateTimeLikeTypeT): string {
    return this.dc.format(value, this.fieldFormat, this.fieldFormat);
  }

  private tryConvertToDate(value: string): DateTimeLikeTypeT {
    return this.dc.tryConvertToDate(value, this.fieldFormat);
  }
}
