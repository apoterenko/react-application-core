import { listReducer } from './list.reducer';
import { ListActionBuilder } from './list-action.builder';
import {
  EntityMergeStrategiesEnum,
  INITIAL_REDUX_LIST_ENTITY,
  LIST_MERGE_ACTION_TYPE,
} from '../../definition';

const TEST_SECTION = 'test';

describe('list.reducer', () => {
  describe(LIST_MERGE_ACTION_TYPE, () => {

    // Update
    it('test1', () => {
      const reducedList = listReducer(
        Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
          data: [
            {id: 1, field1: 'value1', field2: 'value3'},
            {id: 2, field1: 'value2', field2: 'value4'},
            {id: 3, field1: 'value3', field2: 'value5'}
          ],
          totalCount: 3,
        }),
        ListActionBuilder.buildMergePlainAction(TEST_SECTION, {
          id: 2,
          changes: {field1: 'value20'},
        })
      );

      const result = Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
        data: [
          {id: 1, field1: 'value1', field2: 'value3'},
          {id: 2, field1: 'value20', field2: 'value4'},
          {id: 3, field1: 'value3', field2: 'value5'}
        ],
        totalCount: 3,
      });
      expect(reducedList).toEqual(result);
    });

    // Update
    it('test2', () => {
      const reducedList = listReducer(
        Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
          data: [
            {id: 1, field1: 'value1', field2: 'value3'},
            {id: 2, field1: 'value2', field2: 'value4'},
            {id: 3, field1: 'value3', field2: 'value5'}
          ],
          totalCount: 3,
        }),
        ListActionBuilder.buildMergePlainAction(TEST_SECTION, {
          id: 2,
          changes: {id: 2, field1: 'value20'},
          mergeStrategy: EntityMergeStrategiesEnum.OVERRIDE,
        })
      );

      const result = Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
        data: [
          {id: 1, field1: 'value1', field2: 'value3'},
          {id: 2, field1: 'value20'},
          {id: 3, field1: 'value3', field2: 'value5'}
        ],
        totalCount: 3,
      });
      expect(reducedList).toEqual(result);
    });

    // Update
    it('test3', () => {
      const reducedList = listReducer(
        Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
          data: [
            {id: 1, field1: 'value1', field2: 'value3'},
            {id: 2, field1: 'value2', field2: 'value4'},
            {id: 3, field1: 'value3', field2: 'value5'}
          ],
          selected: {id: 2, field1: 'value2', field2: 'value4'},
          totalCount: 3,
        }),
        ListActionBuilder.buildMergePlainAction(TEST_SECTION, {
          id: 2,
          changes: {id: 2, field1: 'value20'},
        })
      );

      const result = Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
        data: [
          {id: 1, field1: 'value1', field2: 'value3'},
          {id: 2, field1: 'value20', field2: 'value4'},
          {id: 3, field1: 'value3', field2: 'value5'}
        ],
        selected: {id: 2, field1: 'value20', field2: 'value4'},
        totalCount: 3,
      });
      expect(reducedList).toEqual(result);
    });

    // Update
    it('test4', () => {
      const reducedList = listReducer(
        Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
          data: [
            {id: 1, field1: 'value1', field2: 'value3'},
            {id: 2, field1: 'value2', field2: 'value4'},
            {id: 3, field1: 'value3', field2: 'value5'}
          ],
          selected: {id: 2, field1: 'value2', field2: 'value4'},
          totalCount: 3,
        }),
        ListActionBuilder.buildMergePlainAction(TEST_SECTION, {
          id: 2,
          changes: {id: 2, field1: 'value20'},
          mergeStrategy: EntityMergeStrategiesEnum.OVERRIDE,
        })
      );

      const result = Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
        data: [
          {id: 1, field1: 'value1', field2: 'value3'},
          {id: 2, field1: 'value20'},
          {id: 3, field1: 'value3', field2: 'value5'}
        ],
        selected: {id: 2, field1: 'value20'},
        totalCount: 3,
      });
      expect(reducedList).toEqual(result);
    });

    // Insert
    it('test5', () => {
      const reducedList = listReducer(
        Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
          data: [
            {id: 1, field1: 'value1', field2: 'value3'},
            {id: 2, field1: 'value2', field2: 'value4'}
          ],
          totalCount: 2,
        }),
        ListActionBuilder.buildMergePlainAction(TEST_SECTION, {
          id: 3,
          changes: {id: 3, field1: 'value3', field2: 'value5'},
        })
      );

      const result = Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
        data: [
          {id: 3, field1: 'value3', field2: 'value5'},
          {id: 1, field1: 'value1', field2: 'value3'},
          {id: 2, field1: 'value2', field2: 'value4'}
        ],
        selected: {id: 3, field1: 'value3', field2: 'value5'},
        totalCount: 3,
      });
      expect(reducedList).toEqual(result);
    });

    // Insert
    it('test6', () => {
      const reducedList = listReducer(
        Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
          data: [
            {id: 1, field1: 'value1', field2: 'value3'},
            {id: 2, field1: 'value2', field2: 'value4'}
          ],
          totalCount: 2,
        }),
        ListActionBuilder.buildMergePlainAction(TEST_SECTION, {
          id: 3,
          changes: {id: 3, field1: 'value3', field2: 'value5'},
          mergeStrategy: EntityMergeStrategiesEnum.OVERRIDE,  // Will ignored because "Insert"
        })
      );

      const result = Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
        data: [
          {id: 3, field1: 'value3', field2: 'value5'},
          {id: 1, field1: 'value1', field2: 'value3'},
          {id: 2, field1: 'value2', field2: 'value4'}
        ],
        selected: {id: 3, field1: 'value3', field2: 'value5'},
        totalCount: 3,
      });
      expect(reducedList).toEqual(result);
    });

    // Insert
    it('test7', () => {
      const reducedList = listReducer(
        INITIAL_REDUX_LIST_ENTITY,
        ListActionBuilder.buildMergePlainAction(TEST_SECTION, {
          id: 1,
          changes: {id: 1, field1: 'value1', field2: 'value2'},
        })
      );

      const result = Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
        data: [
          {id: 1, field1: 'value1', field2: 'value2'}
        ],
        selected: {id: 1, field1: 'value1', field2: 'value2'},
        totalCount: 1,
      });
      expect(reducedList).toEqual(result);
    });

    // Insert
    it('test8', () => {
      const reducedList = listReducer(
        INITIAL_REDUX_LIST_ENTITY,
        ListActionBuilder.buildMergePlainAction(TEST_SECTION, {
          id: 1,
          changes: {id: 1, field1: 'value1', field2: 'value2'},
          mergeStrategy: EntityMergeStrategiesEnum.OVERRIDE,  // Will ignored because "Insert"
        })
      );

      const result = Object.assign({}, INITIAL_REDUX_LIST_ENTITY, {
        data: [
          {id: 1, field1: 'value1', field2: 'value2'}
        ],
        selected: {id: 1, field1: 'value1', field2: 'value2'},
        totalCount: 1,
      });
      expect(reducedList).toEqual(result);
    });
  });
});
