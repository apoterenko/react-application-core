import * as React from 'react';
import * as R from 'ramda';

import {
  calc,
  defValuesFilter,
  ifNotEmptyThanValue,
  ifNotNilThanValue,
  isCalendarActionRendered,
  isDef,
  isInline,
  isObjectNotEmpty,
  isRangeEnabled,
  isUndef,
  joinClassName,
  notNilValuesFilter,
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
  DateFieldRangeValueT,
  DatePeriodsEnum,
  DatesRangeValueT,
  DateTimeLikeTypeT,
  FIELD_DISPLAY_EMPTY_VALUE,
  FieldActionTypesEnum,
  FieldConverterTypesEnum,
  IBaseEvent,
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarProps,
  IDatesRangeEntity,
  IDateTimeSettingsEntity,
  IFromToDayOfYearEntity,
} from '../../../definition';
import {
  IDateFieldProps,
  IDateFieldState,
} from './date-field.interface';
import { BaseTextField } from '../text-field';
import { Button } from '../../button';
import { Calendar } from '../../calendar';
import { Dialog } from '../../dialog';

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

  private readonly dialogRef = React.createRef<Dialog>();
  private readonly fromDateRef = React.createRef<DateField<AnyT>>();

  /**
   * @stable [07.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.isDaySelected = this.isDaySelected.bind(this);
    this.isFirstDaySelected = this.isFirstDaySelected.bind(this);
    this.isLastDaySelected = this.isLastDaySelected.bind(this);
    this.isMiddleDaySelected = this.isMiddleDaySelected.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
    this.onFromDateFieldChange = this.onFromDateFieldChange.bind(this);
    this.onSetCustom = this.onSetCustom.bind(this);
    this.onSetDay = this.onSetDay.bind(this);
    this.onSetMonth = this.onSetMonth.bind(this);
    this.onSetQuarter = this.onSetQuarter.bind(this);
    this.onSetWeek = this.onSetWeek.bind(this);
    this.onSetYear = this.onSetYear.bind(this);
    this.onToDateFieldChange = this.onToDateFieldChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.setFromDateFocus = this.setFromDateFocus.bind(this);
    this.setNextMonth = this.setNextMonth.bind(this);
    this.setPreviousMonth = this.setPreviousMonth.bind(this);

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
      ComponentClassesEnum.CALENDAR_BASE_DIALOG,
      this.isInline
        ? ComponentClassesEnum.CALENDAR_INLINE_DIALOG
        : ComponentClassesEnum.CALENDAR_DIALOG,
      this.isRangeEnabled ? 'rac-date-field__calendars-dialog' : 'rac-date-field__calendar-dialog'
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
   * @stable [07.03.2020]
   * @param {DateFieldRangeValueT} value
   * @returns {string}
   */
  protected decorateDisplayValue(value: DateFieldRangeValueT): string {
    if (this.isRangeEnabled) {
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
    return joinClassName(super.getFieldClassName(), ComponentClassesEnum.DATE_FIELD);
  }

  /**
   * @stable [09.03.2020]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return orNull(this.isFieldMaskNeeded, () => super.getFieldPattern() || this.dateTimeSettings.uiDatePattern);
  }

  /**
   * @stable [09.03.2020]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string|RegExp> {
    return orNull(this.isFieldMaskNeeded, () => super.getFieldMask() || this.dateTimeSettings.uiDateMask);
  }

  /**
   * @stable [09.03.2020]
   * @returns {string}
   */
  protected get fieldFormat(): string {
    return nvl(this.props.format, this.dateTimeSettings.uiDateFormat);
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  private get calendarAttachmentElement(): JSX.Element {
    return (
      <React.Fragment>
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
          value={this.state.fromDate}
          onChange={this.onFromDateFieldChange}/>
        {
          this.isRangeEnabled
          && ![this.selectedPeriodMode, this.aheadEntityPeriodMode].includes(DatePeriodsEnum.DAY)
          && (
            <React.Fragment>
              <span className={ComponentClassesEnum.CALENDAR_DIALOG_RANGE_INPUT_SEPARATOR}>&mdash;</span>
              <DateField
                {...this.defaultRangeFieldProps}
                value={this.state.toDate}
                onChange={this.onToDateFieldChange}/>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [07.03.2020]
   * @returns {JSX.Element}
   */
  private get quickButtonsElement(): JSX.Element {
    const previousPeriodModeEnabled = this.isPreviousPeriodModeEnabled;
    const selectedPeriodMode = this.selectedPeriodMode;
    const aheadEntityPeriodMode = this.aheadEntityPeriodMode;

    const buttonsElement = objectValuesArrayFilter(
      (!previousPeriodModeEnabled || aheadEntityPeriodMode === DatePeriodsEnum.DAY) && (
        <Button
          key='quick-action-day'
          full={true}
          className={
            joinClassName(selectedPeriodMode === DatePeriodsEnum.DAY && CalendarDialogClassesEnum.SELECTED_QUICK_ACTION)
          }
          text={previousPeriodModeEnabled
            ? this.settings.messages.PREVIOUS_DAY
            : this.settings.messages.DAY}
          onClick={this.onSetDay}/>
      ),
      (!previousPeriodModeEnabled || aheadEntityPeriodMode === DatePeriodsEnum.WEEK) && (
        <Button
          key='quick-action-week'
          full={true}
          className={
            joinClassName(selectedPeriodMode === DatePeriodsEnum.WEEK && CalendarDialogClassesEnum.SELECTED_QUICK_ACTION)
          }
          text={previousPeriodModeEnabled
            ? this.settings.messages.PREVIOUS_WEEK
            : this.settings.messages.WEEK}
          onClick={this.onSetWeek}/>
      ),
      (!previousPeriodModeEnabled || aheadEntityPeriodMode === DatePeriodsEnum.MONTH) && (
        <Button
          key='quick-action-month'
          full={true}
          className={
            joinClassName(selectedPeriodMode === DatePeriodsEnum.MONTH && CalendarDialogClassesEnum.SELECTED_QUICK_ACTION)
          }
          text={previousPeriodModeEnabled
            ? this.settings.messages.PREVIOUS_MONTH
            : this.settings.messages.MONTH}
          onClick={this.onSetMonth}/>
      ),
      (!previousPeriodModeEnabled || aheadEntityPeriodMode === DatePeriodsEnum.QUARTER) && (
        <Button
          key='quick-action-quarter'
          full={true}
          className={
            joinClassName(selectedPeriodMode === DatePeriodsEnum.QUARTER && CalendarDialogClassesEnum.SELECTED_QUICK_ACTION)
          }
          text={previousPeriodModeEnabled
            ? this.settings.messages.PREVIOUS_QUARTER
            : this.settings.messages.QUARTER}
          onClick={this.onSetQuarter}/>
      ),
      (!previousPeriodModeEnabled || aheadEntityPeriodMode === DatePeriodsEnum.YEAR) && (
        <Button
          key='quick-action-year'
          full={true}
          className={
            joinClassName(selectedPeriodMode === DatePeriodsEnum.YEAR && CalendarDialogClassesEnum.SELECTED_QUICK_ACTION)
          }
          text={previousPeriodModeEnabled
            ? this.settings.messages.PREVIOUS_YEAR
            : this.settings.messages.YEAR}
          onClick={this.onSetYear}/>
      ),
      !previousPeriodModeEnabled && (
        <Button
          key='quick-action-custom'
          full={true}
          className={
            joinClassName(selectedPeriodMode === DatePeriodsEnum.CUSTOM && CalendarDialogClassesEnum.SELECTED_QUICK_ACTION)
          }
          text={this.settings.messages.CUSTOM}
          onClick={this.onSetCustom}/>
      )
    );
    if (R.isEmpty(buttonsElement)) {
      return null;
    }
    return (
      <div className='rac-calendar-dialog__quick-buttons'>
        {buttonsElement}
      </div>
    );
  }

  /**
   * @stable [07.03.2020]
   */
  private onSetDay(): void {
    const currentDate = this.dc.getCurrentDate();
    if (this.isPreviousPeriodModeEnabled) {
      const previousDay = this.dc.addDaysAsDate({date: this.aheadEntity.from, duration: -1});

      this.setQuickValue(previousDay, previousDay, DatePeriodsEnum.DAY);
    } else {
      this.setQuickValue(currentDate, currentDate, DatePeriodsEnum.DAY);
    }
  }

  /**
   * @stable [07.03.2020]
   */
  private onSetWeek(): void {
    if (this.isPreviousPeriodModeEnabled) {
      const aheadEntity = this.aheadEntity;
      const firstDayOfWeekAsDate = this.dc.asFirstDayOfWeekAsDate({date: aheadEntity.from, inputFormat: this.fieldFormat});
      const firstDayOfPreviousWeek = this.dc.addWeeksAsDate({date: firstDayOfWeekAsDate, duration: -1});

      this.setQuickValue(
        firstDayOfPreviousWeek,
        this.dc.asLastDayOfWeekAsDate({date: firstDayOfPreviousWeek}),
        DatePeriodsEnum.WEEK
      );
    } else {
      this.setQuickValue(this.dc.asFirstDayOfWeekAsDate(), this.dc.asLastDayOfWeekAsDate(), DatePeriodsEnum.WEEK);
    }
  }

  /**
   * @stable [07.03.2020]
   */
  private onSetMonth(): void {
    if (this.isPreviousPeriodModeEnabled) {
      const aheadEntity = this.aheadEntity;
      const firstDayOfMonthAsDate = this.dc.asFirstDayOfMonthAsDate({date: aheadEntity.from, inputFormat: this.fieldFormat});
      const firstDayOfPreviousMonth = this.dc.addMonthsAsDate({date: firstDayOfMonthAsDate, duration: -1});

      this.setQuickValue(
        firstDayOfPreviousMonth,
        this.dc.asLastDayOfMonthAsDate({date: firstDayOfPreviousMonth}),
        DatePeriodsEnum.MONTH
      );
    } else {
      this.setQuickValue(this.dc.asFirstDayOfMonthAsDate(), this.dc.asLastDayOfMonthAsDate(), DatePeriodsEnum.MONTH);
    }
  }

  /**
   * @stable [08.03.2020]
   */
  private onSetQuarter(): void {
    if (this.isPreviousPeriodModeEnabled) {
      const aheadEntity = this.aheadEntity;
      const firstDayOfQuarterAsDate = this.dc.asFirstDayOfQuarterAsDate({date: aheadEntity.from, inputFormat: this.fieldFormat});
      const firstDayOfPreviousQuarter = this.dc.addQuartersAsDate({date: firstDayOfQuarterAsDate, duration: -1});

      this.setQuickValue(
        firstDayOfPreviousQuarter,
        this.dc.asLastDayOfQuarterAsDate({date: firstDayOfPreviousQuarter}),
        DatePeriodsEnum.QUARTER
      );
    } else {
      this.setQuickValue(this.dc.asFirstDayOfQuarterAsDate(), this.dc.asLastDayOfQuarterAsDate(), DatePeriodsEnum.QUARTER);
    }
  }

  /**
   * @stable [08.03.2020]
   */
  private onSetYear(): void {
    if (this.isPreviousPeriodModeEnabled) {
      const aheadEntity = this.aheadEntity;
      const firstDayOfYearAsDate = this.dc.asFirstDayOfYearAsDate({date: aheadEntity.from, inputFormat: this.fieldFormat});
      const firstDayOfPreviousYear = this.dc.addYearsAsDate({date: firstDayOfYearAsDate, duration: -1});

      this.setQuickValue(
        firstDayOfPreviousYear,
        this.dc.asLastDayOfYearAsDate({date: firstDayOfPreviousYear}),
        DatePeriodsEnum.YEAR
      );
    } else {
      this.setQuickValue(this.dc.asFirstDayOfYearAsDate(), this.dc.asLastDayOfYearAsDate(), DatePeriodsEnum.YEAR);
    }
  }

  /**
   * @stable [08.03.2020]
   */
  private onSetCustom(): void {
    this.setState({
      cursor: UNDEF,
      from: null,
      periodMode: DatePeriodsEnum.CUSTOM,
      to: null,
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
      periodMode,
      to,
      ...(
        [DatePeriodsEnum.DAY].includes(periodMode) ? {toDate: UNDEF} : {}
      ),
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
   * @stable [09.03.2020]
   * @param {string} value
   */
  private onToDateFieldChange(value: string): void {
    const to = this.getValueAsDate(value);

    this.setState(
      R.isNil(to)
        ? {toDate: value}
        : ({periodMode: DatePeriodsEnum.CUSTOM, to, toDate: value})
    );
  }

  /**
   * @stable [11.03.2020]
   * @param {string} value
   */
  private onFromDateFieldChange(value: string): void {
    const from = this.getValueAsDate(value);

    this.setState(
      R.isNil(from)
        ? {fromDate: value}
        : ({
          cursor: from,
          from,
          fromDate: value,
          ...(
            this.selectedPeriodMode === DatePeriodsEnum.DAY
              ? {to: null, toDate: UNDEF}
              : {periodMode: DatePeriodsEnum.CUSTOM}
          ),
        })
    );
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
   * @stable [09.03.2020]
   * @param {ICalendarDayEntity} calendarDayEntity
   */
  private onDaySelect(calendarDayEntity: ICalendarDayEntity): void {
    let updatedState: IDateFieldState;

    if (this.isRangeEnabled) {
      const periodMode = this.isPreviousPeriodModeEnabled
        ? this.aheadEntityPeriodMode
        : this.selectedPeriodMode;

      let rangeValues: IDateFieldState = {};
      const result = this.dc.selectDaysOfYearRange(this.currentFromToDayOfYearEntity, calendarDayEntity);
      const rangeValuesFrom = ifNotEmptyThanValue(result.from, (from) => ({from: this.dc.fromDayOfYearEntityAsDate(from)}));

      switch (periodMode) {
        case DatePeriodsEnum.DAY:
        case DatePeriodsEnum.WEEK:
        case DatePeriodsEnum.MONTH:
        case DatePeriodsEnum.QUARTER:
        case DatePeriodsEnum.YEAR:
          ifNotEmptyThanValue(
            rangeValuesFrom.from,
            (from) => {
              switch (periodMode) {
                case DatePeriodsEnum.DAY:
                  rangeValues = {
                    from,
                    to: from,
                  };
                  break;
                case DatePeriodsEnum.WEEK:
                  rangeValues = {
                    from: this.dc.asFirstDayOfWeekAsDate({date: from}),
                    to: this.dc.asLastDayOfWeekAsDate({date: from}),
                  };
                  break;
                case DatePeriodsEnum.MONTH:
                  rangeValues = {
                    from: this.dc.asFirstDayOfMonthAsDate({date: from}),
                    to: this.dc.asLastDayOfMonthAsDate({date: from}),
                  };
                  break;
                case DatePeriodsEnum.QUARTER:
                  rangeValues = {
                    from: this.dc.asFirstDayOfQuarterAsDate({date: from}),
                    to: this.dc.asLastDayOfQuarterAsDate({date: from}),
                  };
                  break;
                case DatePeriodsEnum.YEAR:
                  rangeValues = {
                    from: this.dc.asFirstDayOfYearAsDate({date: from}),
                    to: this.dc.asLastDayOfYearAsDate({date: from}),
                  };
                  break;
              }
            }
          );
          break;
        case DatePeriodsEnum.CUSTOM:
          rangeValues = {
            ...rangeValuesFrom,
            ...ifNotEmptyThanValue(result.to, (to) => ({to: this.dc.fromDayOfYearEntityAsDate(to)})),
          };
          break;
      }

      updatedState = {
        cursor: UNDEF,
        from: null,
        fromDate: UNDEF,
        to: null,
        toDate: UNDEF,
        ...rangeValues,
        ...(
          this.isPreviousPeriodModeEnabled ? {periodMode: null} : {periodMode}
        ),
      };

      ifNotEmptyThanValue(updatedState.from, () => (updatedState.fromDate = this.serializeValue(updatedState.from)));
      ifNotEmptyThanValue(updatedState.to, () => (updatedState.toDate = this.serializeValue(updatedState.to)));
    } else {
      updatedState = {
        cursor: UNDEF,
        from: calendarDayEntity.date,
        fromDate: UNDEF,
      };
      ifNotEmptyThanValue(updatedState.from, () => (updatedState.fromDate = this.serializeValue(calendarDayEntity.date)));
    }
    this.setState(updatedState, this.setFromDateFocus);
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
      cursor: UNDEF,
      dialogOpened: UNDEF,
      from: UNDEF,
      fromDate: UNDEF,    // The manual field value
      periodMode: UNDEF,
      to: UNDEF,
      toDate: UNDEF,      // The manual field value
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
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.PREVIOUS_WEEK);

    } else if (this.checkRange(dateFromAsString, dateToAsString,
        this.dc.addMonthsAsDate({date: this.dc.asFirstDayOfMonthAsDate(), duration: -1}),
        this.dc.addMonthsAsDate({date: this.dc.asLastDayOfMonthAsDate(), duration: -1}))) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.PREVIOUS_MONTH);

    } else if (this.checkRange(dateFromAsString, dateToAsString,
        this.dc.addQuartersAsDate({date: this.dc.asFirstDayOfQuarterAsDate(), duration: -1}),
        this.dc.addQuartersAsDate({date: this.dc.asLastDayOfQuarterAsDate(), duration: -1}))) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.PREVIOUS_QUARTER);

    } else if (this.checkRange(dateFromAsString, dateToAsString,
        this.dc.addYearsAsDate({date: this.dc.asFirstDayOfYearAsDate(), duration: -1}),
        this.dc.addYearsAsDate({date: this.dc.asLastDayOfYearAsDate(), duration: -1}))) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.PREVIOUS_YEAR);

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.getCurrentDate(), this.dc.getCurrentDate())) {
      return `${messages.TODAY}: ${this.dc.dateAsPstDateString({date: dateRangeEntity.from})}`;

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.asFirstDayOfWeekAsDate(), this.dc.asLastDayOfWeekAsDate())) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.THIS_WEEK);

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.asFirstDayOfMonthAsDate(), this.dc.asLastDayOfMonthAsDate())) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.THIS_MONTH);

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.asFirstDayOfQuarterAsDate(), this.dc.asLastDayOfQuarterAsDate())) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.THIS_QUARTER);

    } else if (this.checkRange(dateFromAsString, dateToAsString, this.dc.asFirstDayOfYearAsDate(), this.dc.asLastDayOfYearAsDate())) {
      return this.getDecoratedRangeSpecificValue(dateRangeEntity.from, dateRangeEntity.to, messages.THIS_YEAR);
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
    return this.dc.dateAsString({date: this.currentCalendarDate, outputFormat: this.props.headerFormat});
  }

  /**
   * @stable [08.03.2020]
   * @returns {string}
   */
  private get nextDateAsDisplayValue(): string {
    return this.dc.dateAsString({date: this.nextCalendarDate, outputFormat: this.props.headerFormat});
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
   * @stable [07.03.2020]
   * @returns {Date}
   */
  private get currentCalendarDate(): Date {
    const {cursor, from} = this.state;
    return cursor
      || (
        this.isRangeEnabled
          ? (from || this.getValueAsDate(this.valueAsDateFrom))
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
   * @stable [07.03.2020]
   * @returns {IFromToDayOfYearEntity}
   */
  private get currentFromToDayOfYearEntity(): IFromToDayOfYearEntity {
    const {from, to} = this.state;

    const result: IFromToDayOfYearEntity = {
      // The values from state
      ...(
        isDef(from) // "Null" as value (!)
          ? ({from: ifNotNilThanValue(from, () => this.dc.asDayOfYearEntity({date: from}))})
          : ({})
      ),
      ...(
        isDef(to)
          ? ({to: ifNotNilThanValue(to, () => this.dc.asDayOfYearEntity({date: to}))})
          : ({})
      ),
    };

    if (isUndef(result.from) || isUndef(result.to)) {
      const rangeEntity = this.datesRangeEntity;
      if (!R.isNil(rangeEntity)) {
        if (isUndef(result.from) && !R.isNil(rangeEntity.from)) {
          result.from = this.dc.asDayOfYearEntity({date: rangeEntity.from, inputFormat: this.fieldFormat});
        }
        if (isUndef(result.to) && !R.isNil(rangeEntity.to)) {
          result.to = this.dc.asDayOfYearEntity({date: rangeEntity.to, inputFormat: this.fieldFormat});
        }
      }
    }
    return notNilValuesFilter(result);
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
    const selectedPeriodMode = this.selectedPeriodMode;

    if (![selectedPeriodMode].includes(DatePeriodsEnum.DAY)
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
   * @stable [09.03.2020]
   * @returns {boolean}
   */
  private get isFieldMaskNeeded(): boolean {
    return !this.isDisplayValueDefined && !this.isRangeEnabled;
  }

  /**
   * stable [06.03.2020]
   * @returns {IDateTimeSettingsEntity}
   */
  private get dateTimeSettings(): IDateTimeSettingsEntity {
    return this.settings.dateTime || {};
  }

  /**
   * @stable [06.03.2020]
   * @returns {Dialog}
   */
  private get dialog(): Dialog {
    return this.dialogRef.current;
  }
}
