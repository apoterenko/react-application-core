import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as R from 'ramda';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

import { DI_TYPES, lazyInject } from '../../../di';
import { isUndef } from '../../../util';
import { ChangeEventT, KeyboardEventT, FocusEventT } from '../../../definition.interface';
import { DateTimeLikeTypeT, IDateConverter } from '../../../converter';
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
    disabled: false,
    disableYearSelection: false,
    firstDayOfWeek: 1,
    hideCalendarDate: false,
    style: {},
    openToYearSelection: false,
  };

  public static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  @lazyInject(DI_TYPES.DateConverter) private dc: IDateConverter;
  private preventShowDialog: boolean;

  constructor(props: IDateFieldInternalProps) {
    super(props);
    this.onAccept = this.onAccept.bind(this);

    this.defaultActions = R.insert(0,
        {
          type: 'date_range',
          actionHandler: () => this.setFocus(),
        },
        this.defaultActions
    );
  }

  public onFocus(event: FocusEventT): void {
    super.onFocus(event);

    if (isUndef(this.preventShowDialog) || this.preventShowDialog === true) {
      this.dialogWindow.show();
      delete this.preventShowDialog;
    }
  }

  public onKeyEnter(event: KeyboardEventT): void {
    super.onKeyEnter(event);

    if (this.dialogWindow.state.open) {
      this.stopEvent(event);
    }
  }

  public getRawValueFromEvent(event: ChangeEventT): DateTimeLikeTypeT {
    return this.convertToDate(super.getRawValueFromEvent(event));
  }

  protected prepareStateValueBeforeSerialization(rawValue: DateTimeLikeTypeT): string {
    // Date value must be able to be serialized as a string
    return isUndef(rawValue) ? undefined : this.formatDate(rawValue);
  }

  protected getComponent(): JSX.Element {
    const props = this.props;
    return (
        <div className='rac-field-input-wrapper'>
          {super.getComponent()}
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
        </div>
    );
  }

  protected getFieldMask(): Array<string|RegExp> {
    return super.getFieldMask() || this.dateTimeSettings.uiDateMask;
  }

  protected getFieldPattern(): string {
    return super.getFieldPattern() || this.dateTimeSettings.uiDatePattern;
  }

  protected toDisplayValue(): string {
    return this.formatDate(super.toDisplayValue());
  }

  private onAccept(date: Date): void {
    this.onChangeValue(date, null);

    this.preventShowDialog = true;
    this.setFocus();
  }

  private get dialogDate(): Date {
    const value = this.value;
    const defaultDate = this.dc.getCurrentDate();
    if (R.isNil(value)) {
      return defaultDate;
    }
    const dateValue = this.convertToDate(value);
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
    return this.applicationSettings.dateTime || {};
  }

  private formatDate(value: DateTimeLikeTypeT): string {
    return this.dc.format(value, this.fieldFormat, this.fieldFormat);
  }

  private convertToDate(value: string): DateTimeLikeTypeT {
    return this.dc.convertToDate(value, this.fieldFormat);
  }
}
