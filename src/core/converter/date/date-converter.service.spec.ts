import { staticInjector } from '../../di';
import { DateConverter } from './date-converter.service';

const dateConverter = staticInjector(DateConverter);

describe('date-converter.service', () => {
  describe('tryAddXDaysAsMomentDate', () => {
    it('test1', () => {
      const value = dateConverter.tryAddXDaysAsMomentDate(30, new Date('2036-07-31')).toDate();
      expect(value).toEqual(new Date('2036-08-30'));
    });
    it('test2', () => {
      const value = dateConverter.tryAddXDaysAsMomentDate(20, '2036-07-31').format('YYYY-MM-DD');
      expect(value).toEqual('2036-08-20');
    });
    it('test3', () => {
      const value = dateConverter.tryAddXDaysAsMomentDate(20, '2036-07-31 12:00:00').format('YYYY-MM-DD HH:mm:ss');
      expect(value).toEqual('2036-08-20 12:00:00');
    });
  });

  describe('fromDateToUiDate', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateToUiDate({date: '2036-07-31'});               // Moscow, Russia
      expect(value).toEqual('2036-07-31');                                              // Los Angeles, USA
    });
    it('test2', () => {
      const value = dateConverter.fromDateToUiDate({date: new Date('2036-07-31')});     // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                              // Los Angeles, USA
    });
  });

  describe('fromDateTimeToUiDate', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateTimeToUiDate('2036-07-31T00:00:00+03:00');               // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                                         // Los Angeles, USA
    });
    it('test2', () => {
      const value = dateConverter.fromDateTimeToUiDate(new Date('2036-07-31T00:00:00+03:00'));     // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                                         // Los Angeles, USA
    });
  });

  describe('fromDateTimeToUiDateTime', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateTimeToUiDateTime('2036-07-31T00:00:00+03:00');           // Moscow, Russia
      expect(value).toEqual('2036-07-30 14:00:00');                                                // Los Angeles, USA
    });
    it('test2', () => {
      const value = dateConverter.fromDateTimeToUiDateTime(new Date('2036-07-31T00:00:00+03:00')); // Moscow, Russia
      expect(value).toEqual('2036-07-30 14:00:00');                                                // Los Angeles, USA
    });
  });

  describe('fromStartUiDateTimeToDateTime', () => {
    it('test1', () => {
      const value = dateConverter.fromStartUiDateTimeToDateTime('2018-01-31');
      expect(value).toEqual('2018-01-31T00:00:00-08:00');
    });
    it('test2', () => {
      const value = dateConverter.fromStartUiDateTimeToDateTime('2018-01-31', '21:58:59');
      expect(value).toEqual('2018-01-31T21:58:59-08:00');
    });
  });

  describe('fromEndUiDateTimeToDateTime', () => {
    it('test1', () => {
      const value = dateConverter.fromEndUiDateTimeToDateTime('2018-01-31');
      expect(value).toEqual('2018-01-31T23:59:59-08:00');
    });
    it('test2', () => {
      const value = dateConverter.fromEndUiDateTimeToDateTime('2018-01-31', '21:58:59');
      expect(value).toEqual('2018-01-31T21:58:59-08:00');
    });
  });

  describe('getCurrentDate', () => {
    it('test1', () => {
      const value = dateConverter.getCurrentDate();
      expect(value).toEqual(new Date('Aug 30 2036 00:00:00 GMT-0800'));
    });
  });
});
