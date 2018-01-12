import { filterByPredicate } from './filter';

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
    }, (key, value) => key !== 'key1' && key !== 'key2');

    expect(filteredObject).toEqual({});
  });
});
