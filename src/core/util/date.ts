export function toDate(date: string, time: string, defaultTime: string): Date {
  return new Date(date + ' ' + (time || defaultTime));
}
