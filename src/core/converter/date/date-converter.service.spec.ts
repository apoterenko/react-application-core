import { getDateConverter } from '../../di';

const dateConverter = getDateConverter();

describe('date-converter.service', () => {

  describe('fromUiDateTimeToDateTime', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromUiDateTimeToDateTime({date: '2036-07-31', time: '22:56:33'});
      expect(value).toEqual('2036-07-31T22:56:33-07:00');
    });
    it('test2', () => {
      const value = dateConverter.fromUiDateTimeToDateTime({date: '2036-07-31', time: '22:56', strict: false});
      expect(value).toEqual('2036-07-31T22:56:00-07:00');
    });
    it('test3', () => {
      const value = dateConverter.fromUiDateTimeToDateTime({date: '2036-07-31', time: '22', strict: false});
      expect(value).toEqual('2036-07-31T22:00:00-07:00');
    });
    it('test4', () => {
      const value = dateConverter.fromUiDateTimeToDateTime({date: '2036-07-31'});
      expect(value).toEqual('2036-07-31T00:00:00-07:00');
    });
  });

  describe('fromDateToUiDate', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateToUiDate({date: '2036-07-31'});
      expect(value).toEqual('2036-07-31');
    });
    it('test2', () => {
      const value = dateConverter.fromDateToUiDate({date: '2036-07-31T00:00:00Z'});
      expect(value).toEqual('2036-07-31');
    });
  });

  describe('fromDateTimeToUiDate', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateTimeToUiDate({date: '2036-07-31T00:00:00+03:00'});               // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                                                 // Los Angeles, USA
    });
    it('test2', () => {
      const value = dateConverter.fromDateTimeToUiDate({date: '2036-07-31T05:00:00+03:00'});               // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                                                 // Los Angeles, USA
    });
    it('test3', () => {
      const value = dateConverter.fromDateTimeToUiDate({date: new Date('2036-07-31T05:00:00+03:00')});     // Moscow, Russia
      expect(value).toEqual('2036-07-30');                                                                 // Los Angeles, USA
    });
  });

  describe('fromDateTimeToUiDateTime', () => {
    // https://www.timeanddate.com/worldclock/converter.html
    it('test1', () => {
      const value = dateConverter.fromDateTimeToUiDateTime({date: '2036-07-31T00:00:00+03:00'});               // Moscow, Russia
      expect(value).toEqual('2036-07-30 14:00:00');                                                            // Los Angeles, USA
    });
    it('test2', () => {
      const value = dateConverter.fromDateTimeToUiDateTime({
        date: '2036-07-31T00:23:34+03:00',                                                                     // Moscow, Russia
        outputTimeFormat: 'HH:mm',
      });
      expect(value).toEqual('2036-07-30 14:23');                                                               // Los Angeles, USA
    });
  });

  describe('getCurrentDate', () => {
    it('test1', () => {
      const value = dateConverter.getCurrentDate();
      expect(value).toEqual(new Date('Aug 30 2036 00:00:00 GMT-0800'));
    });
  });

  describe('addDaysToUiDateAsDate', () => {
    it('test1', () => {
      const value = dateConverter.addDaysToUiDateAsDate({date: '2020-01-31', duration: 1});
      expect(value).toEqual(new Date('February 1 2020 00:00:00 GMT-0800'));
    });
    it('test2', () => {
      const value = dateConverter.addDaysToUiDateAsDate({date: '2020-02-29', duration: 1});
      expect(value).toEqual(new Date('March 1 2020 00:00:00 GMT-0800'));
    });
  });

  describe('asAbsoluteDayOfYear', () => {
    it('test1', () => {
      const value = dateConverter.asAbsoluteDayOfYear({date: '2020-02-29', inputFormat: 'YYYY-MM-DD'});
      expect(value).toEqual(60);
    });
    it('test2', () => {
      const value = dateConverter.asAbsoluteDayOfYear({date: new Date('February 29 2020 00:00:00 GMT-0800')});
      expect(value).toEqual(60);
    });
    it('test3', () => {
      const value = dateConverter.asAbsoluteDayOfYear();
      expect(value).toEqual(243);
    });
  });
});
