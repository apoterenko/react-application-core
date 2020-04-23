import {
  FORM_DEFAULT_CHANGE_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
} from '../../definition';
import { formReducer } from './form.reducer';
import { FormActionBuilder } from '../../action';

const TEST_SECTION = 'test';

describe('form.reducer', () => {
  describe(FORM_RESET_ACTION_TYPE, () => {

    // Reset
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
      };
      expect(reducedForm).toEqual(result);
    });
  });

  describe(FORM_DEFAULT_CHANGE_ACTION_TYPE, () => {

    // Reset
    it('test1', () => {
      const reducedForm = formReducer(
        {
          changes: {value1: 1},
          defaultChanges: {name: 'name1'},
          dirty: false,
        },
        FormActionBuilder.buildDefaultChangesPlainAction(TEST_SECTION, {name: 'name2'})
      );

      const result = {
        changes: {value1: 1},
        defaultChanges: {name: 'name2'},
        dirty: true,
      };
      expect(reducedForm).toEqual(result);
    });
  });
});
