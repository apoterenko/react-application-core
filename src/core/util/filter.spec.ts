import {
  defValuesFilter,
  excludeFieldsFilter,
  excludeIdFieldFilter,
  FilterUtils,
} from './filter';
import { FieldConstants } from '../definition/field-definition.interface';
import { UNDEF } from '../definitions.interface';

describe('util/filter', () => {
  describe('filterByPredicate', () => {
    it('test1', () => {
      const filteredObject = FilterUtils.filterByPredicate({
        key1: 'value1',
        key2: 'value2',
      }, (key, value) => key !== 'key1');

      expect(filteredObject).toEqual({
        key2: 'value2',
      });
    });

    it('test2', () => {
      const filteredObject = FilterUtils.filterByPredicate({
        key1: 'value1',
        key2: 'value2',
      }, (key, value) => key !== 'key3');

      expect(filteredObject).toEqual({
        key1: 'value1',
        key2: 'value2',
      });
    });

    it('test3', () => {
      const filteredObject = FilterUtils.filterByPredicate({
          key1: 'value1',
          key2: 'value2',
        }, (key, value) => key !== 'key2',
        (key, value) => key !== 'key1');

      expect(filteredObject).toEqual({});
    });

    it('test4', () => {
      const filteredObject = FilterUtils.filterByPredicate({
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
        [FieldConstants.ID_FIELD_NAME]: 100,
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
      const clonedObject = FilterUtils.cloneByFilters(o);

      expect(clonedObject).toEqual({ key1: 'value1', key2: { key3: 'value3' } });
    });

    it('test2', () => {
      const o = { key1: 'value1', key2: { key3: 'value3' } };
      const clonedObject = FilterUtils.cloneByFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test3', () => {
      const o = { key1: 'value1', key2: { key3: 'value3' } };
      const clonedObject = FilterUtils.cloneByFilters(o, (key) => key !== 'key2');

      expect(clonedObject).toEqual({ key1: 'value1' });
    });

    it('test4', () => {
      const o = { key1: 'value1', key2: [1, 2, 3] };
      const clonedObject = FilterUtils.cloneByFilters(o, (key) => key !== 'key2');

      expect(clonedObject).toEqual({ key1: 'value1' });
    });

    it('test5', () => {
      const o = { key1: 'value1', key2: { key3: null } };
      const clonedObject = FilterUtils.cloneByFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test6', () => {
      const o = { key1: 'value1', key2: { key3: UNDEF } };
      const clonedObject = FilterUtils.cloneByFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test7', () => {
      const o = { key1: 'value1', key2: { key3: 0 } };
      const clonedObject = FilterUtils.cloneByFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test8', () => {
      const o = {};
      const clonedObject = FilterUtils.cloneByFilters(o);

      expect(clonedObject).toEqual({});
    });

    it('test9', () => {
      const o = { key1: 'value1', key2: { key3: new Date() } };
      const clonedObject = FilterUtils.cloneByFilters(o, (key) => key !== 'key3');

      expect(clonedObject).toEqual({ key1: 'value1', key2: {} });
    });

    it('test10', () => {
      const o = { key1: 'value1', key2: { key3: { key4: { key3: 'value3' } }, key7: { key8: null, key9: null } } };
      const clonedObject = FilterUtils.cloneByFilters(o, (key) => key !== 'key3' && key !== 'key9');

      expect(clonedObject).toEqual(
        { key1: 'value1', key2: { key7: { key8: null } } }
      );
    });
  });
});
