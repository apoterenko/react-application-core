import { getDateConverter } from '../../di';

const dateConverter = getDateConverter();

describe('date-converter.service', () => {

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

  describe('getCurrentDate', () => {
    it('test1', () => {
      const value = dateConverter.getCurrentDate();
      expect(value).toEqual(new Date('Aug 30 2036 00:00:00 GMT-0800'));
    });
  });
});
