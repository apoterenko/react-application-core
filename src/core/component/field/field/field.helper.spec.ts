import { toActualChangedValue } from './field.helper';
import { UNDEF } from '../../../definition.interface';

describe('field.helper', () => {
  describe('toActualChangedValue', () => {
    it('test1', () => {
      const actualChangedValue = toActualChangedValue({
        value: [],
        emptyValue: [],
        originalValue: UNDEF,
        error: 'error1',
      });
      expect(actualChangedValue).toEqual({
        value: UNDEF,
        error: null,
      });
    });

    it('test2', () => {
      const actualChangedValue = toActualChangedValue({
        value: [1, 2, 3],
        emptyValue: [],
        originalValue: [1, 2],
        error: 'error1',
      });
      expect(actualChangedValue).toEqual({
        value: [1, 2, 3],
        error: 'error1',
      });
    });

    it('test3', () => {
      const actualChangedValue = toActualChangedValue({
        value: [1, 2],
        emptyValue: [],
        originalValue: [1, 2],
        error: 'error1',
      });
      expect(actualChangedValue).toEqual({
        value: UNDEF,
        error: null,
      });
    });

    it('test4', () => {
      const actualChangedValue = toActualChangedValue({
        value: 'test1',
        emptyValue: '',
        originalValue: 'test',
        error: 'error1',
      });
      expect(actualChangedValue).toEqual({
        value: 'test1',
        error: 'error1',
      });
    });

    it('test5', () => {
      const actualChangedValue = toActualChangedValue({
        value: 'test',
        emptyValue: '',
        originalValue: 'test',
        error: 'error1',
      });
      expect(actualChangedValue).toEqual({
        value: UNDEF,
        error: null,
      });
    });
  });
});
