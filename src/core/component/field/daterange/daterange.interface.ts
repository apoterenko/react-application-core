export class DateTimeRanges {
  public static TODAY = 100;
  public static YESTERDAY = 101;
  public static LAST_7_DAYS = 102;
  public static CURRENT_WEEK = 103;
  public static LAST_WEEK = 104;
}

export const DATE_RANGE_SELECT_OPTIONS = [
  { label: 'Today', value: DateTimeRanges.TODAY },
  { label: 'Yesterday', value: DateTimeRanges.YESTERDAY },
  { label: 'Last 7 days', value: DateTimeRanges.LAST_7_DAYS },
  { label: 'Current week', value: DateTimeRanges.CURRENT_WEEK },
  { label: 'Last week', value: DateTimeRanges.LAST_WEEK }
];
