import { toEntityIds, normalizeEntities, toActualEntitiesLength } from './multifield.support';
import { UNDEF } from '../../../definitions.interface';

describe('multifield.converter', function () {
  describe('normalizeEntities', function () {
    it('test1', function () {
      var ids = normalizeEntities(1);
      expect(ids).toEqual([{ id: 1 }]);
    });

    it('test2', function () {
      var ids = normalizeEntities([{ id: 1 }]);
      expect(ids).toEqual([{ id: 1 }]);
    });
  });

  describe('toActualEntitiesLength', function () {
    it('test1', function () {
      var length = toActualEntitiesLength(1);
      expect(length).toEqual(1);
    });

    it('test2', function () {
      var length = toActualEntitiesLength('1');
      expect(length).toEqual(1);
    });

    it('test3', function () {
      var length = toActualEntitiesLength([{ id: 1 }, { id: 2 }]);
      expect(length).toEqual(2);
    });

    it('test4', function () {
      var length = toActualEntitiesLength(UNDEF);
      expect(length).toEqual(0);
    });

    it('test5', function () {
      var length = toActualEntitiesLength({
        add: [{ id: 1 }],
        remove: [{ id: 2 }],
        edit: [],
        source: [{ id: 3 }],
      });
      expect(length).toEqual(2);
    });

    it('test6', function () {
      var length = toActualEntitiesLength({
        add: [{ id: 1 }],
        remove: [{ id: 2 }],
        edit: [],
      });
      expect(length).toEqual(1);
    });

    it('test7', function () {
      var length = toActualEntitiesLength({
        add: [{ id: 1 }, { id: 3 }],
        remove: [{ id: 2 }],
        edit: [],
      });
      expect(length).toEqual(2);
    });

    it('test8', function () {
      var length = toActualEntitiesLength({
        add: [],
        remove: [{ id: 1 }],
        edit: [],
      });
      expect(length).toEqual(0);
    });

    it('test9', function () {
      var length = toActualEntitiesLength({
        add: [],
        remove: [{ id: 1 }],
        edit: [],
        source: [{ id: 2 }],
      });
      expect(length).toEqual(1);
    });
  });

  describe('toEntityIds', function () {
    it('test1', function () {
      var ids = toEntityIds({
        add: [],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([]);
    });

    it('test2', function () {
      var ids = toEntityIds({
        add: [],
        remove: [],
        edit: [],
      });
      expect(ids).toEqual([]);
    });

    it('test3', function () {
      var ids = toEntityIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([1]);
    });

    it('test4', function () {
      var ids = toEntityIds({
        add: [{id: 1}, {id: 2}],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([1, 2]);
    });

    it('test5', function () {
      var ids = toEntityIds({
        add: [{id: 1}, {id: 2}],
        remove: [],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([1, 2, 3]);
    });

    it('test6', function () {
      var ids = toEntityIds({
        add: [{id: 1}, {id: 2}],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([1, 2]);
    });

    it('test7', function () {
      var ids = toEntityIds({
        add: [],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([]);
    });

    it('test8', function () {
      var ids = toEntityIds({
        add: [],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}, {id: 4}],
      });
      expect(ids).toEqual([4]);
    });

    it('test9', function () {
      var ids = toEntityIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
        source: [{id: 2}, {id: 3}],
      });
      expect(ids).toEqual([1, 2, 3]);
    });

    it('test10', function () {
      var ids = toEntityIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
      });
      expect(ids).toEqual([1]);
    });

    it('test11', function () {
      var ids = toEntityIds([{id: 1}, {id: 2}]);
      expect(ids).toEqual([1, 2]);
    });

    it('test12', function () {
      expect(toEntityIds(UNDEF)).toEqual(UNDEF);
    });
  });
});
