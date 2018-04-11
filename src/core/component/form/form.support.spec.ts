import { buildApiEntity } from './form.support';
import { Operation } from '../../operation';
import { UNDEF } from '../../definitions.interface';

describe('form.support', () => {
  describe('buildApiEntity', () => {
    it('test1', () => {
      const apiEntity = buildApiEntity(
        {
          field1: 101,
        },
        UNDEF,
        '999c2ea8-2d5d-4c18-9b3b-f498ffc9b987',
      );

      expect(apiEntity).toEqual({
        isNew: true,
        changes: {
          field1: 101,
        },
        merger: {
          field1: 101,
        },
        operation: Operation.create('999c2ea8-2d5d-4c18-9b3b-f498ffc9b987'),
      });
    });

    it('test2', () => {
      const apiEntity = buildApiEntity(
        {
          field1: 102,
        },
        {
          id: 1,
          field1: 101,
          field2: 'fieldValue2',
        },
        '999c2ea8-2d5d-4c18-9b3b-f498ffc9b987',
      );

      expect(apiEntity).toEqual({
        id: 1,
        isNew: false,
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
        operation: Operation.create('999c2ea8-2d5d-4c18-9b3b-f498ffc9b987'),
      });
    });

    it('test3', () => {
      const apiEntity = buildApiEntity(
        {
        },
        {
          id: 1,
          field1: 101,
          field2: 'fieldValue2',
        },
        '999c2ea8-2d5d-4c18-9b3b-f498ffc9b987',
      );

      expect(apiEntity).toEqual({
        id: 1,
        isNew: false,
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
        operation: Operation.create('999c2ea8-2d5d-4c18-9b3b-f498ffc9b987'),
      });
    });
  });
});
