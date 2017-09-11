import { IEffectsAction } from 'redux-effects-promise';

import { convertError } from 'core/error';
import { toSection } from 'core/store';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_INFO_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_VALIDATION_ERRORS_ACTION_TYPE,
  INITIAL_APPLICATION_FORM_STATE,
  IApplicationFormState,
} from './form.interface';

export function formReducer(state: IApplicationFormState = INITIAL_APPLICATION_FORM_STATE,
                            action: IEffectsAction): IApplicationFormState {
  const section = toSection(action);
  switch (action.type) {
    case `${section}.${FORM_DESTROY_ACTION_TYPE}`:
      return {
          ...INITIAL_APPLICATION_FORM_STATE,
      };
    case `${section}.${FORM_CHANGE_ACTION_TYPE}`:
      return {
        ...state,
        info: null,
        error: null,
        dirty: true,
        changes: {
          ...state.changes,
          [action.data.field]: action.data.value,
        },
      };
    case `${section}.${FORM_VALIDATION_ERRORS_ACTION_TYPE}`:
      return {
        ...state,
        validationErrors: action.data.validationErrors,
      };
    case `${section}.${FORM_VALID_ACTION_TYPE}`:
      return {
        ...state,
        valid: action.data.valid,
      };
    case `${section}.${FORM_SUBMIT_ACTION_TYPE}`:
      return {
        ...state,
        progress: true,
        info: null,
        error: null,
      };
    case `${section}.${FORM_SUBMIT_ERROR_ACTION_TYPE}`:
      return {
        ...state,
        error: convertError(action.error),
        progress: false,
      };
    case `${section}.${FORM_INFO_ACTION_TYPE}`:
      return {
        ...state,
        info: action.data.info,
      };
    case `${section}.${FORM_SUBMIT_DONE_ACTION_TYPE}`:
      return {
        ...state,
        progress: false,
        changes: {},
        dirty: false,
      };
  }
  return state;
}
