import {
  fromMultiFieldEntityToEntitiesIds,
  normalizeEntities,
  toActualMultiItemEntitiesLength,
  buildMultiEditItemEntityPayload,
  fromMultiFieldEntityToEntities,
  toActualMultiItemEditedEntities,
} from './multifield.support';
import { UNDEF } from '../../../definitions.interface';

describe('multifield.support', () => {

  describe('buildMultiEditItemEntityPayload', () => {
    it('test1', () => {
      const entity = Object.freeze({id: 1, count: 100});
      const result = buildMultiEditItemEntityPayload(
        'count',
        [entity],
        (itm) => itm.id === entity.id,
        (itm) => entity.count + 1
      );
      expect(result).toEqual({id: 1, value: 101, name: 'count', rawData: {id: 1, count: 100}});
    });

    it('test2', () => {
      const entity = Object.freeze({id: 1, count: 100});
      const result = buildMultiEditItemEntityPayload(
        'count',
        {
          add: [],
          remove: [],
          edit: [{id: entity.id, name: 'count', value: 101, rawData: entity}],
          source: [entity],
        },
        (itm) => itm.id === entity.id,
        (itm) => itm.value + 1
      );
      expect(result).toEqual({id: 1, value: 102, name: 'count', rawData: {id: 1, count: 100}});
    });
  });

  describe('normalizeEntities', () => {
    it('test1', () => {
      const ids = normalizeEntities(1);
      expect(ids).toEqual([{ id: 1 }]);
    });

    it('test2', () => {
      const ids = normalizeEntities([{ id: 1 }]);
      expect(ids).toEqual([{ id: 1 }]);
    });
  });

  describe('toActualMultiItemEntitiesLength', () => {
    it('test1', () => {
      const length = toActualMultiItemEntitiesLength(1);
      expect(length).toEqual(1);
    });

    it('test2', () => {
      const length = toActualMultiItemEntitiesLength('1');
      expect(length).toEqual(1);
    });

    it('test3', () => {
      const length = toActualMultiItemEntitiesLength([{id: 1}, {id: 2}]);
      expect(length).toEqual(2);
    });

    it('test4', () => {
      const length = toActualMultiItemEntitiesLength(UNDEF);
      expect(length).toEqual(0);
    });

    it('test5', () => {
      const length = toActualMultiItemEntitiesLength({
        add: [{id: 1}],
        remove: [{id: 2}],
        edit: [],
        source: [{id: 3}],
      });
      expect(length).toEqual(2);
    });

    it('test6', () => {
      const length = toActualMultiItemEntitiesLength({
        add: [{id: 1}],
        remove: [{id: 2}],
        edit: [],
      });
      expect(length).toEqual(1);
    });

    it('test7', () => {
      const length = toActualMultiItemEntitiesLength({
        add: [{id: 1}, {id: 3}],
        remove: [{id: 2}],
        edit: [],
      });
      expect(length).toEqual(2);
    });

    it('test8', () => {
      const length = toActualMultiItemEntitiesLength({
        add: [],
        remove: [{id: 1}],
        edit: [],
      });
      expect(length).toEqual(0);
    });

    it('test9', () => {
      const length = toActualMultiItemEntitiesLength({
        add: [],
        remove: [{id: 1}],
        edit: [],
        source: [{id: 2}],
      });
      expect(length).toEqual(1);
    });

    it('test10', () => {
      const length = toActualMultiItemEntitiesLength({
        add: [{id: '1'}],
        remove: [{id: '2'}],
        edit: [],
        source: [{id: '3'}],
      });
      expect(length).toEqual(2);
    });
  });

  describe('fromMultiFieldEntityToEntitiesIds', () => {
    it('test1', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([]);
    });

    it('test2', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [],
        remove: [],
        edit: [],
      });
      expect(ids).toEqual([]);
    });

    it('test3', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([1]);
    });

    it('test4', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [{id: 1}, {id: 2}],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([1, 2]);
    });

    it('test5', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [{id: 1}, {id: 2}],
        remove: [],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([1, 2, 3]);
    });

    it('test6', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [{id: 1}, {id: 2}],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([1, 2]);
    });

    it('test7', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([]);
    });

    it('test8', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}, {id: 4}],
      });
      expect(ids).toEqual([4]);
    });

    it('test9', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
        source: [{id: 2}, {id: 3}],
      });
      expect(ids).toEqual([1, 2, 3]);
    });

    it('test10', () => {
      const ids = fromMultiFieldEntityToEntitiesIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
      });
      expect(ids).toEqual([1]);
    });

    it('test11', () => {
      const ids = fromMultiFieldEntityToEntitiesIds([{id: 1}, {id: 2}]);
      expect(ids).toEqual([1, 2]);
    });

    it('test12', () => {
      expect(fromMultiFieldEntityToEntitiesIds(UNDEF)).toEqual(UNDEF);
    });
  });

  describe('toActualMultiItemEditedEntities', () => {

    it('test1', () => {
      const data = toActualMultiItemEditedEntities({
        add: [],
        remove: [],
        edit: [{id: 1, name: 'field1', value: 101}],
        source: [{id: 1, field1: 100}],
      });
      const result = [];
      result.push({id: 1, field1: 101});
      expect(data).toEqual(result);
    });

    it('test2', () => {
      const data = toActualMultiItemEditedEntities(UNDEF);
      expect(data).toEqual(UNDEF);
    });

    it('test3', () => {
      const data = toActualMultiItemEditedEntities(null);
      expect(data).toEqual(UNDEF);
    });

    it('test4', () => {
      const data = toActualMultiItemEditedEntities({
        add: [],
        remove: [],
        edit: [{id: 1, name: 'field1', value: 101}, {id: 1, name: 'field2', value: 201}],
        source: [{id: 1, field1: 100, field2: 200}, {id: 2, field3: 202}],
      });
      const result = [];
      result.push({id: 1, field1: 101, field2: 201});
      expect(data).toEqual(result);
    });
  });

  describe('fromMultiFieldEntityToEntities', () => {
    it('test1', () => {
      const data = fromMultiFieldEntityToEntities(
        [{id: 100, name: 'name100'}, {id: 200, name: 'name200'}],
        (entity, index) => Object.assign({}, entity, {extraField: `extraField${index}`})
      );
      const result = [];
      result.push({id: 100, name: 'name100', extraField: 'extraField0'});
      result.push({id: 200, name: 'name200', extraField: 'extraField1'});
      expect(data).toEqual(result);
    });

    it('test2', () => {
      const data = fromMultiFieldEntityToEntities(
        null,
        (entity, index) => Object.assign({}, entity, {extraField: `extraField${index}`})
      );
      expect(data).toEqual(UNDEF);
    });

    it('test3', () => {
      const data = fromMultiFieldEntityToEntities(
        UNDEF,
        (entity, index) => Object.assign({}, entity, {extraField: `extraField${index}`})
      );
      expect(data).toEqual(UNDEF);
    });

    it('test4', () => {
      const data = fromMultiFieldEntityToEntities(
        {
          add: [{id: 100, name: 'name100'}, {id: 200, name: 'name200'}],
          remove: [],
          edit: [],
        },
        (entity, index) => Object.assign({}, entity, {extraField: `extraField${index}`})
      );
      const result = [];
      result.push({id: 100, name: 'name100', extraField: 'extraField0'});
      result.push({id: 200, name: 'name200', extraField: 'extraField1'});
      expect(data).toEqual(result);
    });

    it('test5', () => {
      const data = fromMultiFieldEntityToEntities(
        {
          add: [{id: 100, name: 'name100'}],
          remove: [{id: 200, name: 'name200'}],
          edit: [],
          source: [{id: 200, name: 'name200'}, {id: 200, name: 'name200'}],
        },
        (entity, index) => Object.assign({}, entity, {extraField: `extraField${index}`})
      );
      const result = [];
      result.push({id: 100, name: 'name100', extraField: 'extraField0'});
      expect(data).toEqual(result);
    });

    it('test5', () => {
      const data = fromMultiFieldEntityToEntities(
        {
          add: [],
          remove: [],
          edit: [{id: 100, value: 'name101', name: 'name', rawData: {id: 100, name: 'name100'}}],
          source: [{id: 100, name: 'name100'}],
        },
        (entity, index) => Object.assign({}, entity, {extraField: `extraField${index}`})
      );
      const result = [];
      result.push({id: 100, name: 'name101', extraField: 'extraField0'});
      expect(data).toEqual(result);
    });
  });
});
