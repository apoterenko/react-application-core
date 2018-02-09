import { BasicMultiFieldPlugin } from './basic-multifield.plugin';
import { BasicMultiFieldT } from './basic-multifield.interface';

describe('BasicMultiFieldPlugin', function () {
  it('test1', function () {
    var multiFieldPlugin = new BasicMultiFieldPlugin<BasicMultiFieldT>({
      value: [{id: 1}, {id: 2}],
    });

    var result = multiFieldPlugin.onAdd({id: 2});
    expect(result.addArray).toEqual([{id: 2}]);
    expect(result.removeArray).toEqual([]);
  });

  it('test2', function () {
    var multiFieldPlugin = new BasicMultiFieldPlugin<BasicMultiFieldT>({
      value: [{id: 1}, {id: 2}],
    });

    var result = multiFieldPlugin.onDelete({id: 2});
    expect(result.addArray).toEqual([]);
    expect(result.removeArray).toEqual([{id: 2}]);
  });

  it('test3', function () {
    var multiFieldPlugin = new BasicMultiFieldPlugin<BasicMultiFieldT>({
      value: {add: [], remove: [{id: 1}], source: [{id: 1}, {id: 2}]},
    });

    var result = multiFieldPlugin.onAdd({id: 1});
    expect(result.addArray).toEqual([]);
    expect(result.removeArray).toEqual([]);
  });

  it('test4', function () {
    var multiFieldPlugin = new BasicMultiFieldPlugin<BasicMultiFieldT>({
      value: {add: [{id: 3}], remove: [], source: [{id: 1}, {id: 2}]},
    });

    var result = multiFieldPlugin.onDelete({id: 3});
    expect(result.addArray).toEqual([]);
    expect(result.removeArray).toEqual([]);
  });

  it('test4', function () {
    var multiFieldPlugin = new BasicMultiFieldPlugin<BasicMultiFieldT>({
      value: {add: [{id: 3}], remove: [{id: 4}], source: [{id: 1}, {id: 2}]},
    });

    var result = multiFieldPlugin.onAdd({id: 5});
    expect(result.addArray).toEqual([{id: 3}, {id: 5}]);
    expect(result.removeArray).toEqual([{id: 4}]);

    var result2 = multiFieldPlugin.onDelete({id: 3});
    expect(result2.addArray).toEqual([]);
    expect(result2.removeArray).toEqual([{id: 4}]);

    var result3 = multiFieldPlugin.onAdd({id: 4});
    expect(result3.addArray).toEqual([{id: 3}]);
    expect(result3.removeArray).toEqual([]);
  });

  it('test5', function () {
    var multiFieldPlugin = new BasicMultiFieldPlugin<BasicMultiFieldT>({
      value: {add: [{id: 3}], remove: [{id: 4}], source: [{id: 1}, {id: 2}]},
    });

    var result = multiFieldPlugin.onDelete({id: 5});
    expect(result.addArray).toEqual([{id: 3}]);
    expect(result.removeArray).toEqual([{id: 4}]);
  });
});
