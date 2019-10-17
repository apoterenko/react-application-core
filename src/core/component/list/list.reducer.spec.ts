import {
  LIST_REMOVE_ACTION_TYPE,
  INITIAL_LIST_ENTITY,
} from './list.interface';
import { listReducer } from './list.reducer';
import { ListActionBuilder } from './list-action.builder';

const TEST_SECTION = 'test';

describe('list.reducer', () => {
  describe(LIST_REMOVE_ACTION_TYPE, () => {
    it('test1', () => {
      const entity1 = {id: 1, name: '1'};
      const entity2 = {id: 2, name: '2'};
      const entity3 = {id: 3, name: '3'};

      const reducedList = listReducer(
        Object.assign({}, INITIAL_LIST_ENTITY, {
          data: [
            entity1,
            entity2,
            entity3
          ],
          selected: entity2,
          totalCount: 3,
        }),
        {
          type: ListActionBuilder.buildRemoveActionType(TEST_SECTION),
          data: {
            section: TEST_SECTION,
            removed: entity2,
          },
        });

      expect(reducedList).toEqual(
        Object.assign({}, INITIAL_LIST_ENTITY, {
          data: [
            entity1,
            entity3
          ],
          selected: null,
          totalCount: 2,
        })
      );
    });

    it('test2', () => {
      const entity1 = {id: 1, name: '1'};
      const entity2 = {id: 2, name: '2'};
      const entity3 = {id: 3, name: '3'};

      const reducedList = listReducer(
        Object.assign({}, INITIAL_LIST_ENTITY, {
          data: [
            entity1,
            entity2,
            entity3
          ],
          selected: entity2,
          totalCount: 3,
        }),
        {
          type: ListActionBuilder.buildRemoveActionType(TEST_SECTION),
          data: {
            section: TEST_SECTION,
            removed: {id: 2, name: '2'},
          },
        });

      expect(reducedList).toEqual(
        Object.assign({}, INITIAL_LIST_ENTITY, {
          data: [
            entity1,
            entity3
          ],
          selected: null,
          totalCount: 2,
        })
      );
    });

    it('test3', () => {
      const entity1 = {id: 1, name: '1'};
      const entity2 = {id: 2, name: '2'};
      const entity3 = {id: 3, name: '3'};

      const reducedList = listReducer(
        Object.assign({}, INITIAL_LIST_ENTITY, {
          data: [
            entity1,
            entity2,
            entity3
          ],
          selected: entity3,
          totalCount: 3,
        }),
        {
          type: ListActionBuilder.buildRemoveActionType(TEST_SECTION),
          data: {
            section: TEST_SECTION,
            removed: entity2,
          },
        });

      expect(reducedList).toEqual(
        Object.assign({}, INITIAL_LIST_ENTITY, {
          data: [
            entity1,
            entity3
          ],
          selected: entity3,
          totalCount: 2,
        })
      );
    });

    it('test4', () => {
      const entity1 = {id: 1, name: '1'};
      const entity2 = {id: 2, name: '2'};
      const entity3 = {id: 3, name: '3'};

      const reducedList = listReducer(
        Object.assign({}, INITIAL_LIST_ENTITY, {
          data: [
            entity1,
            entity2,
            entity3
          ],
          totalCount: 3,
        }),
        {
          type: ListActionBuilder.buildRemoveActionType(TEST_SECTION),
          data: {
            section: TEST_SECTION,
            removed: entity2,
          },
        });

      expect(reducedList).toEqual(
        Object.assign({}, INITIAL_LIST_ENTITY, {
          data: [
            entity1,
            entity3
          ],
          totalCount: 2,
        })
      );
    });
  });
});
