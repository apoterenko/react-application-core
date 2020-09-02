import {
  asOrderedMultiFieldEntities,
  FieldUtils,
} from './field';
import {
  UNDEF,
} from '../definitions.interface';
import { FieldConstants } from '../definition';
import { MultiFieldUtils } from './multi-field';  // TODO

describe('util/field', () => {
  describe('asMultiFieldEditedEntities', () => {
    it('test1', () => {
      const editedEntities = MultiFieldUtils.multiFieldValueAsEditEntities(UNDEF);
      expect(editedEntities).toEqual(UNDEF);
    });

    it('test2', () => {
      const editedEntities = MultiFieldUtils.multiFieldValueAsEditEntities(null);
      expect(editedEntities).toEqual(UNDEF);
    });

    it('test3', () => {
      const editedEntities = MultiFieldUtils.multiFieldValueAsEditEntities([{id: 1}]);
      expect(editedEntities).toEqual([]);
    });

    it('test4', () => {
      const editedEntities = MultiFieldUtils.multiFieldValueAsEditEntities({
        add: [],
        remove: [],
        edit: [{id: 1, name: 'field1', value: 101}],
        source: [{id: 1, field1: 100}],
      });
      expect(editedEntities).toEqual([{id: 1, field1: 101}]);
    });

    it('test5', () => {
      const editedEntities = MultiFieldUtils.multiFieldValueAsEditEntities({
        add: [],
        remove: [],
        edit: [{id: 2, name: 'field1', value: 201}],
        source: [{id: 1, field1: 100}, {id: 2, field1: 200}, {id: 3, field1: 300}],
      });
      expect(editedEntities).toEqual([{id: 2, field1: 201}]);
    });

    it('test6', () => {
      const cachedMap = new Map();
      const entity1 = {id: 1, field1: 100};
      cachedMap.set(entity1.id, entity1);
      const entity2 = {id: 2, field1: 200};
      cachedMap.set(entity2.id, entity2);
      const entity3 = {id: 3, field1: 300};
      cachedMap.set(entity3.id, entity3);

      const editedEntities = MultiFieldUtils.multiFieldValueAsEditEntities({
        add: [],
        remove: [],
        edit: [{id: 2, name: 'field1', value: 201}],
        source: [entity1, entity2, entity3],
      }, cachedMap);
      expect(editedEntities).toEqual([{id: 2, field1: 201}]);
    });
  });

  describe('FieldUtils.fromMultiFieldValueToEntities', () => {
    it('test1', () => {
      const editedEntities = MultiFieldUtils.multiFieldValueAsEntities({
        add: [{id: 2, field1: 200}],
        remove: [],
        edit: [{id: 1, name: 'field1', value: 101}],
        source: [{id: 1, field1: 100}],
      });
      expect(editedEntities).toEqual([{id: 2, field1: 200}, {id: 1, field1: 101}]);
    });

    it('test2', () => {
      const entity = {id: 1, field1: 100};
      const editedEntities = MultiFieldUtils.multiFieldValueAsEntities({
        add: [],
        remove: [entity],
        edit: [],
        source: [entity],
      });
      expect(editedEntities).toEqual([]);
    });

    it('test3', () => {
      const editedEntities = MultiFieldUtils.multiFieldValueAsEntities({
        add: [],
        remove: [],
        edit: [
          {id: 1, name: 'field1', value: 101},
          {id: 2, name: 'field1', value: 201},
          {id: 3, name: 'field1', value: 301}
        ],
        source: [{id: 1, field1: 100}, {id: 3, field1: 300}, {id: 2, field1: 200}],
      });
      expect(editedEntities).toEqual([{id: 1, field1: 101}, {id: 3, field1: 301}, {id: 2, field1: 201}]);
    });
  });

  describe('asOrderedMultiFieldEntities', () => {
    const itemsCount = 6;
    it('test1', () => {
      const item1 = {id: 100, name: 'name1'};
      const item2 = {id: 101, name: 'name2'};
      const item3 = {id: 102, name: 'name3', newEntity: true, index: 4};
      const result = asOrderedMultiFieldEntities({
        add: [item3],
        remove: [],
        edit: [],
        source: [item1, item2],
      }, itemsCount);
      expect(result).toEqual([item1, item2, UNDEF, UNDEF, item3, UNDEF]);
    });
  });

  describe('FieldUtils.asActualFieldValue', () => {
    it('test1', () => {
      const result = FieldUtils.asActualFieldValue({
        emptyValue: FieldConstants.DISPLAY_EMPTY_VALUE,
        value: 'updatedValue1',
      });
      expect(result).toEqual('updatedValue1');
    });

    it('test2', () => {
      const result = FieldUtils.asActualFieldValue({
        emptyValue: FieldConstants.DISPLAY_EMPTY_VALUE,
        originalValue: 'updatedValue1',
        value: 'updatedValue1',
      });
      expect(result).toEqual(FieldConstants.VALUE_TO_CLEAR_DIRTY_CHANGES);
    });

    it('test3', () => {
      const result = FieldUtils.asActualFieldValue({
        emptyValue: FieldConstants.DISPLAY_EMPTY_VALUE,
        originalValue: 'updatedValue1',
        value: 'updatedValue2',
      });
      expect(result).toEqual('updatedValue2');
    });

    it('test4', () => {
      const result = FieldUtils.asActualFieldValue({
        emptyValue: FieldConstants.DISPLAY_EMPTY_VALUE,
        originalValue: 'updatedValue1',
        value: 'updatedValue1',
        keepChanges: true,
      });
      expect(result).toEqual(FieldConstants.VALUE_TO_CLEAR_DIRTY_CHANGES);
    });

    it('test5', () => {
      const result = FieldUtils.asActualFieldValue({
        emptyValue: FieldConstants.DISPLAY_EMPTY_VALUE,
        value: FieldConstants.DISPLAY_EMPTY_VALUE,
        keepChanges: true,
      });
      expect(result).toEqual(FieldConstants.DISPLAY_EMPTY_VALUE);
    });

    it('test6', () => {
      const result = FieldUtils.asActualFieldValue({
        emptyValue: FieldConstants.DISPLAY_EMPTY_VALUE,
        value: FieldConstants.DISPLAY_EMPTY_VALUE,
      });
      expect(result).toEqual(FieldConstants.VALUE_TO_CLEAR_DIRTY_CHANGES);
    });
  });
});
