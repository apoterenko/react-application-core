import * as moment from 'moment';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { IApplicationDateTimeSettings, IApplicationSettings } from '../settings';
import { IDateConverter, DateTimeLikeTypeT } from './converter.interface';

@provideInSingleton(DateConverter)
export class DateConverter implements IDateConverter {

  @lazyInject(DI_TYPES.Settings) protected applicationSettings: IApplicationSettings;

  public join(dateAsString: string, timeAsString: string): string {
    return [dateAsString, timeAsString].join(' ');
  }

  public formatDateTime(date: DateTimeLikeTypeT,
                        outputFormat: string = this.outputFormat,
                        inputFormat: string = this.inputFormat): string {
    if (!date) {
      return '';
    } else {
      const momentDate = this.toMomentDate(date, inputFormat);
      return momentDate.isValid()
          ? momentDate.format(outputFormat)
          : String(date);
    }
  }

  public convertToDate(date: DateTimeLikeTypeT, inputFormat: string): DateTimeLikeTypeT {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() ? momentDate.toDate() : date;
  }

  public getDateRangeFromDate(date: Date): Date[] {
    const momentDate = this.getCurrentMomentDate(date);
    return [momentDate.toDate(), momentDate.clone().add(1, 'day').subtract(1, 'second').toDate()];
  }

  public isDate(date: Date|string): boolean {
    return moment.isDate(date);
  }

  public getCurrentDate(date?: Date): Date {
    return this.getCurrentMomentDate(date).toDate();
  }

  private toMomentDate(date: string | Date, inputFormat: string): moment.Moment {
    return moment.isDate(date)
        ? moment(date)
        : moment(date, inputFormat, true);
  }

  private getCurrentMomentDate(date?: Date): moment.Moment {
    return moment(date).set('h', 0).set('m', 0).set('s', 0);
  }

  private get outputFormat(): string {
    return this.dateTimeSettings.dateTimeFormat;
  }

  private get inputFormat(): string {
    return this.join(this.dateTimeSettings.uiDateFormat, this.dateTimeSettings.uiTimeFormat);
  }

  private get dateTimeSettings(): IApplicationDateTimeSettings {
    return this.applicationSettings.dateTimeSettings || {};
  }
}
