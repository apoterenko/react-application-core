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

  describe('compareDayOfYearEntity', () => {
    it('test1', () => {
      const value = dateConverter.compareDayOfYearEntity({year: 2019, month: 2, day: 23}, {year: 2019, month: 2, day: 23});
      expect(value).toEqual(0);
    });
    it('test2', () => {
      const value = dateConverter.compareDayOfYearEntity({year: 2016, month: 2, day: 29}, {year: 2016, month: 3, day: 1});
      expect(value).toEqual(-1);
    });
    it('test3', () => {
      const value = dateConverter.compareDayOfYearEntity({year: 2016, month: 3, day: 1}, {year: 2016, month: 2, day: 29});
      expect(value).toEqual(1);
    });
  });

  describe('selectDaysOfYearRange', () => {
    it('test1 [] -> [from]', () => {
      const value = dateConverter.selectDaysOfYearRange({}, {year: 2016, month: 2, day: 29});
      expect(value).toEqual({to: {}, from: {year: 2016, month: 2, day: 29}});
    });
    it('test2 [<-from]', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}},
        {year: 2016, month: 2, day: 28}
      );
      expect(value).toEqual({to: {}, from: {year: 2016, month: 2, day: 28}});
    });
    it('test3 [from] -> []', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}},
        {year: 2016, month: 2, day: 29}
      );
      expect(value).toEqual({to: {}, from: {}});
    });
    it('test4 [from] -> [from, to]', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}},
        {year: 2016, month: 3, day: 1}
      );
      expect(value).toEqual({to: {year: 2016, month: 3, day: 1}, from: {year: 2016, month: 2, day: 29}});
    });
    it('test5 [from, <-to]', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 3, day: 1}
      );
      expect(value).toEqual({from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 1}});
    });
    it('test6 [from, to->]', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 3, day: 3}
      );
      expect(value).toEqual({from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 3}});
    });
    it('test7 [from, to]', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 3, day: 2}
      );
      expect(value).toEqual({from: {year: 2016, month: 2, day: 29}, to: {}});
    });
    it('test8 [from, to]->[to]', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 2, day: 29}
      );
      expect(value).toEqual({from: {}, to: {year: 2016, month: 3, day: 2}});
    });
    it('test9 [to]->[from, to]', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 2, day: 29}
      );
      expect(value).toEqual({from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}});
    });
    it('test10 [to]->[from, to]', () => {
      const value = dateConverter.selectDaysOfYearRange(
        {from: {}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 3, day: 3}
      );
      expect(value).toEqual({from: {year: 2016, month: 3, day: 2}, to: {year: 2016, month: 3, day: 3}});
    });
  });

  describe('isDayOfYearBelongToDaysOfYearRange', () => {
    it('test1', () => {
      const value = dateConverter.isDayOfYearBelongToDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 3, day: 1}
      );
      expect(value).toEqual(true);
    });
    it('test2', () => {
      const value = dateConverter.isDayOfYearBelongToDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 2, day: 29}
      );
      expect(value).toEqual(true);
    });
    it('test3', () => {
      const value = dateConverter.isDayOfYearBelongToDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 3, day: 2}
      );
      expect(value).toEqual(true);
    });
    it('test4', () => {
      const value = dateConverter.isDayOfYearBelongToDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 2, day: 28}
      );
      expect(value).toEqual(false);
    });
    it('test5', () => {
      const value = dateConverter.isDayOfYearBelongToDaysOfYearRange(
        {from: {year: 2016, month: 2, day: 29}, to: {year: 2016, month: 3, day: 2}},
        {year: 2016, month: 3, day: 3}
      );
      expect(value).toEqual(false);
    });
  });
});
