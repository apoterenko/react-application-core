import { mapExtendedEntity } from './mapper';

describe('util/mapper', () => {
  describe('mapExtendedEntity', () => {
    it('test1', () => {
      const extendedEntity = mapExtendedEntity({name: 'name1', id: 100}, {changes: {name: 'name2'}});

      expect(extendedEntity).toEqual({
        changes: {name: 'name2'},
        entity: {name: 'name2', id: 100},
        entityId: 100,
        newEntity: false,
        originalEntity: {name: 'name1', id: 100},
      });
    });

    it('test2', () => {
      const extendedEntity = mapExtendedEntity({name: 'name1'}, {changes: {name: 'name2'}});

      expect(extendedEntity).toEqual({
        changes: {name: 'name2'},
        entity: {name: 'name2'},
        newEntity: true,
        originalEntity: {name: 'name1'},
      });
    });

    it('test3', () => {
      const extendedEntity = mapExtendedEntity({name: 'name1'}, undefined);

      expect(extendedEntity).toEqual({
        entity: {name: 'name1'},
        newEntity: true,
        originalEntity: {name: 'name1'},
      });
    });

    it('test4', () => {
      const extendedEntity = mapExtendedEntity(null, undefined);

      expect(extendedEntity).toEqual({
        entity: {},
        newEntity: true,
      });
    });

    it('test5', () => {
      const extendedEntity = mapExtendedEntity(undefined, undefined);

      expect(extendedEntity).toEqual({
        entity: {},
        newEntity: true,
      });
    });
  });
});
