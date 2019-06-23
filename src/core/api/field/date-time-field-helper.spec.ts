import '../../converter/converter.module';

import { staticInjector } from '../../di';
import { DateTimeFieldHelper } from './date-time-field-helper.service';
import { UNDEF } from '../../definitions.interface';

const dateTimeFieldHelper = staticInjector(DateTimeFieldHelper);

describe('DateTimeFieldHelper', () => {

  describe('composeDateTimeRangeFields', () => {
    it('test1', () => {
      const value = dateTimeFieldHelper.composeDateTimeRangeFields({
      });
      expect(value).toEqual({
        fromDate: '2036-07-31T00:00:00-07:00',
        toDate: '2036-08-30T23:59:59-07:00',
      });
    });

    it('test2', () => {
      const value = dateTimeFieldHelper.composeDateTimeRangeFields({
        fromDate: '2017-01-01',
        toDate: '2017-01-31',
      });
      expect(value).toEqual({
        fromDate: '2017-01-01T00:00:00-08:00',
        toDate: '2017-01-31T23:59:59-08:00',
      });
    });

    it('test3', () => {
      const value = dateTimeFieldHelper.composeDateTimeRangeFields({
        fromDate: '2017-01-01',
      });
      expect(value).toEqual({
        fromDate: '2017-01-01T00:00:00-08:00',
        toDate: '2036-08-30T23:59:59-07:00',
      });
    });

    it('test4', () => {
      const value = dateTimeFieldHelper.composeDateTimeRangeFields({
        toDate: '2017-01-31',
      });
      expect(value).toEqual({
        fromDate: '2036-07-31T00:00:00-07:00',
        toDate: '2017-01-31T23:59:59-08:00',
      });
    });

    it('test5', () => {
      const value = dateTimeFieldHelper.composeDateTimeRangeFields({
        fromDate: '2017-01-01',
        fromTime: '10:34:59',
        toDate: '2017-01-31',
        toTime: '22:38:57',
      });
      expect(value).toEqual({
        fromDate: '2017-01-01T10:34:59-08:00',
        toDate: '2017-01-31T22:38:57-08:00',
      });
    });

    it('test6', () => {
      const value = dateTimeFieldHelper.composeDateTimeRangeFields({
        fromTime: '13:10:00',
        toTime: '22:38:57',
      });
      expect(value).toEqual({
        fromDate: '2036-07-31T13:10:00-07:00',
        toDate: '2036-08-30T22:38:57-07:00',
      });
    });
  });
});
