import { toEntityIds } from './multifield.converter';
import { UNDEF } from '../../../definition.interface';

describe('toEntityIds', function () {
  it('test1', function () {
    var ids = toEntityIds({
      add: [],
      remove: [],
      source: [],
    });
    expect(ids).toEqual([]);
  });

  it('test2', function () {
    var ids = toEntityIds({
      add: [],
      remove: [],
    });
    expect(ids).toEqual([]);
  });

  it('test3', function () {
    var ids = toEntityIds({
      add: [{id: 1}],
      remove: [],
      source: [],
    });
    expect(ids).toEqual([1]);
  });

  it('test4', function () {
    var ids = toEntityIds({
      add: [{id: 1}, {id: 2}],
      remove: [],
      source: [],
    });
    expect(ids).toEqual([1, 2]);
  });

  it('test5', function () {
    var ids = toEntityIds({
      add: [{id: 1}, {id: 2}],
      remove: [],
      source: [{id: 3}],
    });
    expect(ids).toEqual([1, 2, 3]);
  });

  it('test6', function () {
    var ids = toEntityIds({
      add: [{id: 1}, {id: 2}],
      remove: [{id: 3}],
      source: [{id: 3}],
    });
    expect(ids).toEqual([1, 2]);
  });

  it('test7', function () {
    var ids = toEntityIds({
      add: [],
      remove: [{id: 3}],
      source: [{id: 3}],
    });
    expect(ids).toEqual([]);
  });

  it('test8', function () {
    var ids = toEntityIds({
      add: [],
      remove: [{id: 3}],
      source: [{id: 3}, {id: 4}],
    });
    expect(ids).toEqual([4]);
  });

  it('test9', function () {
    var ids = toEntityIds({
      add: [{id: 1}],
      remove: [],
      source: [{id: 2}, {id: 3}],
    });
    expect(ids).toEqual([1, 2, 3]);
  });

  it('test10', function () {
    var ids = toEntityIds([{id: 1}, {id: 2}]);
    expect(ids).toEqual([1, 2]);
  });

  it('test11', function () {
    expect(toEntityIds(UNDEF)).toEqual(UNDEF);
  });
});
