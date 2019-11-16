import { fromCronExpression } from './cron';

describe('util/cron', () => {
  describe('fromCronExpression', () => {
    it('test1', () => {
      // At every minute from 5 through 8, every 6th minute from 20 through 40, and every 17th minute
      // past every hour from 9 through 17 on day-of-month 1
      const cronEntity = fromCronExpression('5-8,20-40/6,*/17 9-17 1 * *');
      expect(cronEntity).toEqual({
        daysOfMonths: [1],
        daysOfWeeks: [0, 1, 2, 3, 4, 5, 6],
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
        minutes: [0, 5, 6, 7, 8, 17, 20, 26, 32, 34, 38, 51],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [],
      });
    });

    it('test2', () => {
      // At every 10th minute past every hour from 9 through 17 on day-of-month 1
      const cronEntity = fromCronExpression('*/10 9-17 1 * *');
      expect(cronEntity).toEqual({
        daysOfMonths: [1],
        daysOfWeeks: [0, 1, 2, 3, 4, 5, 6],
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
        minutes: [0, 10, 20, 30, 40, 50],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [],
      });
    });

    it('test3', () => {
      // At 00:00 on every 8th day-of-month from 2 through 26
      const cronEntity = fromCronExpression('0 0 2-26/8 * *');
      expect(cronEntity).toEqual({
        daysOfMonths: [2, 10, 18, 26],
        daysOfWeeks: [0, 1, 2, 3, 4, 5, 6],
        hours: [0],
        minutes: [0],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [],
      });
    });

    it('test4', () => {
      // At 00:00 on every 10th day-of-month from 2 through 26 and on Wednesday
      const cronEntity = fromCronExpression('0 0 2-26/10 * 3');
      expect(cronEntity).toEqual({
        daysOfMonths: [2, 12, 22],
        daysOfWeeks: [3],
        hours: [0],
        minutes: [0],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [],
      });
    });

    it('test5', () => {
      // At 00:00 on every 2nd day-of-week from Monday through Friday
      const cronEntity = fromCronExpression('0 0 * * 1-5/2');
      expect(cronEntity).toEqual({
        daysOfMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        daysOfWeeks: [1, 3, 5],
        hours: [0],
        minutes: [0],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [],
      });
    });

    it('test6', () => {
      // At 00:00 on every day-of-week from Monday through Friday
      const cronEntity = fromCronExpression('0 0 * * 1-5/1');
      expect(cronEntity).toEqual({
        daysOfMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        daysOfWeeks: [1, 2, 3, 4, 5],
        hours: [0],
        minutes: [0],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [],
      });
    });

    it('test7', () => {
      // At 00:00 on every day-of-week from Sunday through Friday
      const cronEntity = fromCronExpression('0 0 * * 0-5');
      expect(cronEntity).toEqual({
        daysOfMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        daysOfWeeks: [0, 1, 2, 3, 4, 5],
        hours: [0],
        minutes: [0],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [],
      });
    });
  });
});
