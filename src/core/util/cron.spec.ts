import {
  CronEntity,
  fromCronExpression,
} from './cron';
import { UNDEF } from '../definitions.interface';

describe('util/cron', () => {
  describe('fromCronExpression', () => {
    it('test0.0', () => {
      const cronEntity = fromCronExpression();

      expect(cronEntity).toEqual({
        allDaysOfMonth: false,
        allDaysOfWeek: false,
        allHours: false,
        allMinutes: false,
        allMonths: false,
        allYears: false,
        daysOfMonths: [],
        daysOfWeeks: [],
        hours: [],
        minutes: [],
        months: [],
        years: [],
      });
    });
    it('test0.1', () => {
      const cronEntity = fromCronExpression(null);

      expect(cronEntity).toEqual({
        allDaysOfMonth: false,
        allDaysOfWeek: false,
        allHours: false,
        allMinutes: false,
        allMonths: false,
        allYears: false,
        daysOfMonths: [],
        daysOfWeeks: [],
        hours: [],
        minutes: [],
        months: [],
        years: [],
      });
    });
    it('test0.2', () => {
      const cronEntity = fromCronExpression(UNDEF);

      expect(cronEntity).toEqual({
        allDaysOfMonth: false,
        allDaysOfWeek: false,
        allHours: false,
        allMinutes: false,
        allMonths: false,
        allYears: false,
        daysOfMonths: [],
        daysOfWeeks: [],
        hours: [],
        minutes: [],
        months: [],
        years: [],
      });
    });

    it('test1', () => {
      // At every minute from 5 through 8, every 6th minute from 20 through 40, and every 17th minute
      // past every hour from 9 through 17 on day-of-month 1
      const cronEntity = fromCronExpression('5-8,20-40/6,*/17 9-17 1 * * *');
      const actualEntity = CronEntity.newInstance()
        .withHours(9, 10, 11, 12, 13, 14, 15, 16, 17)
        .withMinutes(0, 5, 6, 7, 8, 17, 20, 26, 32, 34, 38, 51)
        .withDaysOfMonths(1)
        .asPlainObject();

      expect(cronEntity).toEqual(actualEntity);
      expect(cronEntity.allDaysOfMonth).toEqual(false);
      expect(cronEntity.allDaysOfWeek).toEqual(true);
      expect(cronEntity.allHours).toEqual(false);
      expect(cronEntity.allMinutes).toEqual(false);
      expect(cronEntity.allMonths).toEqual(true);
      expect(cronEntity.allYears).toEqual(true);
    });

    it('test2', () => {
      // At every 10th minute past every hour from 9 through 17 on day-of-month 1
      const cronEntity = fromCronExpression('*/10 9-17 1 * * *');
      const actualEntity = CronEntity.newInstance()
        .withHours(9, 10, 11, 12, 13, 14, 15, 16, 17)
        .withMinutes(0, 10, 20, 30, 40, 50)
        .withDaysOfMonths(1)
        .asPlainObject();
      expect(cronEntity).toEqual(actualEntity);
      expect(cronEntity.allDaysOfMonth).toEqual(false);
      expect(cronEntity.allDaysOfWeek).toEqual(true);
      expect(cronEntity.allHours).toEqual(false);
      expect(cronEntity.allMinutes).toEqual(false);
      expect(cronEntity.allMonths).toEqual(true);
      expect(cronEntity.allYears).toEqual(true);
    });

    it('test3.1', () => {
      // At 00:00 on every 8th day-of-month from 2 through 26
      const cronEntity = fromCronExpression('0 0 2-26/8 * * *');
      const actualEntity = CronEntity.newInstance()
        .withHours(0)
        .withMinutes(0)
        .withDaysOfMonths(2, 10, 18, 26)
        .asPlainObject();
      expect(cronEntity).toEqual(actualEntity);
      expect(cronEntity.allDaysOfMonth).toEqual(false);
      expect(cronEntity.allDaysOfWeek).toEqual(true);
      expect(cronEntity.allHours).toEqual(false);
      expect(cronEntity.allMinutes).toEqual(false);
      expect(cronEntity.allMonths).toEqual(true);
      expect(cronEntity.allYears).toEqual(true);
    });

    it('test3.2', () => {
      // At 00:00 on every 8th day-of-month from 2 through 26
      const cronEntity = fromCronExpression('0 0 2-26/8,* * * *');
      const actualEntity = CronEntity.newInstance()
        .withHours(0)
        .withMinutes(0)
        .asPlainObject();
      expect(cronEntity).toEqual(actualEntity);
      expect(cronEntity.allDaysOfMonth).toEqual(true);
      expect(cronEntity.allDaysOfWeek).toEqual(true);
      expect(cronEntity.allHours).toEqual(false);
      expect(cronEntity.allMinutes).toEqual(false);
      expect(cronEntity.allMonths).toEqual(true);
      expect(cronEntity.allYears).toEqual(true);
    });

    it('test4', () => {
      // At 00:00 on every 10th day-of-month from 2 through 26 and on Wednesday
      const cronEntity = fromCronExpression('0 0 2-26/10 * 3 *');
      const actualEntity = CronEntity.newInstance()
        .withHours(0)
        .withMinutes(0)
        .withDaysOfMonths(2, 12, 22)
        .withDaysOfWeeks(3)
        .asPlainObject();
      expect(cronEntity).toEqual(actualEntity);
      expect(cronEntity.allDaysOfMonth).toEqual(false);
      expect(cronEntity.allDaysOfWeek).toEqual(false);
      expect(cronEntity.allHours).toEqual(false);
      expect(cronEntity.allMinutes).toEqual(false);
      expect(cronEntity.allMonths).toEqual(true);
      expect(cronEntity.allYears).toEqual(true);
    });

    it('test5.1', () => {
      // At 00:00 on every 2nd day-of-week from Monday through Friday
      const cronEntity = fromCronExpression('0 0 * * 1-5/2 *');
      const actualEntity = CronEntity.newInstance()
        .withHours(0)
        .withMinutes(0)
        .withDaysOfWeeks(1, 3, 5)
        .asPlainObject();
      expect(cronEntity).toEqual(actualEntity);
      expect(cronEntity.allDaysOfMonth).toEqual(true);
      expect(cronEntity.allDaysOfWeek).toEqual(false);
      expect(cronEntity.allHours).toEqual(false);
      expect(cronEntity.allMinutes).toEqual(false);
      expect(cronEntity.allMonths).toEqual(true);
      expect(cronEntity.allYears).toEqual(true);
    });

    it('test5.2', () => {
      // At 00:00 on every 2nd day-of-week from Monday through Friday
      const cronEntity = fromCronExpression('0 0 * * 1,3,5 *');

      expect(cronEntity).toEqual(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withDaysOfWeeks(1, 3, 5)
          .asPlainObject()
      );
    });

    it('test6', () => {
      // At 00:00 on every day-of-week from Monday through Friday
      const cronEntity = fromCronExpression('0 0 * * 1-5/1 *');

      expect(cronEntity).toEqual(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withDaysOfWeeks(1, 2, 3, 4, 5)
          .asPlainObject()
      );
    });

    it('test7.1', () => {
      // At 00:00 on every day-of-week from Sunday through Friday
      const cronEntity = fromCronExpression('0 0 * * 0-5 *');

      expect(cronEntity).toEqual(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withDaysOfWeeks(0, 1, 2, 3, 4, 5)
          .asPlainObject()
      );
    });

    it('test7.2', () => {
      // At 00:00 on every day-of-week from Sunday through Friday and Saturday.
      const cronEntity = fromCronExpression('0 0 * * 0-5,6 *');

      expect(cronEntity).toEqual(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .asPlainObject()
      );
    });

    it('test8', () => {
      // Every minute of the last Tuesday and Thursday of the month.
      const cronEntity = fromCronExpression('* * * * 2L,4L *');

      expect(cronEntity).toEqual(
        CronEntity.newInstance()
          .withLastDaysOfWeeks(2, 4)  // Last Tuesday and Thursday of the month
          .asPlainObject()
      );
    });

    it('test9', () => {
      // At 00:00 on day-of-month 26, 27, and 31 if are the last Tuesday and Thursday of every month (intersection of dates).
      const cronEntity = fromCronExpression('0 0 26,27,31 * 2L,4L *');

      expect(cronEntity).toEqual(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withDaysOfMonths(26, 27, 31)
          .withLastDaysOfWeeks(2, 4)  // Last Tuesday and Thursday of the month
          .asPlainObject()
      );
    });

    it('test10', () => {
      // The last day of the month.
      const cronEntity = fromCronExpression('0 0 L * * *');

      expect(cronEntity).toEqual(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withLastDayOfMonth()
          .asPlainObject()
      );
    });

    it('test11', () => {
      // The 10th of the month and the last day of the month.
      const cronEntity = fromCronExpression('0 0 10,L * * *');

      expect(cronEntity).toEqual(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withLastDayOfMonth(10)
          .asPlainObject()
      );
    });
  });

  describe('toExpression', () => {
    it('test1.1', () => {
      expect(CronEntity.newInstance()
        .withHours(0)
        .withMinutes(0)
        .withLastDayOfMonth(10)
        .toExpression()).toEqual('0 0 10,L * * *');
    });
    it('test1.2', () => {
      expect(CronEntity.newInstance()
        .withHours(0)
        .withMinutes(0)
        .withLastDayOfMonth(10, 11)
        .toExpression()).toEqual('0 0 10,11,L * * *');
    });

    it('test2', () => {
      expect(CronEntity.newInstance()
        .withHours(0)
        .withMinutes(0)
        .withLastDayOfMonth()
        .toExpression()).toEqual('0 0 L * * *');
    });

    it('test3.1', () => {
      expect(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withDaysOfMonths(26, 27, 31)
          .withLastDaysOfWeeks(2, 4)    // Last Tuesday and Thursday of the month
          .toExpression()
      ).toEqual('0 0 26,27,31 * 2L,4L *');
    });
    it('test3.2', () => {
      expect(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withDaysOfMonths(31, 26, 27)
          .withLastDaysOfWeeks(2, 4) // Last Tuesday and Thursday of the month
          .toExpression()
      ).toEqual('0 0 26,27,31 * 2L,4L *');
    });
    it('test3.3', () => {
      expect(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .withDaysOfMonths(31, 26, 26, 27, 27, 26, 31, 31, 31)
          .withLastDaysOfWeeks(2, 4, 4, 2) // Last Tuesday and Thursday of the month
          .toExpression()
      ).toEqual('0 0 26,27,31 * 2L,4L *');
    });

    it('test4', () => {
      expect(
        CronEntity.newInstance()
          .withLastDaysOfWeeks(2, 4)  // Last Tuesday and Thursday of the month
          .toExpression()
      ).toEqual('* * * * 2L,4L *');
    });

    it('test5.1', () => {
      expect(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(0)
          .toExpression()
      ).toEqual('0 0 * * * *');
    });
    it('test5.2', () => {
      expect(
        CronEntity.newInstance()
          .withHours(0)
          .withMinutes(3, 4, 5, 6, 11, 12, 13, 19, 20, 21, 56, 57, 58, 59)
          .toExpression()
      ).toEqual('3-6,11-13,19-21,56-59 0 * * * *');
    });

    it('test6', () => {
      expect(
        CronEntity.newInstance()
          .withDaysOfWeeks(0, 1, 2, 3, 4, 5)
          .withHours(0)
          .withMinutes(0)
          .toExpression()
      ).toEqual('0 0 * * 0-5 *');
    });

    it('test7', () => {
      expect(CronEntity.newInstance()
        .withDaysOfWeeks(0, 1, 3, 4, 5)
        .withHours(0)
        .withMinutes(0)
        .toExpression()).toEqual('0 0 * * 0,1,3-5 *');
    });

    it('test8', () => {
      expect(CronEntity.newInstance()
        .withDaysOfWeeks(...[1, 2, 3, 4, 5])
        .withHours(0)
        .withMinutes(0)
        .toExpression()).toEqual('0 0 * * 1-5 *');
    });

    it('test9', () => {
      expect(CronEntity.newInstance()
        .withDaysOfWeeks(1, 3, 5)
        .withHours(0)
        .withMinutes(0)
        .toExpression()).toEqual('0 0 * * 1,3,5 *');
    });

    it('test10', () => {
      expect(CronEntity.newInstance()
        .withDaysOfMonths(2, 12, 22)
        .withHours(0)
        .withMinutes(0)
        .toExpression()).toEqual('0 0 2,12,22 * * *');  // <==> '0 0 2-26/10 * * *'
    });

    it('test11', () => {
      expect(CronEntity.newInstance()
        .withMinutes(0)
        .withHours(0)
        .withDaysOfMonths()
        .toExpression(true)).toEqual('0 0 N * * *');
    });

    it('test12', () => {
      expect(CronEntity.newInstance()
        .withMinutes(0)
        .withHours(0)
        .withDaysOfMonths()
        .toExpression()).toEqual('0 0 * * * *');
    });
  });
});
