import * as React from 'react';

import {
  ifNotNilThanValue,
  isFocusPrevented,
  joinClassName,
  nvl,
  orNull,
} from '../../../util';
import {
  AnyT,
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
    maxDate: new Date('01/01/4000'),
    minDate: new Date('01/01/1900'),
    preventFocus: true,
  };

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();

  /**
   * @stable [07.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.isDaySelected = this.isDaySelected.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onCalendarClick = this.onCalendarClick.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.setNextMonth = this.setNextMonth.bind(this);
    this.setPreviousMonth = this.setPreviousMonth.bind(this);

    this.defaultActions = [
      {type: FieldActionTypesEnum.CALENDAR, onClick: this.onCalendarClick},
      ...this.defaultActions
    ];

    this.state = {date: null} as TState;
  }

  /**
   * @stable [07.01.2020]
   * @param {DateTimeLikeTypeT} currentRawValue
   */
  public onChangeManually(currentRawValue: DateTimeLikeTypeT): void {
    super.onChangeManually(this.serializeValue(currentRawValue));
  }

  protected getInputAttachmentElement(): JSX.Element {
    const {year, dialogOpened} = this.state;
    return orNull(
      dialogOpened,  // To improve performance
      () => {
        return (
          <Dialog
            ref={this.dialogRef}
            acceptable={false}
            closable={false}
            className={joinClassName(this.props.dialogClassName, 'rac-date-field__dialog')}
          >
            <div className='rac-date-field__dialog-range-explorer'>
              <Button
                icon='back'
                mini={true}
                onClick={this.setPreviousMonth}/>
              <span className='rac-date-field__dialog-range-explorer-date'>
                {this.dateToDisplay()}
              </span>
              <Button
                icon='forward'
                mini={true}
                onClick={this.setNextMonth}/>
            </div>
            <Calendar
              calendarEntity={this.calendarEntity}
              isSelected={this.isDaySelected}
              gridConfiguration={{headerRendered: true}}
              className='rac-date-field__calendar'
              onSelect={this.onAccept}/>
            <NumberField
              value={year}
              autoFocus={true}
              keepChanges={true}
              errorMessageRendered={false}
              pattern={'[0-9]{4}'}
              mask={[/\d/, /\d/, /\d/, /\d/]}
              placeholder={this.selectedYearPlaceholder}
              onChange={this.onChangeYear}>
            </NumberField>
          </Dialog>
        );
      }
    );
  }

  /**
   * @stable [07.01.2020]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);

    if (isFocusPrevented(this.props)) {
      this.onCalendarClick();
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
    this.setState({date: this.dc.addMonthsAsDate({date: this.calendarDate, duration})});
  }

  /**
   * @stable [19.04.2019]
   * @param {number} value
   */
  private onChangeYear(value: number): void {
    const props = this.props;
    this.setState({year: value}, () => {
      const date = new Date(this.selectedDate.getTime());
      date.setFullYear(value);

      if (this.dc.compare(date, props.minDate) >= 0
        && this.dc.compare(props.maxDate, date) >= 0) {
        this.onChangeManually(date);
      }
    });
  }

  /**
   * @stable [05.01.2020]
   * @param {ICalendarDayEntity} calendarDayEntity
   */
  private onAccept(calendarDayEntity: ICalendarDayEntity): void {
    this.setState({dialogOpened: false}, () => {
      this.onChangeManually(calendarDayEntity.date);

      if (!isFocusPrevented(this.props)) {
        this.setFocus();
      }
    });
  }

  /**
   * @stable [24.02.2019]
   */
  private onCalendarClick(): void {
    this.setState({dialogOpened: true, date: null}, () => this.dialog.activate());
  }

  /**
   * @stable [08.01.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isDaySelected(entity: ICalendarDayEntity): boolean {
    return this.dc.compare(entity.date, this.selectedDate) === 0;
  }

  /**
   * @stable [07.01.2020]
   * @returns {Date}
   */
  private get selectedDate(): Date {
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
    return this.dc.dateAsString({date: this.calendarDate, outputFormat: this.props.headerFormat});
  }

  /**
   * @stable [07.01.2020]
   * @returns {ICalendarEntity}
   */
  private get calendarEntity(): ICalendarEntity {
    return this.dc.asCalendar({date: this.calendarDate});
  }

  /**
   * @stable [08.01.2020]
   * @returns {Date}
   */
  private get calendarDate(): Date {
    return this.state.date || this.selectedDate || this.dc.asDayOfYear();
  }

  /**
   * @stable [08.01.2020]
   * @returns {string}
   */
  private get selectedYearPlaceholder(): string {
    return ifNotNilThanValue(
      this.selectedDate,
      (selectedDate) => String(this.dc.asDayOfYearEntity({date: selectedDate}).year),
      UNDEF_SYMBOL
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
