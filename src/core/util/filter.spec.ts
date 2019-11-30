import {
  filterByPredicate,
  excludeFieldsFilter,
  defValuesFilter,
  excludeIdFieldFilter,
  cloneUsingFilters,
  cloneUsingTimeFieldsFilters,
} from './filter';
import { ID_FIELD_NAME } from '../definition/field-definition.interface';
import {
  UNDEF,
  TIME_FIELD_NAME,
  TO_TIME_FIELD_NAME,
  FROM_TIME_FIELD_NAME,
} from '../definitions.interface';

describe('util/filter', () => {
  describe('filterByPredicate', () => {
    it('test1', () => {
      const filteredObject = filterByPredicate({
        key1: 'value1',
        key2: 'value2',
      }, (key, value) => key !== 'key1');

      expect(filteredObject).toEqual({
        key2: 'value2',
      });
    });

    it('test2', () => {
      const filteredObject = filterByPredicate({
        key1: 'value1',
        key2: 'value2',
      }, (key, value) => key !== 'key3');

      expect(filteredObject).toEqual({
        key1: 'value1',
        key2: 'value2',
      });
    });

    it('test3', () => {
      const filteredObject = filterByPredicate({
          key1: 'value1',
          key2: 'value2',
        }, (key, value) => key !== 'key2',
        (key, value) => key !== 'key1');

      expect(filteredObject).toEqual({});
    });

    it('test4', () => {
      const filteredObject = filterByPredicate({
          key1: 'value1',
          key2: 'value2',
        }, (key, value) => key !== 'key1',
        (key, value) => key !== 'key3');

      expect(filteredObject).toEqual({
        key2: 'value2',
      });
    });
  });

  describe('excludeFieldsFilter', () => {
    it('test1', () => {
      const filteredObject = excludeFieldsFilter({
        key1: 'value1',
        key2: 'value2',
      }, 'key1');

      expect(filteredObject).toEqual({
        key2: 'value2',
      });
    });

    it('test2', () => {
      const filteredObject = excludeFieldsFilter({
        key1: 'value1',
        key2: 'value2',
      }, 'key1', 'key2');

      expect(filteredObject).toEqual({});
    });

    it('test3', () => {
      const filteredObject = excludeFieldsFilter({
        key1: 'value1',
        key2: 'value2',
      }, 'key3');

      expect(filteredObject).toEqual({
        key1: 'value1',
        key2: 'value2',
      });
    });
  });

  describe('defValuesFilter', () => {
    it('test1', () => {
      const filteredObject = defValuesFilter({
        key1: 'value1',
        key2: void 0,
      });

      expect(filteredObject).toEqual({
        key1: 'value1',
      });
    });

    it('test2', () => {
      const filteredObject = defValuesFilter({
        key1: 'value1',
        key2: 100,
      });

      expect(filteredObject).toEqual({
        key1: 'value1',
        key2: 100,
      });
    });

    it('test3', () => {
      const filteredObject = defValuesFilter({
        key1: 'value1',
        key2: null,
        key3: 0,
      });

      expect(filteredObject).toEqual({
        key1: 'value1',
        key2: null,
        key3: 0,
      });
    });
  });

  describe('excludeIdFieldFilter', () => {
    it('test1', () => {
      const filteredObject = excludeIdFieldFilter({
        key1: 'value1',
        [ID_FIELD_NAME]: 100,
      });

      expect(filteredObject).toEqual({
        key1: 'value1',
      });
    });

    it('test2', () => {
      const filteredObject = excludeIdFieldFilter({ id1: 'value1' });

      expect(filteredObject).toEqual({
        id1: 'value1',
      });
    });
  });

  describe('cloneUsingFilters', () => {
    it('test1', () => {
      const o = { key1: 'value1', key2: { key3: 'value3' } };
      const clonedObject = cloneUsingFilters(o);

      expect(clonedObject).toEqual({ key1: 'value1', key2: { key3: 'value3' } });
    });

    it('test2', () => {
      const o = { key1: 'value1', key2: { key3: 'value3' } };
      const clonedObject = cloneUsingFilters(o);
      Reflect.set(clonedObject, 'key4', 'value4');

      expect(o).toEqual({ key1: 'value1', key2: { key3: 'value3' } });
    });

    it('test3', () => {
      const o = { key1: 'value1', key2: { key3: 'value3' } };
      const clonedObject = cloneUsingFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test4', () => {
      const o = { key1: 'value1', key2: { key3: 'value3' } };
      const clonedObject = cloneUsingFilters(o, (key) => key !== 'key2');

      expect(clonedObject).toEqual({ key1: 'value1' });
    });

    it('test5', () => {
      const o = { key1: 'value1', key2: [1, 2, 3] };
      const clonedObject = cloneUsingFilters(o, (key) => key !== 'key2');

      expect(clonedObject).toEqual({ key1: 'value1' });
    });

    it('test6', () => {
      const o = { key1: 'value1', key2: { key3: null } };
      const clonedObject = cloneUsingFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test7', () => {
      const o = { key1: 'value1', key2: { key3: UNDEF } };
      const clonedObject = cloneUsingFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test8', () => {
      const o = { key1: 'value1', key2: { key3: 0 } };
      const clonedObject = cloneUsingFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test9', () => {
      const o = {};
      const clonedObject = cloneUsingFilters(o);

      expect(clonedObject).toEqual({});
    });

    it('test10', () => {
      const o = { key1: 'value1', key2: { key3: new Date() } };
      const clonedObject = cloneUsingFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test11', () => {
      const o = { key1: 'value1', key2: { key3: { key4: { key3: 'value3' } }, key7: { key8: null, key9: null } } };
      const clonedObject = cloneUsingFilters(o, (key) => key !== 'key3' && key !== 'key9');

      expect(clonedObject).toEqual(
        { key1: 'value1', key2: { key7: { key8: null } } }
      );
    });
  });

  describe('cloneUsingTimeFieldsFilters', () => {
    it('test1', () => {
      const o = {
        key1: 'value1',
        [TIME_FIELD_NAME]: '10:59:59',
        [FROM_TIME_FIELD_NAME]: '10:59:59',
        [TO_TIME_FIELD_NAME]: '10:59:59',
        key2: {
          key3: 'value3',
          [TIME_FIELD_NAME]: '10:59:59',
          [FROM_TIME_FIELD_NAME]: '10:59:59',
          [TO_TIME_FIELD_NAME]: '10:59:59',
          key4: {
            key5: 'value5',
            [TIME_FIELD_NAME]: '10:59:59',
            [FROM_TIME_FIELD_NAME]: '10:59:59',
            [TO_TIME_FIELD_NAME]: '10:59:59',
          },
        },
      };
      const clonedObject = cloneUsingTimeFieldsFilters(o);

      expect(clonedObject).toEqual({
        key1: 'value1',
        key2: {
          key3: 'value3',
          key4: {
            key5: 'value5',
          },
        },
      });
    });
  });
});
