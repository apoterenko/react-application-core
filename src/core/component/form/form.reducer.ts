import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import { isDef, toSection } from '../../util';
import { convertError } from '../../error';
import { IDefaultFormEntity, IFieldChangeEntity, IFieldsChangesEntity } from '../../entities-definitions.interface';
import { INITIAL_APPLICATION_FORM_STATE } from './form-reducer.interface';
import { FormActionBuilder } from './form-action.builder';

export function formReducer(state: IDefaultFormEntity = INITIAL_APPLICATION_FORM_STATE,
                            action: IEffectsAction): IDefaultFormEntity {
  const section = toSection(action);
  switch (action.type) {
    case FormActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_APPLICATION_FORM_STATE,
      };
    case FormActionBuilder.buildChangeActionType(section):
      const payloadAsFieldChangeEntity: IFieldChangeEntity = action.data;
      const payloadAsFieldsChangesEntity: IFieldsChangesEntity = action.data;
      const changes = R.pickBy((value) => isDef(value), {
        ...state.changes,
        ...(
            Array.isArray(payloadAsFieldsChangesEntity.fields)
                ? R.mergeAll(
                    payloadAsFieldsChangesEntity.fields
                      .map((elem) => ({[elem.name]: elem.value}))
                )
                : {
                  [payloadAsFieldChangeEntity.name]: payloadAsFieldChangeEntity.value,
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
