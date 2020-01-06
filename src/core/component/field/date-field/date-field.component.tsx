import * as React from 'react';

import { orNull, nvl, joinClassName, ifNotNilThanValue } from '../../../util';
import {
  AnyT,
  UNDEF_SYMBOL,
} from '../../../definitions.interface';
import {
  DateTimeLikeTypeT,
  FieldActionTypesEnum,
  IBaseEvent,
  ICalendarDayEntity,
} from '../../../definition';
import { IDateTimeSettings } from '../../../settings';
import {
  IDateFieldProps,
  IDateFieldState,
} from './date-field.interface';
import { BaseTextField } from '../textfield';
import { Dialog } from '../../dialog';
import { FlexLayout } from '../../layout/flex';
import { NumberField } from '../numberfield';
import { Calendar } from '../../calendar';

export class DateField<TProps extends IDateFieldProps = IDateFieldProps,
                       TState extends IDateFieldState = IDateFieldState>
  extends BaseTextField<TProps, TState> {

  public static defaultProps: IDateFieldProps = {
    preventFocus: true,
    minDate: new Date('01/01/1900'),
    maxDate: new Date('01/01/4000'),
  };

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();

  /**
   * @stable [07.01.2019]
   * @param {IDateFieldProps} props
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
   * @stable [07.01.2018]
   * @param {DateTimeLikeTypeT} currentRawValue
   */
  public onChangeManually(currentRawValue: DateTimeLikeTypeT): void {
    super.onChangeManually(this.formatDate(currentRawValue));
  }

  protected getInputAttachmentElement(): JSX.Element {
    const props = this.props;
    const state = this.state;

    return orNull(
      state.dialogOpened,
      () => {
        const dialogDate = this.dialogDate;
        return (
          <Dialog
            ref={this.dialogRef}
            acceptable={false}
            closable={false}
          >
            <FlexLayout
              full={false}>
              <NumberField
                value={this.state.year}
                autoFocus={true}
                keepChanges={true}
                pattern={'[0-9]{4}'}
                mask={[/\d/, /\d/, /\d/, /\d/]}
                placeholder={ifNotNilThanValue(dialogDate, () => String(dialogDate.getUTCFullYear()), UNDEF_SYMBOL)}
                onChange={this.onChangeYear}>
              </NumberField>
            </FlexLayout>
            <Calendar
              calendarEntity={this.dc.asCalendar({date: dialogDate})}
              selectedDays={[dialogDate.getDate()]}
              gridConfiguration={{headerRendered: true}}
              className='rac-date-field-calendar'
              onSelect={this.onAccept}/>
          </Dialog>
        );
      }
    );
  }

  /**
   * @stable [07.01.2018]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string|RegExp> {
    return orNull(
      !this.isDisplayValueDefined,
      () => super.getFieldMask() || this.dateTimeSettings.uiDateMask
    );
  }

  /**
   * @stable [07.01.2019]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return orNull<string>(
      !this.isDisplayValueDefined,
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
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
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
   * @stable [02.05.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-date-field');
  }

  /**
   * @stable [19.04.2019]
   * @param {number} value
   */
  private onChangeYear(value: number): void {
    const props = this.props;
    this.setState({year: value}, () => {
      const date = new Date(this.dialogDate.getTime());
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
    const currentTime = calendarDayEntity.date;
    this.dialog.accept();

    this.setState({dialogOpened: false}, () => this.onChangeManually(currentTime));
  }

  /**
   * @stable [07.01.2019]
   * @returns {Date}
   */
  private get dialogDate(): Date {
    if (this.isValueNotPresent) {
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
    this.setState({dialogOpened: true}, () => this.dialog.activate());
  }
}
