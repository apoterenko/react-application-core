import * as ramda from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import { isUndef } from '../../util';
import { toSection } from '../../store';
import { AnyT } from '../../definition.interface';
import { convertError } from '../../error';

import {
  INITIAL_APPLICATION_FORM_STATE,
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
    case FormActionBuilder.buildDestroyActionType(section):
      return state.locked
          ? {
            ...state,
            locked: false,
          }
          : {
            ...INITIAL_APPLICATION_FORM_STATE,
          };
    case FormActionBuilder.buildChangeActionType(section):
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
    case FormActionBuilder.buildValidActionType(section):
      return {
        ...state,
        valid: action.data.valid,
      };
    case FormActionBuilder.buildSubmitActionType(section):
      return {
        ...state,
        error: null,
        progress: true,
      };
    case FormActionBuilder.buildSubmitErrorActionType(section):
      return {
        ...state,
        progress: false,
        error: convertError(action.error),
      };
    case FormActionBuilder.buildSubmitFinishedActionType(section):
      return {
        ...state,
        progress: false,
      };
    case FormActionBuilder.buildSubmitDoneActionType(section):
      return {
        ...state,
        progress: false,
        changes: {},
        dirty: false,
      };
  }
  return state;
}
