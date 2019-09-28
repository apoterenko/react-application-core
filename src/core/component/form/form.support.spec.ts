import { UNDEF } from '../../definitions.interface';
import { apiEntityFactory } from '../../api';

describe('form.support', () => {

  describe('buildApiEntity', () => {
    it('test1', () => {
      const apiEntity = apiEntityFactory(
        {
          field1: 101,
        },
        UNDEF,
        null,
      );

      expect(apiEntity).toEqual({
        newEntity: true,
        changes: {
          field1: 101,
        },
        merger: {
          field1: 101,
        },
      });
    });

    it('test2', () => {
      const apiEntity = apiEntityFactory(
        {
          field1: 102,
        },
        {
          id: 1,
          field1: 101,
          field2: 'fieldValue2',
        },
        UNDEF,
      );

      expect(apiEntity).toEqual({
        entityId: 1,
        newEntity: false,
        changes: {
          field1: 102,
        },
        merger: {
          id: 1,
          field1: 102,
          field2: 'fieldValue2',
        },
        entity: {
          id: 1,
          field1: 101,
          field2: 'fieldValue2',
        },
      });
    });

    it('test3', () => {
      const apiEntity = apiEntityFactory(
        {
        },
        {
          id: 1,
          field1: 101,
          field2: 'fieldValue2',
        },
        UNDEF
      );

      expect(apiEntity).toEqual({
        entityId: 1,
        newEntity: false,
        changes: {
        },
        merger: {
          id: 1,
          field1: 101,
          field2: 'fieldValue2',
        },
        entity: {
          id: 1,
          field1: 101,
          field2: 'fieldValue2',
        },
      });
    });
  });
});
