import { toActualChangedValue } from './field.support';
import { FIELD_EMPTY_ERROR_VALUE, FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE } from './field.interface';

describe('field.support', () => {
  describe('toActualChangedValue', () => {
    it('test1', () => {
      const actualChangedValue = toActualChangedValue({
        value: [],
        emptyValue: [],
        originalValue: FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
        error: 'error1',
      });
      expect(actualChangedValue).toEqual({
        value: FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
        error: FIELD_EMPTY_ERROR_VALUE,
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
        value: FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
        error: FIELD_EMPTY_ERROR_VALUE,
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
        value: FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
        error: FIELD_EMPTY_ERROR_VALUE,
      });
    });
  });
});
