import { MultiFieldPlugin } from './multifield.plugin';

describe('MultiFieldPlugin', () => {
  it('test1', () => {
    const multiFieldPlugin = new MultiFieldPlugin({
      value: [{id: 1}, {id: 2}],
    });

    const result = multiFieldPlugin.onAdd({id: 2});
    expect(result.addArray).toEqual([{id: 2}]);
    expect(result.removeArray).toEqual([]);
  });

  it('test2', () => {
    const multiFieldPlugin = new MultiFieldPlugin({
      value: [{id: 1}, {id: 2}],
    });

    const result = multiFieldPlugin.onDelete({id: 2});
    expect(result.addArray).toEqual([]);
    expect(result.removeArray).toEqual([{id: 2}]);
  });

  it('test3', () => {
    const multiFieldPlugin = new MultiFieldPlugin({
      value: {add: [], remove: [{id: 1}], edit: [], source: [{id: 1}, {id: 2}]},
    });

    const result = multiFieldPlugin.onAdd({id: 1});
    expect(result.addArray).toEqual([]);
    expect(result.removeArray).toEqual([]);
  });

  it('test4', () => {
    const multiFieldPlugin = new MultiFieldPlugin({
      value: {add: [{id: 3}], remove: [], edit: [], source: [{id: 1}, {id: 2}]},
    });

    const result = multiFieldPlugin.onDelete({id: 3});
    expect(result.addArray).toEqual([]);
    expect(result.removeArray).toEqual([]);
  });

  it('test4', () => {
    const multiFieldPlugin = new MultiFieldPlugin({
      value: {add: [{id: 3}], remove: [{id: 4}], edit: [], source: [{id: 1}, {id: 2}]},
    });

    const result = multiFieldPlugin.onAdd({id: 5});
    expect(result.addArray).toEqual([{id: 3}, {id: 5}]);
    expect(result.removeArray).toEqual([{id: 4}]);

    const result2 = multiFieldPlugin.onDelete({id: 3});
    expect(result2.addArray).toEqual([]);
    expect(result2.removeArray).toEqual([{id: 4}]);

    const result3 = multiFieldPlugin.onAdd({id: 4});
    expect(result3.addArray).toEqual([{id: 3}]);
    expect(result3.removeArray).toEqual([]);
  });

  it('test5', () => {
    const multiFieldPlugin = new MultiFieldPlugin({
      value: {add: [{id: 3}], remove: [{id: 4}], edit: [], source: [{id: 1}, {id: 2}]},
    });

    const result = multiFieldPlugin.onDelete({id: 5});
    expect(result.addArray).toEqual([{id: 3}]);
    expect(result.removeArray).toEqual([{id: 4}]);
  });
});
