import { IEffectsAction } from 'redux-effects-promise';

import { IKeyValue } from 'core/definition.interface';
import { convertError } from 'core/error';
import { toSection } from 'core/store';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_INFO_ACTION_TYPE,
  FORM_RESTORE_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_VALIDATION_ERRORS_ACTION_TYPE,
  INITIAL_FORM_STATE,
  IFormContainerState,
} from 'core/component';

export function formReducer(state: IFormContainerState<IKeyValue> = INITIAL_FORM_STATE,
                            action: IEffectsAction): IFormContainerState<IKeyValue> {
  const section = toSection(action);
  switch (action.type) {
    case `${section}.${FORM_DESTROY_ACTION_TYPE}`:
      return {
          ...INITIAL_FORM_STATE,
      };
    case `${section}.${FORM_RESTORE_ACTION_TYPE}`:
      return Object.keys(action.data.changes || {}).length > 0
        ? {
          dirty: true,
          changes: {
            ...action.data.changes,
          },
        }
        : {
          ...INITIAL_FORM_STATE,
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
