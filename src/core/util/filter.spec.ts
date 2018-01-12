import {
  filterByPredicate,
  excludeFieldsFilter,
  noUndefValuesFilter,
  excludeIdFieldFilter,
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

describe('noUndefValuesFilter', function () {
  it('test1', function () {
    var filteredObject = noUndefValuesFilter({
      key1: 'value1',
      key2: void 0,
    });

    expect(filteredObject).toEqual({
      key1: 'value1',
    });
  });

  it('test2', function () {
    var filteredObject = noUndefValuesFilter({
      key1: 'value1',
      key2: 100,
    });

    expect(filteredObject).toEqual({
      key1: 'value1',
      key2: 100,
    });
  });

  it('test3', function () {
    var filteredObject = noUndefValuesFilter({
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
