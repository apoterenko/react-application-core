import * as React from 'react';
import * as R from 'ramda';

import {
  calc,
  coalesce,
  defValuesFilter,
  ifNotEmptyThanValue,
  ifNotNilThanValue,
  isCalendarActionRendered,
  isDef,
  isInline,
  isObjectNotEmpty,
  isPeriodNavigatorUsed,
  isRangeEnabled,
  joinClassName,
  nvl,
  objectValuesArrayFilter,
  orNull,
} from '../../../util';
import {
  AnyT,
  StringNumberT,
  UNDEF,
  UniCodesEnum,
} from '../../../definitions.interface';
import {
  CalendarDialogClassesEnum,
  ComponentClassesEnum,
  DateFieldClassesEnum,
  DateFieldRangeValueT,
  DatePeriodsEnum,
  DatesRangeValueT,
  DateTimeLikeTypeT,
  DAYS_PERIODS,
  FIELD_DISPLAY_EMPTY_VALUE,
  FieldActionTypesEnum,
  FieldConverterTypesEnum,
  IBaseEvent,
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarProps,
  IconsEnum,
  IDatesRangeEntity,
  IDateTimeSettingsEntity,
  IFromToDayOfYearEntity,
  MONTHS_PERIODS,
  QUARTERS_PERIODS,
  WEEKS_PERIODS,
} from '../../../definition';
import {
  IDateFieldProps,
  IDateFieldState,
} from './date-field.interface';
import { BaseTextField } from '../text-field';
import { Button } from '../../button';
import { Calendar } from '../../calendar';
import { Dialog } from '../../dialog';

export class DateField extends BaseTextField<IDateFieldProps, IDateFieldState> {

  public static readonly defaultProps: IDateFieldProps = {
    periodStep: 1,
    periodType: DatePeriodsEnum.MONTH,
    preventFocus: true,
  };

  private static readonly INITIAL_PERIOD_DATE_VALUE = null;

  private static readonly INITIAL_PERIOD_STATE: IDateFieldState = {
    cursor: UNDEF,
    fromDate: UNDEF,
  };

  private static readonly INITIAL_RANGE_TO_DATE_STATE: IDateFieldState = {
    to: DateField.INITIAL_PERIOD_DATE_VALUE,
    toDate: UNDEF,
  };

  private static readonly INITIAL_RANGE_PERIOD_STATE: IDateFieldState = {
    ...DateField.INITIAL_PERIOD_STATE,
    ...DateField.INITIAL_RANGE_TO_DATE_STATE,
    from: DateField.INITIAL_PERIOD_DATE_VALUE,
  };

  private static readonly DEFAULT_RANGE_PERIOD_STATE: IDateFieldState = {
    ...DateField.INITIAL_RANGE_PERIOD_STATE,
    from: UNDEF,
    to: UNDEF,
  };

  private readonly defaultRangeFieldProps: IDateFieldProps = {
    calendarActionRendered: false,
    errorMessageRendered: false,
    full: false,
    placeholder: this.fieldFormat,
    preventFocus: false,
  };

  private readonly dialogRef = React.createRef<Dialog>();
  private readonly fromDateRef = React.createRef<DateField>();

  /**
   * @stable [07.01.2020]
   * @param {IDateFieldProps} props
   */
  constructor(props: IDateFieldProps) {
    super(props);

    this.addPeriod = this.addPeriod.bind(this);
    this.isDaySelected = this.isDaySelected.bind(this);
    this.isFirstDaySelected = this.isFirstDaySelected.bind(this);
    this.isLastDaySelected = this.isLastDaySelected.bind(this);
    this.isMiddleDaySelected = this.isMiddleDaySelected.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
    this.onFromDateFieldChange = this.onFromDateFieldChange.bind(this);
    this.onSetCustom = this.onSetCustom.bind(this);
    this.onSetLastMonth = this.onSetLastMonth.bind(this);
    this.onSetLastQuarter = this.onSetLastQuarter.bind(this);
    this.onSetLastWeek = this.onSetLastWeek.bind(this);
    this.onSetYesterday = this.onSetYesterday.bind(this);
    this.onToDateFieldChange = this.onToDateFieldChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.setFromDateFocus = this.setFromDateFocus.bind(this);
    this.setNextMonth = this.setNextMonth.bind(this);
    this.setPreviousMonth = this.setPreviousMonth.bind(this);
    this.setQuickValue = this.setQuickValue.bind(this);
    this.subtractPeriod = this.subtractPeriod.bind(this);

    this.defaultActions = [
      ...(
        !this.isInline && isCalendarActionRendered(this.props)
          ? [{type: FieldActionTypesEnum.CALENDAR, onClick: this.openDialog}]
          : []
      ),
      ...this.defaultActions
    ];
  }

  /**
   * @stable [26.03.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const baseElement = super.render();

    if (!this.isPeriodNavigatorUsed) {
      return baseElement;
    }
    const {
      backActionConfiguration = {},
      forwardActionConfiguration = {},
    } = props;

    return (
      <div
        className={DateFieldClassesEnum.DATE_FIELD_NAVIGATOR}>
        <Button
          icon={IconsEnum.BACK}
          mini={true}
          {...backActionConfiguration}
          onClick={this.subtractPeriod}/>
        {baseElement}
        <Button
          icon={IconsEnum.FORWARD}
          mini={true}
          {...forwardActionConfiguration}
          onClick={this.addPeriod}/>
      </div>
    );
  }

  /**
   * @stable [07.03.2020]
   * @param {IDatesRangeEntity | DateTimeLikeTypeT | AnyT} currentRawValue
   */
  public onChangeManually(currentRawValue: IDatesRangeEntity | DateTimeLikeTypeT | AnyT): void {
    const rangeEntity: IDatesRangeEntity = currentRawValue;

    super.onChangeManually(
      this.isRangeEnabled
        ? (
          this.fromDatesRangeEntity({
            ...rangeEntity,
            from: this.serializeValue(rangeEntity.from),
            to: this.serializeValue(nvl(rangeEntity.to, rangeEntity.from)),
          })
        )
        : this.serializeValue(currentRawValue)
    );
  }

