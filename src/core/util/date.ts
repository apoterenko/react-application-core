/**
 * @stable [14.01.2021]
 * index: number
 *
 * Ordinary week:
 *   0: 0 - Sunday
 *   1: 1 - Monday
 *   ...
 *   6: 6 - Saturday
 *
 * Iso week: (https://en.wikipedia.org/wiki/ISO_week_date: Weeks start with Monday)
 *   0: 1 - Monday
 *   ...
 *   5: 6 - Saturday
 *   6: 0 - Sunday
 */
const isoWeekDayAsOrdinaryDay = (index: number): number =>
  index === 6
    ? 0
    : index + 1;

/**
 * @stable [14.01.2020]
 */
export class DateUtils {
  public static readonly isoWeekDayAsOrdinaryDay = isoWeekDayAsOrdinaryDay;
}
