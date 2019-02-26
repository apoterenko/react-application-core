import {
  isFormFieldReadOnly,
  isFormFieldDisabled,
} from './form.support';
import { UNDEF } from '../../definitions.interface';
import { apiEntityFactory } from '../../api';

describe('form.support', () => {
  describe('isFormFieldReadOnly', () => {
    it('test1', () => {
      expect(isFormFieldReadOnly({ readOnly: true }, { readOnly: false })).toEqual(false);
    });

    it('test2', () => {
      expect(isFormFieldReadOnly({ readOnly: false }, { readOnly: true })).toEqual(true);
    });

    it('test3', () => {
      expect(isFormFieldReadOnly({ readOnly: false }, {})).toEqual(false);
    });

    it('test4', () => {
      expect(isFormFieldReadOnly({ readOnly: true }, {})).toEqual(true);
    });

    it('test5', () => {
      expect(isFormFieldReadOnly({}, {})).toEqual(false);
    });
  });

  describe('isFormFieldDisabled', () => {
    it('test1', () => {
      expect(isFormFieldDisabled({ disabled: true, form: {} }, { disabled: false })).toEqual(false);
    });

    it('test2', () => {
      expect(isFormFieldDisabled({ disabled: false, form: {} }, { disabled: true })).toEqual(true);
    });

    it('test3', () => {
      expect(isFormFieldDisabled({ disabled: false, form: {} }, {})).toEqual(false);
    });

    it('test4', () => {
      expect(isFormFieldDisabled({ disabled: true, form: {} }, {})).toEqual(true);
    });

    it('test5', () => {
      expect(isFormFieldDisabled({ form: {} }, {})).toEqual(false);
    });

    it('test6', () => {
      expect(isFormFieldDisabled({ disabled: false, form: { progress: true } }, {})).toEqual(true);
    });

    it('test7', () => {
      expect(isFormFieldDisabled({ disabled: false, form: { progress: true } }, { disabled: false })).toEqual(false);
    });

    it('test8', () => {
      expect(isFormFieldDisabled({ disabled: true, form: { progress: true } }, { disabled: false })).toEqual(false);
    });

    it('test9', () => {
      expect(isFormFieldDisabled({ disabled: false, form: { progress: true } }, { disabled: true })).toEqual(true);
    });
  });

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