  /**
   * @stable [09.01.2020]
   * @returns {JSX.Element}
   */
  protected getAttachmentElement(): JSX.Element {
    const props = this.props;
    const {dialogOpened} = this.state;
    const {dialogConfiguration = {}} = props;

    const className = joinClassName(
      !this.isInline && calc(dialogConfiguration.className),
      CalendarDialogClassesEnum.CALENDAR_BASE_DIALOG,
      this.isInline
        ? CalendarDialogClassesEnum.CALENDAR_INLINE_DIALOG
        : CalendarDialogClassesEnum.CALENDAR_DIALOG,
      this.isRangeEnabled
        ? DateFieldClassesEnum.DATE_FIELD_CALENDARS_DIALOG
        : DateFieldClassesEnum.DATE_FIELD_CALENDAR_DIALOG
    );

    if (this.isInline) {
      return (
        <div className={className}>
          {this.calendarAttachmentElement}
        </div>
      );
    }
    return orNull(
      dialogOpened,  // To improve a performance
      () => (
        <Dialog
          checkModal={true}
          {...props.dialogConfiguration}
          ref={this.dialogRef}
          acceptable={false}
          closable={false}
          className={className}
          onDeactivate={this.onDialogDeactivate}
        >
          {this.calendarAttachmentElement}
        </Dialog>
      )
    );
  }

  /**
   * @stable [07.03.2020]
   * @returns {StringNumberT[] | string}
   */
  protected get originalEmptyValue(): StringNumberT[] | string {
    return this.isRangeEnabled ? [] : FIELD_DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [07.03.2020]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);

