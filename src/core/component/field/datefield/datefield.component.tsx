import * as React from 'react';
import * as R from 'ramda';
import DayPicker from 'react-day-picker';

import { orNull, nvl } from '../../../util';
import { AnyT } from '../../../definitions.interface';
import { IBasicEvent } from '../../../react-definitions.interface';
import { DateTimeLikeTypeT } from '../../../converter';
import { IDateTimeSettings } from '../../../settings';
import {
  IDateFieldProps,
  IDateFieldState,
} from './datefield.interface';
import { BaseTextField } from '../textfield';
import { Dialog } from '../../dialog';
import { FlexLayout } from '../../layout';
import { NumberField } from '../numberfield';

export class DateField<TProps extends IDateFieldProps = IDateFieldProps,
                       TState extends IDateFieldState = IDateFieldState>
  extends BaseTextField<TProps, TState> {

  public static defaultProps: IDateFieldProps = {
    autoOk: true,
    firstDayOfWeek: 1,
    preventFocus: true,
  };

  private dialogRef = React.createRef<Dialog<AnyT>>();

  /**
   * @stable [07.01.2019]
   * @param {IDateFieldProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onChangeYear = this.onChangeYear.bind(this);
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

  protected getInputAttachmentElement(): JSX.Element {
    const props = this.props;
    const initialDate = this.dialogDate;
    return (
      <Dialog
        ref={this.dialogRef}
        acceptable={false}
        closable={false}
        titleRendered={false}
      >
        <FlexLayout
          full={false}>
          <NumberField
            value={this.state.year}
            onChange={this.onChangeYear}>
          </NumberField>
        </FlexLayout>
        <DayPicker
          firstDayOfWeek={props.firstDayOfWeek}
          fixedWeeks={true}
          locale={props.locale}
          month={initialDate}
          selectedDays={initialDate}
          onDayClick={this.onAccept}/>
      </Dialog>
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
    this.onCalendarClick();
  }

  /**
   * @stable [07.01.2019]
   * @param {AnyT} value
   * @returns {string}
   */
  protected decorateValueBeforeDisplaying(value: DateTimeLikeTypeT): string {
    return this.formatDate(value);
  }

  /**
   * @stable [19.04.2019]
   * @param {number} value
   */
  private onChangeYear(value: number): void {
    this.setState({year: value});

    const date = new Date(this.dialogDate.getTime());
    date.setFullYear(value);
    this.onChangeManually(date);
  }

  /**
   * @stable [24.02.2019]
   * @param {Date} currentTime
   */
  private onAccept(currentTime: Date): void {
    this.onChangeManually(currentTime);
    this.dialog.onAccept();
  }

  /**
   * @stable [07.01.2019]
   * @returns {Date}
   */
  private get dialogDate(): Date {
    if (!this.isValuePresent()) {
      return this.dc.getCurrentDate();
    }
    const dateValue = this.dc.tryConvertToDate(this.value, this.getFieldFormat());
    return dateValue instanceof Date
        ? dateValue
        : this.dc.getCurrentDate();
  }

  /**
   * @stable [24.02.2019]
   * @returns {Dialog}
   */
  private get dialog(): Dialog {
    return this.dialogRef.current;
  }

  /**
   * @stable [24.02.2019]
   * @returns {IDateTimeSettings}
   */
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
   * @stable [24.02.2019]
   */
  private onCalendarClick(): void {
    this.dialog.activate();
  }
}
