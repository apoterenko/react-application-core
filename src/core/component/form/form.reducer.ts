import { IEffectsAction } from 'redux-effects-promise';

import { toSection } from 'core/store';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  INITIAL_APPLICATION_FORM_STATE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
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
        dirty: true,
        changes: {
          ...state.changes,
          [action.data.field]: action.data.value,
        },
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
      };
    case `${section}.${FORM_SUBMIT_ERROR_ACTION_TYPE}`:
      return {
        ...state,
        progress: false,
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