    if (!this.isInline && this.isFocusPrevented) {
      this.openDialog();
    }
  }

  /**
   * @stable [26.03.2020]
   * @param {DateFieldRangeValueT} value
   * @returns {string}
   */
  protected decorateDisplayValue(value: DateFieldRangeValueT): string {
    if (this.isPeriodNavigatorUsed) {
      switch (this.props.periodType) {
        case DatePeriodsEnum.MONTH:
          return this.dc.dateAsString({date: this.valueAsDate, outputFormat: this.yearMonthFormat});
      }
    } else if (this.isRangeEnabled) {
      const dateRangeEntity = this.fromDatesRangeValue(value as DatesRangeValueT);
      return R.isNil(dateRangeEntity)
        ? FIELD_DISPLAY_EMPTY_VALUE
        : this.getDecoratedRangeDisplayValue(dateRangeEntity);
    }
    return this.serializeValue(value as DateTimeLikeTypeT);
  }

  /**
   * @stable [09.03.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), DateFieldClassesEnum.DATE_FIELD);
  }

  /**
   * @stable [09.03.2020]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return orNull(this.isFieldMaskOrPatternNeeded, () => super.getFieldPattern() || this.dateTimeSettings.uiDatePattern);
  }

  /**
   * @stable [09.03.2020]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string|RegExp> {
    return orNull(this.isFieldMaskOrPatternNeeded, () => super.getFieldMask() || this.dateTimeSettings.uiDateMask);
  }

  /**
   * @stable [09.03.2020]
   * @returns {string}
   */
  protected get fieldFormat(): string {
    return nvl(this.props.format, this.dateTimeSettings.uiDateFormat);
  }

  /**
   * @stable [25.03.2020]
   * @returns {JSX.Element}
   */
  private get calendarAttachmentElement(): JSX.Element {
    return (
      <React.Fragment>
        {this.isRangeEnabled && (
          <React.Fragment>
            {this.quickButtonsElement}
            {this.previousQuickButtonsElement}
          </React.Fragment>
        )}
        <div className={CalendarDialogClassesEnum.CALENDAR_DIALOG_RANGE_EXPLORER}>
          <Button
            icon={IconsEnum.BACK}
            mini={true}
            onClick={this.setPreviousMonth}/>
          <div className={CalendarDialogClassesEnum.CALENDAR_DIALOG_RANGE_EXPLORER_DATE}>
            {this.rangeExplorerDateElement}
          </div>
          <Button
            icon={IconsEnum.FORWARD}
            mini={true}
            onClick={this.setNextMonth}/>
        </div>
        {this.calendarElement}
        <div className={CalendarDialogClassesEnum.CALENDAR_DIALOG_FOOTER}>
          {this.dateFieldsElement}
          {
            !this.isInline && (
              <Button
                text={this.settings.messages.OK}
                onClick={this.onAccept}/>
            )
          }
        </div>
      </React.Fragment>
    );
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
              wrapperClassName: joinClassName('rac-calendar-dialog__second-calendar', calc(gridConfiguration.className)),
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
      isMiddleSelected: this.isMiddleDaySelected,
      isFirstSelected: this.isFirstDaySelected,
      isLastSelected: this.isLastDaySelected,
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
            {this.currentDateAsDisplayValue}
          </div>
          <div className='rac-calendar-dialog__range-explorer-date-content rac-calendar-dialog__range-explorer-date-content-next'>
            {this.nextDateAsDisplayValue}
          </div>
        </React.Fragment>
      );
    }
    return this.currentDateAsDisplayValue;
  }

  /**
   * @stable [20.01.2020]
   * @returns {JSX.Element}
   */
  private get dateFieldsElement(): JSX.Element {
    return (
      <React.Fragment>
        <DateField
          {...this.defaultRangeFieldProps}
          autoFocus={true}
          ref={this.fromDateRef}
          value={this.fromDateFieldValue}
          onChange={this.onFromDateFieldChange}/>
        {
          this.isRangeEnabled
          && R.isEmpty(R.intersection([this.selectedPeriodMode, this.aheadEntityPeriodMode], DAYS_PERIODS))
          && (
            <React.Fragment>
              <span className={ComponentClassesEnum.CALENDAR_DIALOG_RANGE_INPUT_SEPARATOR}>&mdash;</span>
              <DateField
                {...this.defaultRangeFieldProps}
                value={this.toDateFieldValue}
                onChange={this.onToDateFieldChange}/>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [24.03.2020]
   * @returns {DateTimeLikeTypeT}
   */
  private get toDateFieldValue(): DateTimeLikeTypeT {
    const {toDate, to} = this.state;
    return to === DateField.INITIAL_PERIOD_DATE_VALUE
      ? to
      : coalesce(toDate, to, this.valueAsDateTo);
  }

  /**
   * @stable [25.03.2020]
   * @returns {DateTimeLikeTypeT}
   */
  private get fromDateFieldValue(): DateTimeLikeTypeT {
    const {fromDate, from} = this.state;
    return from === DateField.INITIAL_PERIOD_DATE_VALUE
      ? from
      : coalesce(fromDate, from, this.isRangeEnabled ? this.valueAsDateFrom : this.valueAsDate);
  }

  /**
   * @stable [25.03.2020]
   * @returns {JSX.Element}
   */
  private get previousQuickButtonsElement(): JSX.Element {
    const isPreviousPeriodModeEnabled = this.isPreviousPeriodModeEnabled;

    return (
      <div className={CalendarDialogClassesEnum.CALENDAR_DIALOG_QUICK_ACTIONS}>
        <Button
          full={true}
          className={this.getQuickActionClassName(DatePeriodsEnum.PREVIOUS_DAY)}
          disabled={isPreviousPeriodModeEnabled}
          text={this.settings.messages.YESTERDAY}
          onClick={this.onSetYesterday}/>
        <Button
          full={true}
          className={this.getQuickActionClassName(DatePeriodsEnum.PREVIOUS_WEEK)}
          disabled={isPreviousPeriodModeEnabled}
          text={this.settings.messages.LAST_WEEK}
          onClick={this.onSetLastWeek}/>
        <Button
          full={true}
          className={this.getQuickActionClassName(DatePeriodsEnum.PREVIOUS_MONTH)}
          disabled={isPreviousPeriodModeEnabled}
          text={this.settings.messages.LAST_MONTH}
          onClick={this.onSetLastMonth}/>
        <Button
          key='quick-action-previous-quarter'
          full={true}
          className={this.getQuickActionClassName(DatePeriodsEnum.PREVIOUS_QUARTER)}
          disabled={isPreviousPeriodModeEnabled}
          text={this.settings.messages.LAST_QUARTER}
          onClick={this.onSetLastQuarter}/>
      </div>
    );
  }

  /**
   * @stable [07.03.2020]
   * @returns {JSX.Element}
   */
  private get quickButtonsElement(): JSX.Element {
    const previousPeriodModeEnabled = this.isPreviousPeriodModeEnabled;
    const aheadEntityPeriodMode = this.aheadEntityPeriodMode;

    const buttonsElement = objectValuesArrayFilter(
      (!previousPeriodModeEnabled || DAYS_PERIODS.includes(aheadEntityPeriodMode)) && (
        <Button
          key='quick-action-day'
          full={true}
          className={this.getQuickActionClassName(DatePeriodsEnum.DAY, false)}
          text={previousPeriodModeEnabled
            ? this.previousPeriodQuickActionText
            : this.settings.messages.TODAY}
          onClick={() => this.onSetDay()}/>
      ),
      (!previousPeriodModeEnabled || WEEKS_PERIODS.includes(aheadEntityPeriodMode)) && (
        <Button
          key='quick-action-week'
          full={true}
          className={this.getQuickActionClassName(DatePeriodsEnum.WEEK, false)}
          text={previousPeriodModeEnabled
            ? this.previousPeriodQuickActionText
            : this.settings.messages.THIS_WEEK}
          onClick={() => this.onSetWeek()}/>
      ),
      (!previousPeriodModeEnabled || MONTHS_PERIODS.includes(aheadEntityPeriodMode)) && (
        <Button
          key='quick-action-month'
          full={true}
          className={this.getQuickActionClassName(DatePeriodsEnum.MONTH, false)}
          text={previousPeriodModeEnabled
            ? this.previousPeriodQuickActionText
            : this.settings.messages.THIS_MONTH}
          onClick={() => this.onSetMonth()}/>
      ),
      (!previousPeriodModeEnabled || QUARTERS_PERIODS.includes(aheadEntityPeriodMode)) && (
        <Button
          key='quick-action-quarter'
          full={true}
          className={this.getQuickActionClassName(DatePeriodsEnum.QUARTER, false)}
          text={previousPeriodModeEnabled
            ? this.previousPeriodQuickActionText
            : this.settings.messages.THIS_QUARTER}
          onClick={() => this.onSetQuarter()}/>
      ),
      (!previousPeriodModeEnabled || aheadEntityPeriodMode === DatePeriodsEnum.CUSTOM) && (
        <Button
          key='quick-action-custom'
          full={true}
          disabled={previousPeriodModeEnabled}
          className={this.getQuickActionClassName(DatePeriodsEnum.CUSTOM, false)}
          text={this.settings.messages.CUSTOM}
          onClick={this.onSetCustom}/>
      )
    );
    return (
      <div className={CalendarDialogClassesEnum.CALENDAR_DIALOG_QUICK_ACTIONS}>
        {buttonsElement}
      </div>
    );
  }

  /**
   * @stable [25.03.2020]
   */
  private subtractPeriod(): void {
    this.doChangePeriod(-this.props.periodStep);
  }

  /**
   * @stable [25.03.2020]
   */
  private addPeriod(): void {
    this.doChangePeriod(this.props.periodStep);
  }

  /**
   * @stable [26.03.2020]
   * @param {number} duration
   */
  private doChangePeriod(duration: number): void {
    let nextValue;
    const cfg = {date: this.valueAsDate, duration};

    switch (this.props.periodType) {
      case DatePeriodsEnum.DAY:
        nextValue = this.dc.addDaysAsDate(cfg);
        break;
      case DatePeriodsEnum.WEEK:
        nextValue = this.dc.addWeeksAsDate(cfg);
        break;
      case DatePeriodsEnum.MONTH:
        nextValue = this.dc.addMonthsAsDate(cfg);
        break;
    }
    ifNotNilThanValue(nextValue, () => this.onChangeManually(nextValue));
  }

  /**
   * @stable [25.03.2020]
   * @param {DatePeriodsEnum} period
   * @param {boolean} isPreviousPeriodModeEnabled
   * @returns {string}
   */
  private getQuickActionClassName(period: DatePeriodsEnum,
                                  isPreviousPeriodModeEnabled = this.isPreviousPeriodModeEnabled): string {
    return joinClassName(
      !isPreviousPeriodModeEnabled
      && this.selectedPeriodMode === period
      && CalendarDialogClassesEnum.CALENDAR_DIALOG_SELECTED_QUICK_ACTION
    );
  }

  /**
   * @stable [07.03.2020]
   */
  private onSetDay(setQuickValue = this.setQuickValue): void {
    const currentDate = this.dc.getCurrentDate();
    if (this.isPreviousPeriodModeEnabled) {
      const previousDay = this.dc.addDaysAsDate({date: this.aheadEntity.from, duration: -1});

      setQuickValue(previousDay, previousDay, DatePeriodsEnum.DAY);
    } else {
      setQuickValue(currentDate, currentDate, DatePeriodsEnum.DAY);
    }
  }

  /**
   * @stable [25.03.2020]
   */
  private onSetYesterday(): void {
    const date = this.dc.addDaysAsDate({date: this.dc.getCurrentDate(), duration: -1});

    this.setQuickValue(date, date, DatePeriodsEnum.PREVIOUS_DAY);
  }

  /**
   * @stable [07.03.2020]
   */
  private onSetWeek(setQuickValue = this.setQuickValue): void {
    if (this.isPreviousPeriodModeEnabled) {
      const aheadEntity = this.aheadEntity;
      const firstDayOfWeekAsDate = this.dc.asFirstDayOfWeekAsDate({date: aheadEntity.from, inputFormat: this.fieldFormat});
      const firstDayOfPreviousWeek = this.dc.addWeeksAsDate({date: firstDayOfWeekAsDate, duration: -1});

      setQuickValue(
        firstDayOfPreviousWeek,
        this.dc.asLastDayOfWeekAsDate({date: firstDayOfPreviousWeek}),
        DatePeriodsEnum.WEEK
      );
    } else {
      setQuickValue(this.dc.asFirstDayOfWeekAsDate(), this.dc.asLastDayOfWeekAsDate(), DatePeriodsEnum.WEEK);
    }
  }

  /**
   * @stable [25.03.2020]
   */
  private onSetLastWeek(): void {
    const date = this.dc.addWeeksAsDate({date: this.dc.getCurrentDate(), duration: -1});

    this.setQuickValue(
      this.dc.asFirstDayOfWeekAsDate({date}),
      this.dc.asLastDayOfWeekAsDate({date}),
      DatePeriodsEnum.PREVIOUS_WEEK
    );
  }

  /**
   * @stable [07.03.2020]
   */
  private onSetMonth(setQuickValue = this.setQuickValue): void {
    if (this.isPreviousPeriodModeEnabled) {
      const aheadEntity = this.aheadEntity;
      const firstDayOfMonthAsDate = this.dc.asFirstDayOfMonthAsDate({date: aheadEntity.from, inputFormat: this.fieldFormat});
      const firstDayOfPreviousMonth = this.dc.addMonthsAsDate({date: firstDayOfMonthAsDate, duration: -1});

      setQuickValue(
        firstDayOfPreviousMonth,
        this.dc.asLastDayOfMonthAsDate({date: firstDayOfPreviousMonth}),
        DatePeriodsEnum.MONTH
      );
    } else {
      setQuickValue(this.dc.asFirstDayOfMonthAsDate(), this.dc.asLastDayOfMonthAsDate(), DatePeriodsEnum.MONTH);
    }
  }

  /**
   * @stable [25.03.2020]
   */
  private onSetLastMonth(): void {
    const date = this.dc.addMonthsAsDate({date: this.dc.getCurrentDate(), duration: -1});

    this.setQuickValue(
      this.dc.asFirstDayOfMonthAsDate({date}),
      this.dc.asLastDayOfMonthAsDate({date}),
      DatePeriodsEnum.PREVIOUS_MONTH
    );
  }

  /**
   * @stable [08.03.2020]
   */
  private onSetQuarter(setQuickValue = this.setQuickValue): void {
    if (this.isPreviousPeriodModeEnabled) {
      const aheadEntity = this.aheadEntity;
      const firstDayOfQuarterAsDate = this.dc.asFirstDayOfQuarterAsDate({date: aheadEntity.from, inputFormat: this.fieldFormat});
      const firstDayOfPreviousQuarter = this.dc.addQuartersAsDate({date: firstDayOfQuarterAsDate, duration: -1});

      setQuickValue(
        firstDayOfPreviousQuarter,
        this.dc.asLastDayOfQuarterAsDate({date: firstDayOfPreviousQuarter}),
        DatePeriodsEnum.QUARTER
      );
    } else {
      setQuickValue(this.dc.asFirstDayOfQuarterAsDate(), this.dc.asLastDayOfQuarterAsDate(), DatePeriodsEnum.QUARTER);
    }
  }

  /**
   * @stable [25.03.2020]
   */
  private onSetLastQuarter(): void {
    const date = this.dc.addQuartersAsDate({date: this.dc.getCurrentDate(), duration: -1});

    this.setQuickValue(
      this.dc.asFirstDayOfQuarterAsDate({date}),
      this.dc.asLastDayOfQuarterAsDate({date}),
      DatePeriodsEnum.PREVIOUS_QUARTER
    );
  }

  /**
   * @stable [08.03.2020]
   */
  private onSetCustom(): void {
    this.setState({
      ...DateField.INITIAL_RANGE_PERIOD_STATE,
      periodMode: DatePeriodsEnum.CUSTOM,
    });
  }

  /**
   * @stable [06.03.2020]
   * @param {Date} from
   * @param {Date} to
   * @param {DatePeriodsEnum} periodMode
   */
  private setQuickValue(from: Date, to: Date, periodMode: DatePeriodsEnum): void {
    this.setState({
      cursor: from,
      from,
      fromDate: UNDEF,
      periodMode,
      to,
      toDate: UNDEF,
    }, this.setFromDateFocus);
  }

  /**
   * @stable [11.03.2020]
   */
  private setFromDateFocus(): void {
    ifNotNilThanValue(this.fromDateRef.current, (field) => field.setFocus());
  }

  /**
   * @stable [07.03.2020]
   */
  private setPreviousMonth(): void {
    this.doChangeMonth(-1);
  }

  /**
   * @stable [07.03.2020]
   */
  private setNextMonth(): void {
    this.doChangeMonth(1);
  }

  /**
   * @stable [07.03.2020]
   * @param {number} duration
   */
  private doChangeMonth(duration: number): void {
    this.setState({cursor: this.dc.addMonthsAsDate({date: this.currentCalendarDate, duration})});
  }

  /**
   * @stable [25.03.2020]
   * @param {string} value
   */
  private onToDateFieldChange(value: string): void {
    const to = this.getValueAsDate(value);

    this.setState({
      toDate: value,
      ...(
        R.isNil(to)
          ? {}
          : ({
            periodMode: DatePeriodsEnum.CUSTOM,
            cursor: this.dc.addMonthsAsDate({date: this.dc.asFirstDayOfMonth({date: to}), duration: -1}),
            to,
          })
      ),
    });
  }

  /**
   * @stable [25.03.2020]
   * @param {string} value
   */
  private onFromDateFieldChange(value: string): void {
    const from = this.getValueAsDate(value);

    this.setState({
      fromDate: value,
      ...(
        R.isNil(from)
          ? {}
          : ({
            periodMode: DatePeriodsEnum.CUSTOM,
            cursor: from,
            from,
            ...(
              DAYS_PERIODS.includes(this.selectedPeriodMode)
                ? DateField.INITIAL_RANGE_TO_DATE_STATE
                : {}
            ),
          })
      ),
    });
  }

  /**
   * @stable [10.03.2020]
   */
  private onAccept(): void {
    const acceptedValue = this.isRangeEnabled
      ? this.acceptedDatesRangeEntity
      : this.acceptedDateValue;

    const acceptedValueAsRangeEntity = acceptedValue as IDatesRangeEntity;

    this.onDialogClose(() => {
      ifNotEmptyThanValue(
        acceptedValue,
        () => {
          if (!this.isRangeEnabled || isObjectNotEmpty(acceptedValueAsRangeEntity.from)) {
            this.onChangeManually(acceptedValue);
          }
        });
      this.setFocus();
    });
  }

  /**
   * @stable [25.03.2020]
   * @param {ICalendarDayEntity} calendarDayEntity
   */
  private onDaySelect(calendarDayEntity: ICalendarDayEntity): void {
    let updatedState: IDateFieldState;

    if (this.isRangeEnabled) {
      const daysOfYearRange = this.dc.selectDaysOfYearRange(this.currentFromToDayOfYearEntity, calendarDayEntity);
      updatedState = {
        ...DateField.INITIAL_RANGE_PERIOD_STATE,
        ...ifNotEmptyThanValue(daysOfYearRange.from, (from) => ({from: this.dc.fromDayOfYearEntityAsDate(from)})),
        ...ifNotEmptyThanValue(daysOfYearRange.to, (to) => ({to: this.dc.fromDayOfYearEntityAsDate(to)})),
        periodMode: DatePeriodsEnum.CUSTOM,
      };
      ifNotEmptyThanValue(updatedState.from, () => (updatedState.fromDate = this.serializeValue(updatedState.from)));
      ifNotEmptyThanValue(updatedState.to, () => (updatedState.toDate = this.serializeValue(updatedState.to)));

    } else {
      updatedState = {
        ...DateField.INITIAL_PERIOD_STATE,
        from: calendarDayEntity.date,
      };
      ifNotEmptyThanValue(updatedState.from, () => (updatedState.fromDate = this.serializeValue(calendarDayEntity.date)));
    }

    this.setState((prevState) => ({...updatedState, cursor: prevState.cursor}), this.setFromDateFocus);
  }

  /**
   * @stable [08.03.2020]
   */
  private onDialogDeactivate(): void {
    this.onDialogClose();
  }

  /**
   * @stable [08.03.2020]
   * @param {() => void} callback
   */
  private onDialogClose(callback?: () => void): void {
    this.setState({
      ...DateField.DEFAULT_RANGE_PERIOD_STATE,
      dialogOpened: UNDEF,
      periodMode: UNDEF,
    }, callback);
  }

  /**
   * @stable [08.03.2020]
   */
  private openDialog(): void {
    this.setState({dialogOpened: true}, () => this.dialog.activate());
  }

  /**
   * @stable [09.03.2020]
   * @param {IDatesRangeEntity} dateRangeEntity
   * @returns {string}
   */
  private getDecoratedRangeDisplayValue(dateRangeEntity: IDatesRangeEntity): string {
    const dateFromAsString = this.serializeValue(dateRangeEntity.from);
    const dateToAsString = this.serializeValue(dateRangeEntity.to);
    const messages = this.settings.messages;

    if (this.checkRange(dateFromAsString, dateToAsString,
        this.dc.addDaysAsDate({date: this.dc.getCurrentDate(), duration: -1}),
        this.dc.addDaysAsDate({date: this.dc.getCurrentDate(), duration: -1}))) {
      return `${messages.YESTERDAY}: ${this.dc.dateAsPstDateString({date: dateRangeEntity.from})}`;

    } else if (this.checkRange(dateFromAsString, dateToAsString,
        this.dc.addWeeksAsDate({date: this.dc.asFirstDayOfWeekAsDate(), duration: -1}),
        this.dc.addWeeksAsDate({date: this.dc.asLastDayOfWeekAsDate(), duration: -1}))) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.LAST_WEEK);

    } else if (this.checkRange(dateFromAsString, dateToAsString,
        this.dc.addMonthsAsDate({date: this.dc.asFirstDayOfMonthAsDate(), duration: -1}),
        this.dc.addMonthsAsDate({date: this.dc.asLastDayOfMonthAsDate(), duration: -1}))) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.LAST_MONTH);

    } else if (this.checkRange(dateFromAsString, dateToAsString,
        this.dc.addQuartersAsDate({date: this.dc.asFirstDayOfQuarterAsDate(), duration: -1}),
        this.dc.addQuartersAsDate({date: this.dc.asLastDayOfQuarterAsDate(), duration: -1}))) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.LAST_QUARTER);

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.getCurrentDate(), this.dc.getCurrentDate())) {
      return `${messages.TODAY}: ${this.dc.dateAsPstDateString({date: dateRangeEntity.from})}`;

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.asFirstDayOfWeekAsDate(), this.dc.asLastDayOfWeekAsDate())) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.THIS_WEEK);

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.asFirstDayOfMonthAsDate(), this.dc.asLastDayOfMonthAsDate())) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.THIS_MONTH);

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.asFirstDayOfQuarterAsDate(), this.dc.asLastDayOfQuarterAsDate())) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.THIS_QUARTER);
    }

    if (R.equals(dateToAsString, dateFromAsString)) {
      return `${messages.DATE}: ${dateFromAsString}`;
    }
    return `${dateFromAsString} ${UniCodesEnum.N_DASH} ${dateToAsString}`;
  }

  /**
   * @stable [09.03.2020]
   * @param {DateTimeLikeTypeT} from
   * @param {DateTimeLikeTypeT} to
   * @param {string} label
   * @returns {string}
   */
  private getDecoratedRangeSpecificValue(from: DateTimeLikeTypeT, to: DateTimeLikeTypeT, label: string): string {
    const dateFrom = this.getValueAsDate(from);
    const dateTo = this.getValueAsDate(to);

    return `${label}: ${this.dc.dateAsPstDateString({date: dateFrom})} ${UniCodesEnum.N_DASH} ${
      this.dc.dateAsPstDateString({date: dateTo})}`;
  }

  /**
   * @stable [24.03.2020]
   * @returns {string}
   */
  private get previousPeriodQuickActionText(): string {
    let from;
    let to;

    const onSetValue = (fromDate, toDate) => {
      from = this.serializeValue(fromDate);
      to = this.serializeValue(toDate);
    };
    const messages = this.settings.messages;

    switch (this.aheadEntityPeriodMode) {
      case DatePeriodsEnum.PREVIOUS_DAY:
        this.onSetDay(onSetValue);
        break;
      case DatePeriodsEnum.DAY:
        from = to = messages.YESTERDAY;
        break;
      case DatePeriodsEnum.PREVIOUS_WEEK:
        this.onSetWeek(onSetValue);
        break;
      case DatePeriodsEnum.WEEK:
        from = to = messages.LAST_WEEK;
        break;
      case DatePeriodsEnum.PREVIOUS_MONTH:
        this.onSetMonth(onSetValue);
        break;
      case DatePeriodsEnum.MONTH:
        from = to = messages.LAST_MONTH;
        break;
      case DatePeriodsEnum.PREVIOUS_QUARTER:
        this.onSetQuarter(onSetValue);
        break;
      case DatePeriodsEnum.QUARTER:
        from = to = messages.LAST_QUARTER;
        break;
    }
    const separator = `${UniCodesEnum.NO_BREAK_SPACE}${UniCodesEnum.NO_BREAK_SPACE}`;
    if (R.equals(from, to)) {
      return `${messages.COMPARE_TO}:${separator}${from}`;
    }
    return `${messages.COMPARE_TO}:${separator}${from}${separator}${UniCodesEnum.N_DASH}${separator}${to}`;
  }

  /**
   * @stable [09.03.2020]
   * @param {string} dateFromAsString
   * @param {string} dateToAsString
   * @param {Date} dateFrom
   * @param {Date} dateTo
   * @returns {boolean}
   */
  private checkRange(dateFromAsString: string, dateToAsString: string, dateFrom: Date, dateTo: Date): boolean {
    return this.serializeValue(dateFrom) === dateFromAsString &&
      this.serializeValue(dateTo) === dateToAsString;
  }

  /**
   * @stable [08.03.2020]
   * @param {DateTimeLikeTypeT} value
   * @returns {string}
   */
  private serializeValue(value: DateTimeLikeTypeT): string {
    return this.dc.dateAsString({date: value, inputFormat: this.fieldFormat, outputFormat: this.fieldFormat});
  }

  /**
   * @stable [08.03.2020]
   * @returns {string}
   */
  private get currentDateAsDisplayValue(): string {
    return this.dc.dateAsString({date: this.currentCalendarDate, outputFormat: this.yearMonthFormat});
  }

  /**
   * @stable [08.03.2020]
   * @returns {string}
   */
  private get nextDateAsDisplayValue(): string {
    return this.dc.dateAsString({date: this.nextCalendarDate, outputFormat: this.yearMonthFormat});
  }

  /**
   * @stable [08.03.2020]
   * @returns {ICalendarEntity}
   */
  private get currentCalendarEntity(): ICalendarEntity {
    return this.getCalendarEntity(this.currentCalendarDate);
  }

  /**
   * @stable [08.03.2020]
   * @returns {ICalendarEntity}
   */
  private get nextCalendarEntity(): ICalendarEntity {
    return this.getCalendarEntity(this.nextCalendarDate);
  }

  /**
   * @stable [08.03.2020]
   * @param {Date} date
   * @returns {ICalendarEntity}
   */
  private getCalendarEntity(date: Date): ICalendarEntity {
    return this.dc.asCalendar({...this.props.calendarEntityConfiguration as {}, date});
  }

  /**
   * @stable [25.03.2020]
   * @returns {Date}
   */
  private get currentCalendarDate(): Date {
    const {cursor} = this.state;
    return cursor
      || (
        this.isRangeEnabled
          ? this.getValueAsDate(this.valueAsDateFrom)
          : this.acceptedDateValue
      )
      || this.dc.getCurrentDate();
  }

  /**
   * @stable [08.03.2020]
   * @returns {Date}
   */
  private get nextCalendarDate(): Date {
    return this.dc.addMonthsAsDate({date: this.currentCalendarDate, duration: 1});
  }

  /**
   * @stable [25.03.2020]
   * @returns {IFromToDayOfYearEntity}
   */
  private get currentFromToDayOfYearEntity(): IFromToDayOfYearEntity {
    return {
      ...ifNotEmptyThanValue(
        this.fromDateFieldValue,
        (fromValue) => ({from: this.dc.asDayOfYearEntity({date: fromValue, inputFormat: this.fieldFormat})})
      ),
      ...ifNotEmptyThanValue(
        this.toDateFieldValue,
        (toValue) => ({to: this.dc.asDayOfYearEntity({date: toValue, inputFormat: this.fieldFormat})})
      ),
    };
  }

  /**
   * @stable [07.03.2020]
   * @param {IDatesRangeEntity} entity
   * @returns {DatesRangeValueT}
   */
  private fromDatesRangeEntity(entity: IDatesRangeEntity): DatesRangeValueT {
    return this.fieldConverter.convert({
      from: FieldConverterTypesEnum.DATES_RANGE_ENTITY,
      to: FieldConverterTypesEnum.DATES_RANGE_VALUE,
      value: entity,
    });
  }

  /**
   * @stable [07.03.2020]
   * @param {DatesRangeValueT} value
   * @returns {IDatesRangeEntity}
   */
  private fromDatesRangeValue(value: DatesRangeValueT): IDatesRangeEntity {
    return this.fieldConverter.convert({
      from: FieldConverterTypesEnum.DATES_RANGE_VALUE,
      to: FieldConverterTypesEnum.DATES_RANGE_ENTITY,
      value,
    });
  }

  /**
   * @stable [07.03.2020]
   * @returns {IDatesRangeEntity}
   */
  private get datesRangeEntity(): IDatesRangeEntity {
    return this.fromDatesRangeValue(this.value);
  }

  /**
   * @stable [06.03.2020]
   * @param {DateTimeLikeTypeT} date
   * @returns {Date}
   */
  private getValueAsDate(date: DateTimeLikeTypeT): Date {
    return this.dc.asDate({date, inputFormat: this.fieldFormat});
  }

  /**
   * @stable [10.03.2020]
   * @returns {IDatesRangeEntity}
   */
  private get acceptedDatesRangeEntity(): IDatesRangeEntity {
    const {from, periodMode, to} = this.state;

    if (![...DAYS_PERIODS, DatePeriodsEnum.CUSTOM].includes(this.selectedPeriodMode)
      && (isObjectNotEmpty(from) || isObjectNotEmpty(to))) {

      return defValuesFilter<IDatesRangeEntity, IDatesRangeEntity>({
        from: from || this.valueAsDateFrom,
        periodMode,
        to: to || this.valueAsDateTo,
      });
    }
    return defValuesFilter<IDatesRangeEntity, IDatesRangeEntity>({from, periodMode, to});
  }

  /**
   * @stable [06.03.2020]
   * @returns {Date}
   */
  private get acceptedDateValue(): Date {
    return this.state.from || this.valueAsDate;
  }

  /**
   * @stable [06.03.2020]
   * @returns {Date}
   */
  private get valueAsDate(): Date {
    return this.getValueAsDate(this.value);
  }

  /**
   * @stable [06.03.2020]
   * @returns {DatePeriodsEnum}
   */
  private get valueAsPeriodMode(): DatePeriodsEnum {
    return ifNotNilThanValue(this.datesRangeEntity, (rangeEntity) => rangeEntity.periodMode);
  }

  /**
   * @stable [08.03.2020]
   * @returns {DatePeriodsEnum}
   */
  private get valueAsDateFrom(): DateTimeLikeTypeT {
    return ifNotNilThanValue(this.datesRangeEntity, (rangeEntity) => rangeEntity.from);
  }

  /**
   * @stable [09.03.2020]
   * @returns {DateTimeLikeTypeT}
   */
  private get valueAsDateTo(): DateTimeLikeTypeT {
    return ifNotNilThanValue(this.datesRangeEntity, (rangeEntity) => rangeEntity.to);
  }

  /**
   * @stable [06.03.2020]
   * @returns {DateFieldRangeValueT}
   */
  private get aheadValue(): DatesRangeValueT {
    return this.props.aheadValue;
  }

  /**
   * @stable [07.03.2020]
   * @returns {IDatesRangeEntity}
   */
  private get aheadEntity(): IDatesRangeEntity {
    return this.fromDatesRangeValue(this.aheadValue);
  }

  /**
   * @stable [07.03.2020]
   * @returns {DatePeriodsEnum}
   */
  private get aheadEntityPeriodMode(): DatePeriodsEnum {
    return ifNotNilThanValue(this.aheadEntity, (aheadEntity) => aheadEntity.periodMode);
  }

  /**
   * @stable [07.03.2020]
   * @returns {DatePeriodsEnum}
   */
  private get selectedPeriodMode(): DatePeriodsEnum {
    const {periodMode} = this.state;
    return isDef(periodMode) ? periodMode : nvl(this.valueAsPeriodMode, DatePeriodsEnum.CUSTOM);
  }

  /**
   * @stable [07.03.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isDaySelected(entity: ICalendarDayEntity): boolean {
    return this.isRangeEnabled
      ? this.isRangeSelected(entity)
      : this.dc.compare(entity.date, this.acceptedDateValue) === 0;
  }

  /**
   * @stable [08.03.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isRangeSelected(entity: ICalendarDayEntity): boolean {
    return this.dc.isDayOfYearBelongToDaysOfYearRange(this.currentFromToDayOfYearEntity, entity);
  }

  /**
   * @stable [07.03.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isFirstDaySelected(entity: ICalendarDayEntity): boolean {
    const currentFromToDayOfYearEntity = this.currentFromToDayOfYearEntity;

    return (
      this.isServiceDaySelected(currentFromToDayOfYearEntity)
      && isObjectNotEmpty(currentFromToDayOfYearEntity.to)
      && (
        this.dc.isDayOfYearBelongToDaysOfYearRange({
          ...currentFromToDayOfYearEntity,
          to: {},
        }, entity)
      )
    );
  }

  /**
   * @stable [07.03.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isLastDaySelected(entity: ICalendarDayEntity): boolean {
    const currentFromToDayOfYearEntity = this.currentFromToDayOfYearEntity;

    return (
      this.isServiceDaySelected(currentFromToDayOfYearEntity)
      && isObjectNotEmpty(currentFromToDayOfYearEntity.from)
      && (
        this.dc.isDayOfYearBelongToDaysOfYearRange({
          ...currentFromToDayOfYearEntity,
          from: {},
        }, entity)
      )
    );
  }

  /**
   * @stable [07.03.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isMiddleDaySelected(entity: ICalendarDayEntity): boolean {
    const currentFromToDayOfYearEntity = this.currentFromToDayOfYearEntity;

    return (
      this.isServiceDaySelected(currentFromToDayOfYearEntity) && (
        !this.isLastDaySelected(entity)
        && !this.isFirstDaySelected(entity)
        && isObjectNotEmpty(currentFromToDayOfYearEntity.to)
        && isObjectNotEmpty(currentFromToDayOfYearEntity.from)
      )
    );
  }

  /**
   * @stable [07.03.2020]
   * @param {IFromToDayOfYearEntity} currentFromToDayOfYearEntity
   * @returns {boolean}
   */
  private isServiceDaySelected(currentFromToDayOfYearEntity: IFromToDayOfYearEntity): boolean {
    return (
      this.isRangeEnabled
      && !this.dc.isDayOfYearEqualOtherDayOfYear(currentFromToDayOfYearEntity.from, currentFromToDayOfYearEntity.to)
    );
  }

  /**
   * @stable [06.03.2020]
   * @returns {boolean}
   */
  private get isPreviousPeriodModeEnabled(): boolean {
    return !R.isNil(this.aheadValue);
  }

  /**
   * @stable [06.03.2020]
   * @returns {boolean}
   */
  private get isRangeEnabled(): boolean {
    return isRangeEnabled(this.props);
  }

  /**
   * @stable [06.03.2020]
   * @returns {boolean}
   */
  private get isInline(): boolean {
    return isInline(this.props);
  }

  /**
   * @stable [26.03.2020]
   * @returns {boolean}
   */
  private get isFieldMaskOrPatternNeeded(): boolean {
    return !this.isDisplayValueDefined && !this.isRangeEnabled && !this.isPeriodNavigatorUsed;
  }

  /**
   * @stable [25.03.2020]
   * @returns {boolean}
   */
  private get isPeriodNavigatorUsed(): boolean {
    return isPeriodNavigatorUsed(this.props);
  }

  /**
   * stable [06.03.2020]
   * @returns {IDateTimeSettingsEntity}
   */
  private get dateTimeSettings(): IDateTimeSettingsEntity {
    return this.settings.dateTime || {};
  }

  /**
   * @stable [26.03.2020]
   * @returns {string}
   */
  private get yearMonthFormat(): string {
    return nvl(this.props.yearMonthFormat, this.settings.dateTime.uiYearMonthFormat);
  }

  /**
   * @stable [06.03.2020]
   * @returns {Dialog}
   */
  private get dialog(): Dialog {
    return this.dialogRef.current;
  }
}
