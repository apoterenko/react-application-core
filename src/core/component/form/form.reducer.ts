import * as ramda from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import { isUndef } from 'core/util';
import { toSection } from 'core/store';
import { AnyT } from 'core/definition.interface';
import { convertError } from 'core/error';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  INITIAL_APPLICATION_FORM_STATE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_SUBMIT_FINISHED_ACTION_TYPE,
  IApplicationFormState,
} from './form.interface';
import { FormActionBuilder } from './form-action.builder';

export function formReducer(state: IApplicationFormState = INITIAL_APPLICATION_FORM_STATE,
                            action: IEffectsAction): IApplicationFormState {
  const section = toSection(action);
  switch (action.type) {
    case FormActionBuilder.buildLockActionType(section):
      return {
        ...state,
        locked: true,
      };
    case `${section}.${FORM_DESTROY_ACTION_TYPE}`:
      return state.locked
          ? {
            ...state,
            locked: false,
          }
          : {
            ...INITIAL_APPLICATION_FORM_STATE,
          };
    case `${section}.${FORM_CHANGE_ACTION_TYPE}`:
      const changes = ramda.pickBy((value: AnyT, key: string) => !isUndef(value), {
        ...state.changes,
        [action.data.field]: action.data.value,
      });
      return {
        ...state,
        error: null,
        dirty: Object.keys(changes).length > 0,
        changes,
      };
    case `${section}.${FORM_VALID_ACTION_TYPE}`:
      return {
        ...state,
        valid: action.data.valid,
      };
    case `${section}.${FORM_SUBMIT_ACTION_TYPE}`:
      return {
        ...state,
        error: null,
        progress: true,
      };
    case `${section}.${FORM_SUBMIT_ERROR_ACTION_TYPE}`:
      return {
        ...state,
        progress: false,
        error: convertError(action.error),
      };
    case `${section}.${FORM_SUBMIT_FINISHED_ACTION_TYPE}`:
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
