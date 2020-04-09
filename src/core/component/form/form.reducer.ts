import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import {
  defValuesFilter,
  isDef,
  toSection,
} from '../../util';
import { mapErrorObject } from '../../error';
import {
  IKeyValue,
  IPayloadWrapper,
} from '../../definitions.interface';
import {
  IGenericEditableEntity,
  IFieldChangeEntity,
  IFieldsChangesEntity,
  IFormValidEntity,
  INITIAL_FORM_ENTITY,
} from '../../definition';
import { FormActionBuilder } from './form-action.builder';

/**
 * @stable [03.02.2020]
 * @param {IFieldChangeEntity & IFieldsChangesEntity} payload
 * @returns {IKeyValue}
 */
const fromPayload = (payload: IFieldChangeEntity & IFieldsChangesEntity): IKeyValue => {
  const fieldChangeEntity: IFieldChangeEntity = payload;
  const fieldsChangesEntity: IFieldsChangesEntity = payload;
  const fields = fieldsChangesEntity.fields;

  return Array.isArray(fields)
    ? R.mergeAll(fields.map((elem) => ({[elem.name]: elem.value})))
    : {[fieldChangeEntity.name]: fieldChangeEntity.value};
};

export function formReducer(state: IGenericEditableEntity = INITIAL_FORM_ENTITY,
                            action: IEffectsAction): IGenericEditableEntity {
  const section = toSection(action);
  switch (action.type) {
    case FormActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_FORM_ENTITY,
      };
    case FormActionBuilder.buildClearActionType(section):
    case FormActionBuilder.buildChangeActionType(section):
      const changes = defValuesFilter<IKeyValue, IKeyValue>({
        ...state.changes,
        ...fromPayload(action.data),
      });
      return {
        ...state,
        error: null,
        dirty: Object.keys(changes).length > 0,
        touched: true,
        changes,
      };
    case FormActionBuilder.buildDefaultChangeActionType(section):
      const defaultChanges = defValuesFilter<IKeyValue, IKeyValue>({
        ...state.defaultChanges,
        ...fromPayload(action.data),
      });
      return {
        ...state,
        defaultChanges,
      };
    case FormActionBuilder.buildValidActionType(section):
      const formValidEntity: IFormValidEntity = action.data;
      return {
        ...state,
        valid: formValidEntity.valid,
      };
    case FormActionBuilder.buildActiveValueActionType(section):
      /**
       * @stable [14.08.2018]
       */
      const activeValuePayload: IPayloadWrapper<number> = action.data;
      return {
        ...state,
        activeValue: activeValuePayload.payload,
      };
    case FormActionBuilder.buildProgressActionType(section):
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
        error: mapErrorObject(action.error).message,
      };
    case FormActionBuilder.buildSubmitFinishedActionType(section):
      return {
        ...state,
        progress: false,
      };
    case FormActionBuilder.buildResetActionType(section):
    case FormActionBuilder.buildSubmitDoneActionType(section):
      /**
       * @stable [14.08.2018]
       */
      const activeValueState: IGenericEditableEntity = {activeValue: state.activeValue};
      return {
        ...INITIAL_FORM_ENTITY,
        ...(isDef(activeValueState.activeValue) ? activeValueState : {}),
      };
  }
  return state;
}
