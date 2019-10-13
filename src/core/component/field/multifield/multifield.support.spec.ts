import {
  fromMultiFieldEntityToEntitiesIds,
  buildMultiEditItemEntityPayload,
  fromMultiFieldEntityToEntities,
  toMultiFieldChangesEntityOnEdit,
  toMultiFieldChangesEntityOnDelete,
  asViewedMultiItemEntities,
} from './multifield.support';
import { UNDEF } from '../../../definitions.interface';

describe('multifield.support', () => {

  describe('toActualMultiItemEntities2', () => {
    const itemsCount = 6;
    it('test1', () => {
      const item1 = {id: 100, name: 'name1'};
      const item2 = {id: 101, name: 'name2'};
      const item3 = {id: 103, name: 'name3', newEntity: true, index: 4};
      const result = asViewedMultiItemEntities([item3, item1, item2], itemsCount);
      expect(result).toEqual([item1, item2, UNDEF, UNDEF, item3, UNDEF]);
    });
    it('test2', () => {
      const item1 = {id: 100, name: 'name1'};
      const item2 = {id: 101, name: 'name2'};
      const item3 = {id: 103, name: 'name3', newEntity: true, index: 4};
      const result = asViewedMultiItemEntities([item1, item2, item3], itemsCount);
      expect(result).toEqual([item1, item2, UNDEF, UNDEF, item3, UNDEF]);
    });
    it('test3', () => {
      const item1 = {id: 100, name: 'name1'};
      const item2 = {id: 101, name: 'name2', index: 1};
      const result = asViewedMultiItemEntities([item1, item2], itemsCount);
      expect(result).toEqual([item1, item2, UNDEF, UNDEF, UNDEF, UNDEF]);
    });
  });

  describe('toMultiFieldChangesEntityOnDelete', () => {
    it('test1', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const item3 = {id: 102, field1: 2000, field2: 3000};
      const result = toMultiFieldChangesEntityOnDelete(
        {id: 100},                                                  // payload
        [item1, item2],                                             // add
        [],                                                         // remove
        [{id: 102, name: 'field2', value: 3001, rawData: item3}],   // edit
        []                                                          // original
      );
      expect(result).toEqual({
        removeArray: [],
        editArray: [{id: 102, name: 'field2', value: 3001, rawData: item3}],
        addArray: [item2],
      });
    });

    it('test2', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const item3 = {id: 102, field1: 2000, field2: 3000};
      const result = toMultiFieldChangesEntityOnDelete(
        {id: 102},                                                  // payload
        [item1, item2],                                             // add
        [],                                                         // remove
        [{id: 102, name: 'field2', value: 3001, rawData: item3}],   // edit
        []                                                          // original
      );
      expect(result).toEqual({
        removeArray: [],
        editArray: [],
        addArray: [item1, item2],
      });
    });

    it('test3', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const item3 = {id: 102, field1: 2000, field2: 3000};
      const item4 = {id: 103, field1: 20000, field2: 30000};
      const result = toMultiFieldChangesEntityOnDelete(
        {id: 103},                                                  // payload
        [item1, item2],                                             // add
        [],                                                         // remove
        [{id: 102, name: 'field2', value: 3001, rawData: item3}],   // edit
        [item3, item4]                                              // original
      );
      expect(result).toEqual({
        removeArray: [item4],
        editArray: [{id: 102, name: 'field2', value: 3001, rawData: item3}],
        addArray: [item1, item2],
      });
    });

    it('test4', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const item3 = {id: 102, field1: 2000, field2: 3000};
      const item4 = {id: 103, field1: 20000, field2: 30000};
      const item5 = {id: 104, field1: 200000, field2: 300000};
      const result = toMultiFieldChangesEntityOnDelete(
        {id: 103},                                                  // payload
        [item1, item2],                                             // add
        [item5],                                                    // remove
        [{id: 102, name: 'field2', value: 3001, rawData: item3}],   // edit
        [item3, item4, item5]                                       // original
      );
      expect(result).toEqual({
        removeArray: [item4, item5],
        editArray: [{id: 102, name: 'field2', value: 3001, rawData: item3}],
        addArray: [item1, item2],
      });
    });
  });

  describe('toMultiFieldChangesEntityOnEdit', () => {
    it('test1', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const result = toMultiFieldChangesEntityOnEdit(
        {name: 'field1', value: 21, id: 100, rawData: item1},       // payload
        [item1, item2],                                             // add
        [],                                                         // remove
        [{id: 101, name: 'field2', value: 301, rawData: item2}],    // edit
        []                                                          // original
      );
      expect(result).toEqual({
        removeArray: [],
        editArray: [{id: 101, name: 'field2', value: 301, rawData: item2}],
        addArray: [Object.assign({}, item1, {field1: 21}), item2],
      });
    });

    it('test2', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const item3 = {id: 102, field1: 2000, field2: 3000};
      const result = toMultiFieldChangesEntityOnEdit(
        {name: 'field1', value: 21, id: 100, rawData: item1},  // payload
        [],   // add
        [],   // remove
        [],   // edit
        [item1, item2, item3]    // original
      );
      expect(result).toEqual({
        removeArray: [],
        editArray: [{id: 100, name: 'field1', value: 21, rawData: item1}],
        addArray: [],
      });
    });

    it('test3', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const item3 = {id: 102, field1: 2000, field2: 3000};
      const result = toMultiFieldChangesEntityOnEdit(
        {id: 100, name: 'field1', value: 21, rawData: item1},  // payload
        [],   // add
        [],   // remove
        [{id: 101, name: 'field2', value: 301, rawData: item2}],   // edit
        [item1, item2, item3]    // original
      );
      expect(result).toEqual({
        removeArray: [],
        editArray: [
          {id: 101, name: 'field2', value: 301, rawData: item2},
          {id: 100, name: 'field1', value: 21, rawData: item1}
        ],
        addArray: [],
      });
    });

    it('test4', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const item3 = {id: 102, field1: 2000, field2: 3000};
      const result = toMultiFieldChangesEntityOnEdit(
        {id: 101, name: 'field2', value: 300, rawData: item1},  // payload
        [],   // add
        [],   // remove
        [{id: 101, name: 'field2', value: 301, rawData: item2}],   // edit
        [item1, item2, item3]    // original
      );
      expect(result).toEqual({
        removeArray: [],
        editArray: [],
        addArray: [],
      });
    });

    it('test5', () => {
      const item1 = {id: 100, field1: 20, field2: 30};
      const item2 = {id: 101, field1: 200, field2: 300};
      const item3 = {id: 102, field1: 2000, field2: 3000};
      const result = toMultiFieldChangesEntityOnEdit(
        {id: 101, name: 'field2', value: 300, rawData: item1},  // payload
        [],   // add
        [],   // remove
        [
          {id: 101, name: 'field2', value: 301, rawData: item2},
          {id: 101, name: 'field1', value: 201, rawData: item2}
        ],   // edit
        [item1, item2, item3]    // original
      );
      expect(result).toEqual({
        removeArray: [],
        editArray: [{id: 101, name: 'field1', value: 201, rawData: item2}],
        addArray: [],
      });
    });
  });

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
