import { UNDEF } from '../definitions.interface';
import { MultiFieldUtils } from './multi-field';

describe('multi-field', () => {

  describe('MultiFieldUtils.multiFieldValueAsEntitiesIds', () => {
    it('test1', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([]);
    });

    it('test2', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [],
        remove: [],
        edit: [],
      });
      expect(ids).toEqual([]);
    });

    it('test3', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([1]);
    });

    it('test4', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [{id: 1}, {id: 2}],
        remove: [],
        edit: [],
        source: [],
      });
      expect(ids).toEqual([1, 2]);
    });

    it('test5', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [{id: 1}, {id: 2}],
        remove: [],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([1, 2, 3]);
    });

    it('test6', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [{id: 1}, {id: 2}],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([1, 2]);
    });

    it('test7', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}],
      });
      expect(ids).toEqual([]);
    });

    it('test8', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [],
        remove: [{id: 3}],
        edit: [],
        source: [{id: 3}, {id: 4}],
      });
      expect(ids).toEqual([4]);
    });

    it('test9', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
        source: [{id: 2}, {id: 3}],
      });
      expect(ids).toEqual([1, 2, 3]);
    });

    it('test10', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds({
        add: [{id: 1}],
        remove: [],
        edit: [],
      });
      expect(ids).toEqual([1]);
    });

    it('test11', () => {
      const ids = MultiFieldUtils.multiFieldValueAsEntitiesIds([{id: 1}, {id: 2}]);
      expect(ids).toEqual([1, 2]);
    });

    it('test12', () => {
      expect(MultiFieldUtils.multiFieldValueAsEntitiesIds(UNDEF)).toEqual(UNDEF);
    });
  });
});
