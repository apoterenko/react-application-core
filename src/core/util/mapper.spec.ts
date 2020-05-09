import { Mappers } from './mapper';

describe('util/mapper', () => {
  describe('entityAsExtendedEntity', () => {
    it('test1', () => {
      const extendedEntity = Mappers.entityAsExtendedEntity({changes: {name: 'name2'}}, {name: 'name1', id: 100});

      expect(extendedEntity).toEqual({
        changes: {name: 'name2'},
        entity: {name: 'name2', id: 100},
        entityId: 100,
        newEntity: false,
        originalEntity: {name: 'name1', id: 100},
      });
    });

    it('test2', () => {
      const extendedEntity = Mappers.entityAsExtendedEntity({changes: {name: 'name2'}}, {name: 'name1'});

      expect(extendedEntity).toEqual({
        changes: {name: 'name2'},
        entity: {name: 'name2'},
        newEntity: true,
        originalEntity: {name: 'name1'},
      });
    });
  });
});
