import * as moment from 'moment';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { IApplicationDateTimeSettings, IApplicationSettings } from '../settings';
import { IDateConverter, DateTimeLikeTypeT } from './converter.interface';

@provideInSingleton(DateConverter)
export class DateConverter implements IDateConverter {

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

  public getFirstDayOfMonth(): Date {
    return moment(new Date()).startOf('month').toDate();
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
    return this.applicationSettings.dateTimeSettings || {};
  }
}
