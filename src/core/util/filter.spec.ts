import {
  filterByPredicate,
  excludeFieldsFilter,
  noUndefValuesFilter,
  excludeIdFieldFilter,
} from './filter';
import { ID_FIELD_NAME } from '../definition.interface';

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
    }, (key, value) => key !== 'key2', (key, value) => key !== 'key1');

    expect(filteredObject).toEqual({});
  });

  it('test4', () => {
    const filteredObject = filterByPredicate({
      key1: 'value1',
      key2: 'value2',
    }, (key, value) => key !== 'key1', (key, value) => key !== 'key3');

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

describe('noUndefValuesFilter', () => {
  it('test1', () => {
    const filteredObject = noUndefValuesFilter({
      key1: 'value1',
      key2: undefined,
    });

    expect(filteredObject).toEqual({
      key1: 'value1',
    });
  });

  it('test2', () => {
    const filteredObject = noUndefValuesFilter({
      key1: 'value1',
      key2: 100,
    });

    expect(filteredObject).toEqual({
      key1: 'value1',
      key2: 100,
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
});
