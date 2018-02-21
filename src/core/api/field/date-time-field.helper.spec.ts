import '../../converter/converter.module';

import { staticInjector } from '../../di';
import { DateTimeFieldHelper } from './date-time-field.helper';
import { UNDEF } from '../../definition.interface';

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

  describe('composeDateTimeSinceField', () => {
    it('test1', () => {
      const value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
          fromDate: '2017-01-01',
          fromTime: '20:00:00',
        },
      });
      expect(value).toEqual({
        fromDate: '2017-01-01T20:00:00-08:00',
      });
    });

    it('test2', () => {
      const value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
          fromDate: '2017-01-01',
        },
      });
      expect(value).toEqual({
        fromDate: '2017-01-01T00:00:00-08:00',
      });
    });

    it('test3', () => {
      const value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
          fromDate: '2017-02-01',
        },
        entity: {
          fromDate: '2017-01-01',
        },
      });
      expect(value).toEqual({
        fromDate: '2017-02-01T00:00:00-08:00',
      });
    });

    it('test4', () => {
      const value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
          fromDate: null,
        },
        entity: {
          fromDate: '2017-01-01',
          fromTime: '10:59:59',
        },
      });
      expect(value).toEqual({ fromDate: null });
    });

    it('test5', () => {
      const value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
        },
        entity: {
          fromDate: '2017-01-01',
          fromTime: '10:59:59',
        },
      });
      expect(value).toEqual({ fromDate: UNDEF });
    });

    it('test6', () => {
      const value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
          fromTime: '09:49:49',
        },
        entity: {
          fromDate: '2017-01-01',
          fromTime: '10:59:59',
        },
      });
      expect(value).toEqual({ fromDate: '2017-01-01T09:49:49-08:00' });
    });

    it('test7', () => {
      const value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
          fromTime: null,
        },
        entity: {
          fromDate: '2017-01-01',
          fromTime: '10:59:59',
        },
      });
      expect(value).toEqual({ fromDate: '2017-01-01T00:00:00-08:00' });
    });
  });

  describe('composeDateTimeTillField', () => {
    it('test1', () => {
      const value = dateTimeFieldHelper.composeDateTimeTillField({
        changes: {
          toDate: '2017-01-01',
          toTime: '20:00:00',
        },
      });
      expect(value).toEqual({
        toDate: '2017-01-01T20:00:00-08:00',
      });
    });

    it('test2', () => {
      const value = dateTimeFieldHelper.composeDateTimeTillField({
        changes: {
          toDate: '2017-01-01',
        },
      });
      expect(value).toEqual({
        toDate: '2017-01-01T23:59:59-08:00',
      });
    });
  });
});
