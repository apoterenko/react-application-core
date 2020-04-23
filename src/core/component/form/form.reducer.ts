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
import { FormActionBuilder } from '../../action';

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

export const formReducer = (state: IGenericEditableEntity = INITIAL_FORM_ENTITY,
                            action: IEffectsAction): IGenericEditableEntity => {
  const section = toSection(action);
  const actionType = action.type;

  switch (actionType) {
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
    case FormActionBuilder.buildSubmitFinishActionType(section):
      return {
        ...state,
        progress: false,
      };
    case FormActionBuilder.buildResetActionType(section):
    case FormActionBuilder.buildSubmitDoneActionType(section):
      /**
       * @stable [23.04.2020]
       */
      return {
        ...INITIAL_FORM_ENTITY,
        ...(
          actionType === FormActionBuilder.buildResetActionType(section)
            ? {defaultChanges: state.defaultChanges}
            : {}
        ),
        ...(
          isDef(state.activeValue)
            ? {activeValue: state.activeValue}
            : {}
        ),
      };
  }
  return state;
};
