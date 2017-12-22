import { injectable } from 'inversify';
import * as moment from 'moment';

import { lazyInject, DI_TYPES } from '../di';
import { IApplicationDateTimeSettings, IApplicationSettings } from '../settings';
import { IDateConverter, DateTimeLikeTypeT } from './converter.interface';

@injectable()
export class DateConverter implements IDateConverter {

  private static MONTHS = moment.months();
  private static MONTHS_SHORT = moment.monthsShort();
  private static WEEKDAYS_SHORT = moment.weekdaysShort()
      .slice(1, 7)
      .concat(moment.weekdaysShort()[0]);
  private static WEEKDAYS = moment.weekdays()
      .slice(1, 7)
      .concat(moment.weekdays()[0]);

  @lazyInject(DI_TYPES.Settings) private applicationSettings: IApplicationSettings;

  public format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string {
    if (!date) {
      return '';
    } else {
      const momentDate = this.toMomentDate(date, inputFormat);
      return momentDate.isValid()
          ? momentDate.format(outputFormat)
          : String(date);
    }
  }

  public formatUiDate(date: DateTimeLikeTypeT = new Date()): string {
    return this.format(date, this.dateFormat, this.uiDateFormat);
  }

  public formatUiDateTime(date: DateTimeLikeTypeT = new Date()): string {
    return this.format(date, this.dateTimeFormat, this.uiDateTimeFormat);
  }

  public formatDate(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateFormat, outputFormat);
  }

  public formatDateTime(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateTimeFormat, outputFormat);
  }

  public formatPSTDateTime(date: DateTimeLikeTypeT = new Date()): string {
    return this.formatDateTime(date,
        this.combine(this.dateTimeSettings.pstDateFormat, this.dateTimeSettings.pstTimeFormat));
  }

  public formatPSTDate(date: DateTimeLikeTypeT = new Date()): string {
    return this.formatDate(date, this.dateTimeSettings.pstDateFormat);
  }

  public toDate(date: DateTimeLikeTypeT, inputFormat: string): DateTimeLikeTypeT {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() ? momentDate.toDate() : date;
  }

  public getDateRangeFromDate(date: Date): Date[] {
    const momentDate = this.getCurrentMomentDate(date);
    return [momentDate.toDate(), momentDate.clone().add(1, 'day').subtract(1, 'second').toDate()];
  }

  public getCurrentDate(date?: Date): Date {
    return this.getCurrentMomentDate(date).toDate();
  }

  public appendToDate(date: DateTimeLikeTypeT, data: Array<Array<number|string>>, inputFormat: string = this.dateFormat): Date {
    let momentDate = this.toMomentDate(date, inputFormat);
    data.forEach((item) => {
      momentDate = momentDate.add(item[0] as moment.DurationInputArg1, item[1] as moment.DurationInputArg2);
    });
    return momentDate.toDate();
  }

  public get30DaysAgo(): Date {
    return moment().subtract(30, 'days').toDate();
  }

  public getLocalizedMonth(index: number): string {
    return DateConverter.MONTHS[index];
  }

  public getLocalizedMonthShort(index: number): string {
    return DateConverter.MONTHS_SHORT[index];
  }

  public getLocalizedWeekday(index: number): string {
    return DateConverter.WEEKDAYS[index];
  }

  public getLocalizedWeekdayShort(index: number): string {
    return DateConverter.WEEKDAYS_SHORT[index];
  }

  public getFirstDayOfMonth(): Date {
    return moment().startOf('month').toDate();
  }

  public combine(dateAsString: string, timeAsString: string): string {
    return [dateAsString, timeAsString].join(' ');
  }

  private toMomentDate(date: DateTimeLikeTypeT, inputFormat: string): moment.Moment {
    return date instanceof Date
        ? moment(date)
        : moment(date, inputFormat, true);
  }

  private getCurrentMomentDate(date?: Date): moment.Moment {
    return moment(date).set('h', 0).set('m', 0).set('s', 0);
  }

  private get dateTimeFormat(): string {
    return this.dateTimeSettings.dateTimeFormat;
  }

  private get dateFormat(): string {
    return this.dateTimeSettings.dateFormat;
  }

  private get uiDateTimeFormat(): string {
    return this.combine(this.uiDateFormat, this.dateTimeSettings.uiTimeFormat);
  }

  private get uiDateFormat(): string {
    return this.dateTimeSettings.uiDateFormat;
  }

  private get dateTimeSettings(): IApplicationDateTimeSettings {
    return this.applicationSettings.dateTime || {};
  }
}
