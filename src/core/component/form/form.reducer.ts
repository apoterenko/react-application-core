import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import { isUndef } from '../../util';
import { toSection } from '../../store';
import { convertError } from '../../error';
import { AnyT } from '../../definition.interface';

import {
  INITIAL_APPLICATION_FORM_STATE,
  IApplicationFormState,
} from './form.interface';
import { FormActionBuilder } from './form-action.builder';

export function formReducer(state: IApplicationFormState = INITIAL_APPLICATION_FORM_STATE,
                            action: IEffectsAction): IApplicationFormState {
  const section = toSection(action);
  switch (action.type) {
    case FormActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_APPLICATION_FORM_STATE,
      };
    case FormActionBuilder.buildChangeActionType(section):
      const changes = R.pickBy((value, key) => !isUndef(value), {
        ...state.changes,
        ...(
            Array.isArray(action.data.fields)
                ? R.mergeAll(
                  action.data.fields.map((elem: { field: string, value: AnyT }) => ({[elem.field]: elem.value}))
                )
                : {
                  [action.data.field]: action.data.value,
                }
        ),
      });
      return {
        ...state,
        error: null,
        dirty: Object.keys(changes).length > 0,
        touched: true,
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
        error: convertError(action.error).message,
      };
    case FormActionBuilder.buildSubmitFinishedActionType(section):
      return {
        ...state,
        progress: false,
      };
    case FormActionBuilder.buildResetActionType(section):
    case FormActionBuilder.buildSubmitDoneActionType(section):
      return {
        ...INITIAL_APPLICATION_FORM_STATE,
      };
  }
  return state;
}
