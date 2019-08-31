import { toActualChangedValue } from './field.support';
import { FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES } from '../../../definition';

describe('field.support', () => {
  describe('toActualChangedValue', () => {
    it('test1', () => {
      const actualChangedValue = toActualChangedValue({
        value: [],
        emptyValue: [],
        originalValue: FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES,
      });
      expect(actualChangedValue).toEqual(FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES);
    });

    it('test2', () => {
      const actualChangedValue = toActualChangedValue({
        value: [1, 2, 3],
        emptyValue: [],
        originalValue: [1, 2],
      });
      expect(actualChangedValue).toEqual([1, 2, 3]);
    });

    it('test3', () => {
      const actualChangedValue = toActualChangedValue({
        value: [1, 2],
        emptyValue: [],
        originalValue: [1, 2],
      });
      expect(actualChangedValue).toEqual(FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES);
    });

    it('test4', () => {
      const actualChangedValue = toActualChangedValue({
        value: 'test1',
        emptyValue: '',
        originalValue: 'test',
      });
      expect(actualChangedValue).toEqual('test1');
    });

    it('test5', () => {
      const actualChangedValue = toActualChangedValue({
        value: 'test',
        emptyValue: '',
        originalValue: 'test',
      });
      expect(actualChangedValue).toEqual(FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES);
    });
  });
});
