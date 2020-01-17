import * as React from 'react';

import {
  ifNotNilThanValue,
  joinClassName,
  nvl,
  orNull,
} from '../../../util';
import {
  AnyT,
  UNDEF,
  UNDEF_SYMBOL,
} from '../../../definitions.interface';
import {
  DateTimeLikeTypeT,
  FieldActionTypesEnum,
  IBaseEvent,
  ICalendarDayEntity,
  ICalendarEntity,
  IDateTimeSettingsEntity,
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

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();
  private readonly yearRef = React.createRef<NumberField>();

  /**
   * @stable [07.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.isDaySelected = this.isDaySelected.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.setNextMonth = this.setNextMonth.bind(this);
    this.setPreviousMonth = this.setPreviousMonth.bind(this);

    this.defaultActions = [
      {type: FieldActionTypesEnum.CALENDAR, onClick: this.openDialog},
      ...this.defaultActions
    ];
  }

  /**
   * @stable [07.01.2020]
   * @param {DateTimeLikeTypeT} currentRawValue
   */
  public onChangeManually(currentRawValue: DateTimeLikeTypeT | AnyT): void {
    super.onChangeManually(this.serializeValue(currentRawValue));
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
              'rac-date-field__calendar-dialog'
            )}
            onDeactivate={this.onDialogDeactivate}
          >
            <div className='rac-calendar-dialog__range-explorer'>
              <Button
                icon='back'
                mini={true}
                onClick={this.setPreviousMonth}/>
              <span className='rac-calendar-dialog__range-explorer-date'>
                {this.dateToDisplay()}
              </span>
              <Button
                icon='forward'
                mini={true}
                onClick={this.setNextMonth}/>
            </div>
            <Calendar
              showOnlyCurrentDays={true}
              gridConfiguration={{headerRendered: true}}
              {...props.calendarConfiguration}
              calendarEntity={this.currentCalendarEntity}
              isSelected={this.isDaySelected}
              onSelect={this.onDaySelect}/>
            <div className='rac-calendar-dialog__footer'>
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
                onChange={this.onChangeYear}>
              </NumberField>
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
    return this.serializeValue(value);
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
      !this.isDisplayValueDefined,
      () => super.getFieldPattern() || this.dateTimeSettings.uiDatePattern
    );
  }

  /**
   * @stable [07.01.2020]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string|RegExp> {
    return orNull(
      !this.isDisplayValueDefined,
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
    this.setState({current: this.dc.addMonthsAsDate({date: this.currentCalendarDate, duration})});
  }

  /**
   * @stable [08.01.2020]
   * @param {number} year
   */
  private onChangeYear(year: number): void {
    const props = this.props;
    const date = this.dc.fromDayOfYearEntityAsDate({year}, {date: this.valueToAccept});

    if (this.dc.isDateBelongToDatesRange({date, minDate: props.minDate, maxDate: props.maxDate})) {
      this.setState({current: UNDEF, year, date});
    } else {
      this.setState({current: UNDEF, year});
    }
  }

  /**
   * @stable [17.01.2020]
   */
  private onAccept(): void {
    const valueToAccept = this.valueToAccept;
    this.onDialogClose(() => {
      ifNotNilThanValue(
        valueToAccept,
        () => this.onChangeManually(valueToAccept)
      );

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
    this.setState({
      current: UNDEF,
      year: calendarDayEntity.year,
      date: calendarDayEntity.date,
    }, () => this.yearRef.current.setFocus());
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
      date: UNDEF,
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
    return this.dc.compare(entity.date, this.valueToAccept) === 0;
  }

  /**
   * @stable [07.01.2020]
   * @returns {Date}
   */
  private get valueAsDate(): Date {
    return this.dc.asDate({date: this.value, inputFormat: this.fieldFormat});
  }

  /**
   * @stable [07.01.2020]
   * @param {DateTimeLikeTypeT} value
   * @returns {string}
   */
  private serializeValue(value: DateTimeLikeTypeT): string {
    return this.dc.dateAsString({
      date: value,
      inputFormat: this.fieldFormat,
      outputFormat: this.fieldFormat,
    });
  }

  /**
   * @stable [08.01.2020]
   * @returns {string}
   */
  private dateToDisplay(): string {
    return this.dc.dateAsString({date: this.currentCalendarDate, outputFormat: this.props.headerFormat});
  }

  /**
   * @stable [07.01.2020]
   * @returns {ICalendarEntity}
   */
  private get currentCalendarEntity(): ICalendarEntity {
    return this.dc.asCalendar({date: this.currentCalendarDate});
  }

  /**
   * @stable [17.01.2020]
   * @returns {Date}
   */
  private get currentCalendarDate(): Date {
    return this.state.current || this.valueToAccept;
  }

  /**
   * @stable [17.01.2020]
   * @returns {Date}
   */
  private get valueToAccept(): Date {
    return this.state.date || this.valueAsDate || this.dc.asDayOfYear();
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
}
