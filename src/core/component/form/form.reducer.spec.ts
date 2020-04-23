import {
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
});
