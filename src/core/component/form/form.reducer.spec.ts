import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DEFAULT_CHANGE_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
} from '../../definition';
import { formReducer } from './form.reducer';
import { FormActionBuilder } from '../../action';

const TEST_SECTION = 'test';

describe('form.reducer', () => {
  describe(FORM_RESET_ACTION_TYPE, () => {
    it('test1', () => {
      const reducedForm = formReducer(
        {
          activeValue: 1,
          changes: {test1: 'test1'},
          defaultChanges: {initialValue: 1},
          dirty: true,
          touched: true,
          valid: true,
        },
        FormActionBuilder.buildResetPlainAction(TEST_SECTION)
      );

      const result = {
        activeValue: 1,
        changes: {},
        defaultChanges: {initialValue: 1},
        dirty: true,
      };
      expect(reducedForm).toEqual(result);
    });

    it('test2', () => {
      const reducedForm = formReducer(
        {
          activeValue: 1,
          changes: {test1: 'test1'},
          defaultChanges: {},
          dirty: true,
          touched: true,
          valid: true,
        },
        FormActionBuilder.buildResetPlainAction(TEST_SECTION)
      );

      const result = {
        activeValue: 1,
        changes: {},
        defaultChanges: {},
      };
      expect(reducedForm).toEqual(result);
    });
  });

  describe(FORM_DEFAULT_CHANGE_ACTION_TYPE, () => {
    it('test1', () => {
      const reducedForm = formReducer(
        {
          changes: {param1: 1},
          defaultChanges: {value1: 100, name: 'name1'},
          dirty: true,
        },
        FormActionBuilder.buildDefaultChangesPlainAction(TEST_SECTION, {name: 'name2'})
      );

      const result = {
        changes: {param1: 1},
        defaultChanges: {value1: 100, name: 'name2'},
        dirty: true,
      };
      expect(reducedForm).toEqual(result);
    });

    it('test2', () => {
      const reducedForm = formReducer(
        {
          changes: {},
          defaultChanges: {},
        },
        FormActionBuilder.buildDefaultChangesPlainAction(TEST_SECTION, {name: 'name2'})
      );

      const result = {
        changes: {},
        defaultChanges: {name: 'name2'},
        dirty: true,
      };
      expect(reducedForm).toEqual(result);
    });
  });

  describe(FORM_CHANGE_ACTION_TYPE, () => {
    it('test1', () => {
      const reducedForm = formReducer(
        {
          changes: {value1: 100},
          defaultChanges: {name: 'name1'},
          dirty: true,
        },
        FormActionBuilder.buildChangesPlainAction(TEST_SECTION, {name: 'name2'})
      );

      const result = {
        changes: {value1: 100, name: 'name2'},
        defaultChanges: {name: 'name1'},
        dirty: true,
        error: null,
        touched: true,
      };
      expect(reducedForm).toEqual(result);
    });

    it('test2', () => {
      const reducedForm = formReducer(
        {
          changes: {},
          defaultChanges: {},
        },
        FormActionBuilder.buildChangesPlainAction(TEST_SECTION, {name: 'name2'})
      );

      const result = {
        changes: {name: 'name2'},
        defaultChanges: {},
        dirty: true,
        error: null,
        touched: true,
      };
      expect(reducedForm).toEqual(result);
    });
  });
});
