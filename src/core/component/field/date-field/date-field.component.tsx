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
import { Dialog } from '../../dialog';
import { NumberField } from '../numberfield';
import { Calendar } from '../../calendar';

export class DateField<TProps extends IDateFieldProps = IDateFieldProps,
                       TState extends IDateFieldState = IDateFieldState>
  extends BaseTextField<TProps, TState> {

  public static readonly defaultProps: IDateFieldProps = {
    preventFocus: true,
    minDate: new Date('01/01/1900'),
    maxDate: new Date('01/01/4000'),
  };

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();

  /**
   * @stable [07.01.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onAccept = this.onAccept.bind(this);
    this.onCalendarClick = this.onCalendarClick.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);

    this.defaultActions = [
      {type: FieldActionTypesEnum.CALENDAR, onClick: this.onCalendarClick},
      ...this.defaultActions
    ];
  }

  /**
   * @stable [07.01.2020]
   * @param {DateTimeLikeTypeT} currentRawValue
   */
  public onChangeManually(currentRawValue: DateTimeLikeTypeT): void {
    super.onChangeManually(this.serializeValue(currentRawValue));
  }

  protected getInputAttachmentElement(): JSX.Element {
    return orNull(
      this.state.dialogOpened,  // To improve performance
      () => {
        const selectedDate = this.selectedDate;
        return (
          <Dialog
            ref={this.dialogRef}
            acceptable={false}
            closable={false}
          >
            <div>
              {this.dateToDisplay()}
            </div>
            <Calendar
              calendarEntity={this.calendarEntity}
              selectedDays={this.selectedDays}
              gridConfiguration={{headerRendered: true}}
              className='rac-date-field-calendar'
              onSelect={this.onAccept}/>
            <NumberField
              value={this.state.year}
              autoFocus={true}
              keepChanges={true}
              errorMessageRendered={false}
              pattern={'[0-9]{4}'}
              mask={[/\d/, /\d/, /\d/, /\d/]}
              placeholder={ifNotNilThanValue(selectedDate, () => String(selectedDate.getUTCFullYear()), UNDEF_SYMBOL)}
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
    this.setState({dialogOpened: true}, () => this.dialog.activate());
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
   * @returns {number}
   */
  private get selectedDays(): number[] {
    return ifNotNilThanValue(this.selectedDate, (selectedDate) => [selectedDate.getDate()], []);
  }

  /**
   * @stable [07.01.2020]
   * @returns {ICalendarEntity}
   */
  private get calendarEntity(): ICalendarEntity {
    return this.dc.asCalendar({date: this.calendarDate});
  }

  /**
   * @stable [07.01.2020]
   * @returns {Date}
   */
  private get calendarDate(): Date {
    return this.selectedDate || this.dc.getCurrentDate();
  }

  /**
   * @stable [07.01.2020]
   * @param {DateTimeLikeTypeT} value
   * @returns {string}
   */
  private serializeValue(value: DateTimeLikeTypeT): string {
    return this.dc.dateAsString({date: value, inputFormat: this.fieldFormat, outputFormat: this.fieldFormat});
  }

  private dateToDisplay(): string {
    return this.dc.dateAsString({date: this.calendarDate, outputFormat: 'MMMM YYYY'});
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
