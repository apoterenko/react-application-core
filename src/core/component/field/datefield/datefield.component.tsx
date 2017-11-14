import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as R from 'ramda';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

import { DI_TYPES, lazyInject } from '../../../di';
import { isUndef } from '../../../util';
import { IKeyValue, ChangeEventT, KeyboardEventT, FocusEventT } from '../../../definition.interface';
import { DateTimeLikeTypeT, IDateConverter } from '../../../converter';
import { IApplicationDateTimeSettings } from '../../../settings';
import {
  IDateFieldInternalProps,
  IDateFieldInternalState,
  IMaterialDateDialogComponent,
} from './datefield.interface';
import {
  INativeMaterialBasicTextFieldComponent,
  BasicTextField,
  IBasicTextFieldAction,
} from '../textfield';

export class DateField extends BasicTextField<DateField,
                                              IDateFieldInternalProps,
                                              IDateFieldInternalState,
                                              INativeMaterialBasicTextFieldComponent> {
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

  protected defaultAction: IBasicTextFieldAction = {
    type: 'arrow_drop_down',
    actionHandler: () => this.input.focus(),
  };

  @lazyInject(DI_TYPES.DateConverter) private dateConverter: IDateConverter;
  private preventShowDialog: boolean;

  constructor(props: IDateFieldInternalProps) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
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

  protected getRawValueFromEvent(event: ChangeEventT): DateTimeLikeTypeT {
    return this.convertToDate(event.target.value);
  }

  protected prepareStateValueBeforeSerialization(value: DateTimeLikeTypeT): string {
    // Date value must be able to be serialized as a string
    const v = super.prepareStateValueBeforeSerialization(value);
    return isUndef(v) ? v : this.formatDate(v);
  }

  protected propsChangeForm(rawValue: DateTimeLikeTypeT): void {
    super.propsChangeForm(
        this.prepareStateValueBeforeSerialization(rawValue),
    );
  }

  protected getComponent(): JSX.Element {
    const props = this.props;
    return (
        <div className='app-textfield-input-wrapper'>
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

  protected getComponentProps(): IKeyValue {
    return {
      ...super.getComponentProps(),

      mask: this.fieldMask,
      pattern: this.fieldPattern,

      // We must bind a string value to the input field
      // because a state must hold the raw values
      // although at this case the state hold the string value
      value: this.formatDate(this.value),
    };
  }

  private onAccept(date: Date): void {
    this.onChangeValue(date, null);

    this.preventShowDialog = true;
    this.input.focus();
  }

  private get dialogDate(): Date {
    const value = this.value;
    const defaultDate = this.dateConverter.getCurrentDate();
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

  private get fieldMask(): Array<string|RegExp> {
    return this.props.mask || this.dateTimeSettings.uiDateMask;
  }

  private get fieldFormat(): string {
    return this.props.format || this.dateTimeSettings.uiDateFormat;
  }

  private get fieldPattern(): string {
    return this.props.pattern || this.dateTimeSettings.uiDatePattern;
  }

  private get dateTimeSettings(): IApplicationDateTimeSettings {
    return this.applicationSettings.dateTimeSettings || {};
  }

  private formatDate(value: DateTimeLikeTypeT): string {
    return this.dateConverter.format(value, this.fieldFormat, this.fieldFormat);
  }

  private convertToDate(value: string): DateTimeLikeTypeT {
    return this.dateConverter.toDate(value, this.fieldFormat);
  }
}
