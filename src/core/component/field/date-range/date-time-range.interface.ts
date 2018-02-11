export class DateRanges {
  public static TODAY = 100;
  public static YESTERDAY = 101;
  public static LAST_7_DAYS = 102;
  public static CURRENT_WEEK = 103;
  public static LAST_WEEK = 104;
}

export const DATE_RANGE_OPTIONS = [
  { label: 'Today', value: DateRanges.TODAY },
  { label: 'Yesterday', value: DateRanges.YESTERDAY },
  { label: 'Last 7 days', value: DateRanges.LAST_7_DAYS },
  { label: 'Current week', value: DateRanges.CURRENT_WEEK },
  { label: 'Last week', value: DateRanges.LAST_WEEK }
];
