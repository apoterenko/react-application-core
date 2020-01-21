import * as React from 'react';
import * as R from 'ramda';

import {
  ifNotEmptyThanValue,
  ifNotNilThanValue,
  isCalendarActionRendered,
  isDef,
  isRangeEnabled,
  joinClassName,
  notEmptyValuesArrayFilter,
  notNilValuesFilter,
  nvl,
  orNull,
} from '../../../util';
import {
  AnyT,
  EntityIdT,
  UNDEF,
} from '../../../definitions.interface';
import {
  DateTimeLikeTypeT,
  FIELD_DISPLAY_EMPTY_VALUE,
  FieldActionTypesEnum,
  IBaseEvent,
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarProps,
  IDateTimeSettingsEntity,
  IFromToDayOfYearEntity,
} from '../../../definition';
import {
  IDateFieldProps,
  IDateFieldState,
} from './date-field.interface';
import { BaseTextField } from '../textfield';
import { Button } from '../../button';
import { Calendar } from '../../calendar';
import { Dialog } from '../../dialog';
import { NumberField } from '../numberfield';

export class DateField<TProps extends IDateFieldProps = IDateFieldProps,
                       TState extends IDateFieldState = IDateFieldState>
  extends BaseTextField<TProps, TState> {

  public static readonly defaultProps: IDateFieldProps = {
    headerFormat: 'MMMM YYYY',
    preventFocus: true,
  };

  private readonly defaultRangeFieldProps: IDateFieldProps = {
    calendarActionRendered: false,
    errorMessageRendered: false,
    full: false,
    placeholder: this.fieldFormat,
    preventFocus: false,
  };

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();
  private readonly yearRef = React.createRef<NumberField>();

  /**
   * @stable [07.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.isDaySelected = this.isDaySelected.bind(this);
    this.isFirstSelectedDay = this.isFirstSelectedDay.bind(this);
    this.isLastSelectedDay = this.isLastSelectedDay.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
    this.onRangeFromChange = this.onRangeFromChange.bind(this);
    this.onRangeToChange = this.onRangeToChange.bind(this);
    this.onSetMonth = this.onSetMonth.bind(this);
    this.onSetQuarter = this.onSetQuarter.bind(this);
    this.onSetWeek = this.onSetWeek.bind(this);
    this.onSetYear = this.onSetYear.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.setNextMonth = this.setNextMonth.bind(this);
    this.setPreviousMonth = this.setPreviousMonth.bind(this);

    this.defaultActions = [
      ...(
        isCalendarActionRendered(this.props)
          ? [{type: FieldActionTypesEnum.CALENDAR, onClick: this.openDialog}]
          : []
      ),
      ...this.defaultActions
    ];
  }

  /**
   * @stable [20.01.2020]
   * @param {DateTimeLikeTypeT[] | DateTimeLikeTypeT | AnyT} currentRawValue
   */
  public onChangeManually(currentRawValue: DateTimeLikeTypeT[] | DateTimeLikeTypeT | AnyT): void {
    super.onChangeManually(
      this.isRangeEnabled
        ? notEmptyValuesArrayFilter(this.serializeValue(currentRawValue[0]), this.serializeValue(currentRawValue[1]))
        : this.serializeValue(currentRawValue)
    );
  }

  /**
   * @stable [09.01.2020]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    const {year, dialogOpened} = this.state;
    const props = this.props;
    const {dialogConfiguration = {}} = props;

    return orNull(
      dialogOpened,  // To improve a performance
      () => {
        return (
          <Dialog
            checkScrim={true}
            {...props.dialogConfiguration}
            ref={this.dialogRef}
            acceptable={false}
            closable={false}
            className={joinClassName(
              dialogConfiguration.className,
              'rac-calendar-dialog',
              this.isRangeEnabled ? 'rac-date-field__calendars-dialog' : 'rac-date-field__calendar-dialog'
            )}
            onDeactivate={this.onDialogDeactivate}
          >
            {this.isRangeEnabled && this.quickButtonsElement}
            <div className='rac-calendar-dialog__range-explorer'>
              <Button
                icon='back'
                mini={true}
                onClick={this.setPreviousMonth}/>
              <div className='rac-calendar-dialog__range-explorer-date'>
                {this.rangeExplorerDateElement}
              </div>
              <Button
                icon='forward'
                mini={true}
                onClick={this.setNextMonth}/>
            </div>
            {this.calendarElement}
            <div className='rac-calendar-dialog__footer'>
              {this.isRangeEnabled && this.rangeFieldsElement}
              {
                !this.isRangeEnabled && (
                  <NumberField
                    ref={this.yearRef}
                    value={year}
                    full={false}
                    autoFocus={true}
                    keepChanges={true}
                    errorMessageRendered={false}
                    pattern={this.dateTimeSettings.uiYearPattern}
                    mask={this.dateTimeSettings.uiYearMask}
                    placeholder={this.selectedYearPlaceholder}
                    onChange={this.onChangeYear}/>
                )
              }
              <Button
                text={this.settings.messages.OK}
                onClick={this.onAccept}/>
            </div>
          </Dialog>
        );
      }
    );
  }

  /**
   * @stable [20.01.2020]
   * @returns {EntityIdT[] | string}
   */
  protected get originalEmptyValue(): EntityIdT[] | string {
    return this.isRangeEnabled ? [] : FIELD_DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [09.01.2020]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);

    if (this.isFocusPrevented) {
      this.openDialog();
    }
  }

  /**
   * @stable [07.01.2019]
   * @param {AnyT} value
   * @returns {string}
   */
  protected decorateValueBeforeDisplaying(value: DateTimeLikeTypeT): string {
    return this.isRangeEnabled
      ? `${this.serializeValue(value[0])} - ${this.serializeValue(value[1])}`
      : this.serializeValue(value);
  }

  /**
   * @stable [02.05.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-date-field');
  }

  /**
   * @stable [07.01.2020]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return orNull(
      !this.isDisplayValueDefined && !this.isRangeEnabled,
      () => super.getFieldPattern() || this.dateTimeSettings.uiDatePattern
    );
  }

  /**
   * @stable [07.01.2020]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string|RegExp> {
    return orNull(
      !this.isDisplayValueDefined && !this.isRangeEnabled,
      () => super.getFieldMask() || this.dateTimeSettings.uiDateMask
    );
  }

  /**
   * @stable [07.01.2020]
   * @returns {string}
   */
  protected get fieldFormat(): string {
    return nvl(this.props.format, this.dateTimeSettings.uiDateFormat);
  }

  /**
   * @stable [20.01.2020]
   * @returns {JSX.Element}
   */
  private get calendarElement(): JSX.Element {
    const defaultCalendarProps = this.defaultCalendarProps;
    const {gridConfiguration = {}} = defaultCalendarProps;

    if (this.isRangeEnabled) {
      return (
        <div className='rac-calendar-dialog__calendars-wrapper'>
          <Calendar
            {...defaultCalendarProps}
            calendarEntity={this.currentCalendarEntity}/>
          <Calendar
            {...defaultCalendarProps}
            gridConfiguration={{
              ...gridConfiguration,
              wrapperClassName: joinClassName('rac-calendar-dialog__second-calendar', gridConfiguration.className),
            }}
            calendarEntity={this.nextCalendarEntity}/>
        </div>
      );
    }
    return (
      <Calendar
        {...defaultCalendarProps}
        calendarEntity={this.currentCalendarEntity}/>
    );
  }

  /**
   * @stable [21.01.2020]
   * @returns {ICalendarProps}
   */
  private get defaultCalendarProps(): ICalendarProps {
    return {
      gridConfiguration: {headerRendered: true},
      showOnlyCurrentDays: true,
      ...this.props.calendarConfiguration as {},
      isSelected: this.isDaySelected,
      isFirstSelected: this.isFirstSelectedDay,
      isLastSelected: this.isLastSelectedDay,
      onSelect: this.onDaySelect,
    };
  }

  /**
   * @stable [20.01.2020]
   * @returns {React.ReactNode}
   */
  private get rangeExplorerDateElement(): React.ReactNode {
    if (this.isRangeEnabled) {
      return (
        <React.Fragment>
          <div className='rac-calendar-dialog__range-explorer-date-content'>
            {this.currentDateToDisplay}
          </div>
          <div className='rac-calendar-dialog__range-explorer-date-content rac-calendar-dialog__range-explorer-date-content-next'>
            {this.nextDateToDisplay}
          </div>
        </React.Fragment>
      );
    }
    return this.currentDateToDisplay;
  }

  /**
   * @stable [20.01.2020]
   * @returns {JSX.Element}
   */
  private get rangeFieldsElement(): JSX.Element {
    return (
      <React.Fragment>
        <DateField
          {...this.defaultRangeFieldProps}
          value={this.state.from}
          onChange={this.onRangeFromChange}/>
        <span className='rac-calendar-dialog__range-input-separator'>&nbsp;&mdash;&nbsp;</span>
        <DateField
          {...this.defaultRangeFieldProps}
          value={this.state.to}
          onChange={this.onRangeToChange}/>
      </React.Fragment>
    );
  }

  /**
   * @stable [21.01.2020]
   * @returns {JSX.Element}
   */
  private get quickButtonsElement(): JSX.Element {
    return (
      <div className='rac-calendar-dialog__quick-buttons'>
        <Button
          full={true}
          text={this.settings.messages.WEEK}
          onClick={this.onSetWeek}/>
        <Button
          full={true}
          text={this.settings.messages.MONTH}
          onClick={this.onSetMonth}/>
        <Button
          full={true}
          text={this.settings.messages.QUARTER}
          onClick={this.onSetQuarter}/>
        <Button
          full={true}
          text={this.settings.messages.YEAR}
          onClick={this.onSetYear}/>
      </div>
    );
  }

  /**
   * @stable [21.01.2020]
   */
  private onSetWeek(): void {
    this.setState({current: this.dc.asFirstDayOfWeekAsDate(), next: this.dc.getStartOfCurrentDate()});
  }

  /**
   * @stable [21.01.2020]
   */
  private onSetMonth(): void {
    this.setState({current: this.dc.asFirstDayOfMonthAsDate(), next: this.dc.getStartOfCurrentDate()});
  }

  /**
   * @stable [21.01.2020]
   */
  private onSetQuarter(): void {
    this.setState({current: this.dc.asFirstDayOfQuarterAsDate(), next: this.dc.getStartOfCurrentDate()});
  }

  /**
   * @stable [21.01.2020]
   */
  private onSetYear(): void {
    this.setState({current: this.dc.asFirstDayOfYearAsDate(), next: this.dc.getStartOfCurrentDate()});
  }

  /**
   * @stable [08.01.2020]
   */
  private setPreviousMonth(): void {
    this.changeMonth(-1);
  }

  /**
   * @stable [08.01.2020]
   */
  private setNextMonth(): void {
    this.changeMonth(1);
  }

  /**
   * @stable [08.01.2020]
   * @param {number} duration
   */
  private changeMonth(duration: number): void {
    this.setState({cursor: this.dc.addMonthsAsDate({date: this.currentCalendarDate, duration})});
  }

  /**
   * @stable [20.01.2020]
   * @param {string} value
   */
  private onRangeToChange(value: string): void {
    const date = this.getValueAsDate(value);
    this.setState(R.isNil(date) ? {to: value} : {to: value, next: date});
  }

  /**
   * @stable [20.01.2020]
   * @param {string} value
   */
  private onRangeFromChange(value: string): void {
    const date = this.getValueAsDate(value);
    this.setState(R.isNil(date) ? {from: value} : {from: value, current: date});
  }

  /**
   * @stable [08.01.2020]
   * @param {number} year
   */
  private onChangeYear(year: number): void {
    const props = this.props;
    const date = this.dc.fromDayOfYearEntityAsDate({year}, {date: this.dateValueToAccept});

    if (this.dc.isDateBelongToDatesRange({date, minDate: props.minDate, maxDate: props.maxDate})) {
      this.setState({cursor: UNDEF, year, date});
    } else {
      this.setState({cursor: UNDEF, year});
    }
  }

  /**
   * @stable [17.01.2020]
   */
  private onAccept(): void {
    const valueToAccept = this.isRangeEnabled ? this.rangeValueToAccept : this.dateValueToAccept;
    this.onDialogClose(() => {
      ifNotNilThanValue(valueToAccept, () => this.onChangeManually(valueToAccept));

      if (!this.isFocusPrevented) {
        this.setFocus();
      }
    });
  }

  /**
   * @stable [17.01.2020]
   * @param {ICalendarDayEntity} calendarDayEntity
   */
  private onDaySelect(calendarDayEntity: ICalendarDayEntity): void {
    if (this.isRangeEnabled) {
      this.onRangeDaySelect(calendarDayEntity);
    } else {
      this.setState({
        cursor: UNDEF,
        year: calendarDayEntity.year,
        date: calendarDayEntity.date,
      }, () => this.yearRef.current.setFocus());
    }
  }

  /**
   * @stable [20.01.2020]
   * @param {ICalendarDayEntity} calendarDayEntity
   */
  private onRangeDaySelect(calendarDayEntity: ICalendarDayEntity): void {
    const result = this.dc.selectDaysOfYearRange(this.currentFromToDayOfYearEntity, calendarDayEntity);
    this.setState({
      current: null,
      next: null,
      ...ifNotEmptyThanValue(result.from, (from) => ({current: this.dc.fromDayOfYearEntityAsDate(from)})),
      ...ifNotEmptyThanValue(result.to, (to) => ({next: this.dc.fromDayOfYearEntityAsDate(to)})),
    });
  }

  /**
   * @stable [09.01.2020]
   */
  private onDialogDeactivate(): void {
    this.onDialogClose();
  }

  /**
   * @stable [09.01.2020]
   * @param {() => void} callback
   */
  private onDialogClose(callback?: () => void): void {
    this.setState({
      dialogOpened: false,
      current: UNDEF,
      cursor: UNDEF,
      date: UNDEF,
      next: UNDEF,
      year: UNDEF,
    }, callback);
  }

  /**
   * @stable [24.02.2019]
   */
  private openDialog(): void {
    this.setState({dialogOpened: true}, () => this.dialog.activate());
  }

  /**
   * @stable [08.01.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isDaySelected(entity: ICalendarDayEntity): boolean {
    if (this.isRangeEnabled) {
      return this.isRangeSelected(entity);
    }
    return this.dc.compare(entity.date, this.dateValueToAccept) === 0;
  }

  /**
   * @stable [21.01.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isFirstSelectedDay(entity: ICalendarDayEntity): boolean {
    return this.isRangeEnabled && this.dc.isDayOfYearBelongToDaysOfYearRange({
      ...this.currentFromToDayOfYearEntity,
      to: {},
    }, entity);
  }

  /**
   * @stable [21.01.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isLastSelectedDay(entity: ICalendarDayEntity): boolean {
    return this.isRangeEnabled && this.dc.isDayOfYearBelongToDaysOfYearRange({
      ...this.currentFromToDayOfYearEntity,
      from: {},
    }, entity);
  }

  /**
   * @stable [20.01.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isRangeSelected(entity: ICalendarDayEntity): boolean {
    return this.dc.isDayOfYearBelongToDaysOfYearRange(this.currentFromToDayOfYearEntity, entity);
  }

  /**
   * @stable [20.01.2020]
   * @returns {Date}
   */
  private get valueAsDate(): Date {
    return this.getValueAsDate(this.value);
  }

  /**
   * @stable [20.01.2020]
   * @param {DateTimeLikeTypeT} date
   * @returns {Date}
   */
  private getValueAsDate(date: DateTimeLikeTypeT): Date {
    return this.dc.asDate({date, inputFormat: this.fieldFormat});
  }

  /**
   * @stable [20.01.2020]
   * @returns {Date[]}
   */
  private get valueAsDatesArray(): Date[] {
    return ifNotEmptyThanValue(
      this.value,
      (value) => ([this.getValueAsDate(value[0]), this.getValueAsDate(value[1])]),
      []
    );
  }

  /**
   * @stable [20.01.2020]
   * @param {DateTimeLikeTypeT} value
   * @returns {string}
   */
  private serializeValue(value: DateTimeLikeTypeT): string {
    return this.dc.dateAsString({date: value, inputFormat: this.fieldFormat, outputFormat: this.fieldFormat});
  }

  /**
   * @stable [08.01.2020]
   * @returns {string}
   */
  private get currentDateToDisplay(): string {
    return this.dc.dateAsString({date: this.currentCalendarDate, outputFormat: this.props.headerFormat});
  }

  /**
   * @stable [20.01.2020]
   * @returns {string}
   */
  private get nextDateToDisplay(): string {
    return this.dc.dateAsString({date: this.nextCalendarDate, outputFormat: this.props.headerFormat});
  }

  /**
   * @stable [20.01.2020]
   * @returns {ICalendarEntity}
   */
  private get currentCalendarEntity(): ICalendarEntity {
    return this.dc.asCalendar({date: this.currentCalendarDate});
  }

  /**
   * @stable [20.01.2020]
   * @returns {ICalendarEntity}
   */
  private get nextCalendarEntity(): ICalendarEntity {
    return this.dc.asCalendar({date: this.nextCalendarDate});
  }

  /**
   * @stable [20.01.2020]
   * @returns {Date}
   */
  private get currentCalendarDate(): Date {
    return this.state.cursor || this.dateValueToAccept;
  }

  /**
   * @stable [20.01.2020]
   * @returns {Date}
   */
  private get nextCalendarDate(): Date {
    return this.dc.addMonths({date: this.currentCalendarDate, duration: 1});
  }

  /**
   * @stable [17.01.2020]
   * @returns {Date}
   */
  private get dateValueToAccept(): Date {
    return this.state.date || this.valueAsDate || this.dc.asDayOfYear();
  }

  /**
   * @stable [20.01.2020]
   * @returns {Date[]}
   */
  private get rangeValueToAccept(): Date[] {
    return [
      this.state.current || ifNotNilThanValue(this.valueAsDatesArray, (data) => data[0]),
      this.state.next || ifNotNilThanValue(this.valueAsDatesArray, (data) => data[1])
    ];
  }

  /**
   * @stable [08.01.2020]
   * @returns {string}
   */
  private get selectedYearPlaceholder(): string {
    return ifNotNilThanValue(
      this.valueAsDate,
      (selectedDate) => String(this.dc.asDayOfYearEntity({date: selectedDate}).year),
      this.settings.dateTime.uiYearFormat
    );
  }

  /**
   * stable [07.01.2020]
   * @returns {IDateTimeSettingsEntity}
   */
  private get dateTimeSettings(): IDateTimeSettingsEntity {
    return this.settings.dateTime || {};
  }

  /**
   * @stable [24.02.2019]
   * @returns {Dialog}
   */
  private get dialog(): Dialog {
    return this.dialogRef.current;
  }

  /**
   * @stable [20.01.2020]
   * @returns {boolean}
   */
  private get isRangeEnabled(): boolean {
    return isRangeEnabled(this.props);
  }

  /**
   * @stable [20.01.2020]
   * @returns {IFromToDayOfYearEntity}
   */
  private get currentFromToDayOfYearEntity(): IFromToDayOfYearEntity {
    const {current, next} = this.state;
    const valueArray = this.valueAsDatesArray;

    return notNilValuesFilter<IFromToDayOfYearEntity, IFromToDayOfYearEntity>({
      ...ifNotNilThanValue(valueArray[0], (dateFrom) => ({from: this.dc.asDayOfYearEntity({date: dateFrom})})),
      ...ifNotNilThanValue(valueArray[1], (dateTo) => ({to: this.dc.asDayOfYearEntity({date: dateTo})})),

      // "Null" as value (!)
      ...(
        isDef(current)
          ? ({from: ifNotNilThanValue(current, () => this.dc.asDayOfYearEntity({date: current}))})
          : ({})
      ),
      ...(
        isDef(next)
          ? ({to: ifNotNilThanValue(next, () => this.dc.asDayOfYearEntity({date: next}))})
          : ({})
      ),
    });
  }
}
