import {
  filterByPredicate,
  excludeFieldsFilter,
  defValuesFilter,
  excludeIdFieldFilter,
  cloneUsingFilters,
} from './filter';
import { ID_FIELD_NAME } from '../definition.interface';

describe('filterByPredicate', function () {
  it('test1', function () {
    var filteredObject = filterByPredicate({
      key1: 'value1',
      key2: 'value2',
    }, function (key, value) { return key !== 'key1'; });

    expect(filteredObject).toEqual({
      key2: 'value2',
    });
  });

  it('test2', function () {
    var filteredObject = filterByPredicate({
      key1: 'value1',
      key2: 'value2',
    }, function (key, value) { return key !== 'key3'; });

    expect(filteredObject).toEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });

  it('test3', function () {
    var filteredObject = filterByPredicate({
      key1: 'value1',
      key2: 'value2',
    }, function (key, value) { return key !== 'key2'; },
        function (key, value) { return key !== 'key1'; });

    expect(filteredObject).toEqual({});
  });

  it('test4', function () {
    var filteredObject = filterByPredicate({
      key1: 'value1',
      key2: 'value2',
    }, function (key, value) { return key !== 'key1'; },
        function (key, value) { return key !== 'key3'; });

    expect(filteredObject).toEqual({
      key2: 'value2',
    });
  });
});

describe('excludeFieldsFilter', function () {
  it('test1', function () {
    var filteredObject = excludeFieldsFilter({
      key1: 'value1',
      key2: 'value2',
    }, 'key1');

    expect(filteredObject).toEqual({
      key2: 'value2',
    });
  });

  it('test2', function () {
    var filteredObject = excludeFieldsFilter({
      key1: 'value1',
      key2: 'value2',
    }, 'key1', 'key2');

    expect(filteredObject).toEqual({});
  });

  it('test3', function () {
    var filteredObject = excludeFieldsFilter({
      key1: 'value1',
      key2: 'value2',
    }, 'key3');

    expect(filteredObject).toEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });
});

describe('defValuesFilter', function () {
  it('test1', function () {
    var filteredObject = defValuesFilter({
      key1: 'value1',
      key2: void 0,
    });

    expect(filteredObject).toEqual({
      key1: 'value1',
    });
  });

  it('test2', function () {
    var filteredObject = defValuesFilter({
      key1: 'value1',
      key2: 100,
    });

    expect(filteredObject).toEqual({
      key1: 'value1',
      key2: 100,
    });
  });

  it('test3', function () {
    var filteredObject = defValuesFilter({
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

describe('excludeIdFieldFilter', function () {
  it('test1', function () {
    var o = { key1: 'value1' };
    o[ID_FIELD_NAME] = 100;
    var filteredObject = excludeIdFieldFilter(o);

    expect(filteredObject).toEqual({
      key1: 'value1',
    });
  });

  it('test2', function () {
    var o = { id1: 'value1' };
    var filteredObject = excludeIdFieldFilter(o);

    expect(filteredObject).toEqual({
      id1: 'value1',
    });
  });
});

describe('cloneUsingFilters', function () {
  it('test1', function () {
    var o = { key1: 'value1', key2: { key3: 'value3' } };
    var clonedObject = cloneUsingFilters(o);

    expect(clonedObject).toEqual({ key1: 'value1', key2: { key3: 'value3' } });
  });

  it('test2', function () {
    var o = { key1: 'value1', key2: { key3: 'value3' } };
    var clonedObject = cloneUsingFilters(o);
    clonedObject['key4'] = 'value4';

    expect(o).toEqual({ key1: 'value1', key2: { key3: 'value3' } });
  });

  it('test3', function () {
    var o = { key1: 'value1', key2: { key3: 'value3' } };
    var clonedObject = cloneUsingFilters(o, function (key) {
      return key !== 'key3';
    });

    expect(clonedObject).toEqual({ key1: 'value1', key2: { } });
  });

  it('test4', function () {
    var o = { key1: 'value1', key2: { key3: 'value3' } };
    var clonedObject = cloneUsingFilters(o, function (key) {
      return key !== 'key2';
    });

    expect(clonedObject).toEqual({ key1: 'value1' });
  });

  it('test5', function () {
    var o = { key1: 'value1', key2: [1, 2, 3] };
    var clonedObject = cloneUsingFilters(o, function (key) {
      return key !== 'key2';
    });

    expect(clonedObject).toEqual({ key1: 'value1' });
  });

  it('test6', function () {
    var o = { key1: 'value1', key2: { key3: null } };
    var clonedObject = cloneUsingFilters(o, function (key) {
      return key !== 'key3';
    });

    expect(clonedObject).toEqual({ key1: 'value1', key2: { } });
  });

  it('test7', function () {
    var o = { key1: 'value1', key2: { key3: undefined } };
    var clonedObject = cloneUsingFilters(o, function (key) {
      return key !== 'key3';
    });

    expect(clonedObject).toEqual({ key1: 'value1', key2: { } });
  });

  it('test8', function () {
    var o = { key1: 'value1', key2: { key3: 0 } };
    var clonedObject = cloneUsingFilters(o, function (key) {
      return key !== 'key3';
    });

    expect(clonedObject).toEqual({ key1: 'value1', key2: { } });
  });

  it('test9', function () {
    var o = { };
    var clonedObject = cloneUsingFilters(o);

    expect(clonedObject).toEqual({});
  });

  it('test10', function () {
    var o = { key1: 'value1', key2: { key3: new Date() } };
    var clonedObject = cloneUsingFilters(o, function (key) {
      return key !== 'key3';
    });

    expect(clonedObject).toEqual({ key1: 'value1', key2: { } });
  });

  it('test11', function () {
    var o = { key1: 'value1', key2: { key3: { key4: { key3: 'value3' } }, key7: { key8: null, key9: null } } };
    var clonedObject = cloneUsingFilters(o, function (key) {
      return key !== 'key3' && key !== 'key9';
    });

    expect(clonedObject).toEqual(
      { key1: 'value1', key2: { key7: { key8: null } } }
    );
  });
});
