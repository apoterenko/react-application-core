import * as React from 'react';
import * as R from 'ramda';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

import { cancelEvent, orNull, nvl } from '../../../util';
import { KeyboardEventT, AnyT } from '../../../definitions.interface';
import { IBasicEvent } from '../../../react-definitions.interface';
import { DateTimeLikeTypeT } from '../../../converter';
import { IDateTimeSettings } from '../../../settings';
import {
  IDateFieldProps,
  IDateFieldState,
  IMaterialDateDialogComponent,
} from './datefield.interface';
import { BaseTextField } from '../textfield';

export class DateField<TComponent extends DateField<TComponent, TProps, TState>,
                       TProps extends IDateFieldProps = IDateFieldProps,
                       TState extends IDateFieldState = IDateFieldState>
  extends BaseTextField<TComponent, TProps, TState> {

  public static defaultProps: IDateFieldProps = {
    autoOk: true,
    firstDayOfWeek: 1,
  };

  /**
   * @stable [07.01.2019]
   * @param {IDateFieldProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onCalendarClick = this.onCalendarClick.bind(this);

    this.defaultActions = R.insert(0, {type: 'calendar_alt', onClick: this.onCalendarClick}, this.defaultActions);
  }

  /**
   * @stable [07.01.2018]
   * @param {DateTimeLikeTypeT} currentRawValue
   */
  public onChangeManually(currentRawValue: DateTimeLikeTypeT): void {
    super.onChangeManually(this.formatDate(currentRawValue));
  }

  public onKeyEnter(event: KeyboardEventT): void {
    super.onKeyEnter(event);

    if (this.dialogWindow.state.open) {
      cancelEvent(event);
    }
  }

  protected getInputAttachmentElement(): JSX.Element {
    const props = this.props;
    return (
      <DatePickerDialog
        ref='dialogWindow'
        autoOk={props.autoOk}
        cancelLabel={props.cancelLabel}
        container={props.container}
        containerStyle={props.dialogContainerStyle}
        disableYearSelection={props.disableYearSelection}
        firstDayOfWeek={props.firstDayOfWeek}
        initialDate={this.initialDialogDate}
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

  /**
   * @stable [07.01.2018]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string|RegExp> {
    return orNull<Array<string|RegExp>>(
      !this.hasDisplayValue,
      () => super.getFieldMask() || this.dateTimeSettings.uiDateMask
    );
  }

  /**
   * @stable [07.01.2019]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return orNull<string>(
      !this.hasDisplayValue,
      () => super.getFieldPattern() || this.dateTimeSettings.uiDatePattern
    );
  }

  /**
   * @stable [07.01.2019]
   * @returns {string}
   */
  protected getFieldFormat(): string {
    return nvl(this.props.format, this.dateTimeSettings.uiDateFormat);
  }

  /**
   * @stable [07.01.2018]
   * @param {IBasicEvent} event
   */
  protected onClick(event: IBasicEvent): void {
    super.onClick(event);
    this.dialogWindow.show();
  }

  /**
   * @stable [07.01.2019]
   * @param {AnyT} value
   * @returns {string}
   */
  protected prepareValueBeforeDisplaying(value: DateTimeLikeTypeT): string {
    return this.formatDate(value);
  }

  /**
   * @stable [20.08.2018]
   * @param {Date} date
   */
  private onAccept(date: Date): void {
    this.onChangeManually(date);
    this.setFocus();  // UX
  }

  /**
   * @stable [07.01.2019]
   * @returns {Date}
   */
  private get initialDialogDate(): Date {
    if (!this.isValuePresent()) {
      return this.dc.getCurrentDate();
    }
    const dateValue = this.dc.tryConvertToDate(this.value, this.getFieldFormat());
    return dateValue instanceof Date
        ? dateValue
        : this.dc.getCurrentDate();
  }

  private get dialogWindow(): IMaterialDateDialogComponent {
    return this.refs.dialogWindow as IMaterialDateDialogComponent;
  }

  private get dateTimeSettings(): IDateTimeSettings {
    return this.settings.dateTime || {};
  }

  /**
   * @stable [07.01.2019]
   * @param {DateTimeLikeTypeT} value
   * @returns {string}
   */
  private formatDate(value: DateTimeLikeTypeT): string {
    return this.dc.format(value, this.getFieldFormat(), this.getFieldFormat());
  }

  /**
   * @stable [07.01.2019]
   */
  private onCalendarClick(): void {
    this.setFocus();
    this.dialogWindow.show();
  }
}
