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
  IFieldChangeEntity,
  IFieldsChangesEntity,
  IGenericEditableEntity,
  INITIAL_FORM_ENTITY,
  IValidFluxEntity,
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
  const actionData = action.data;

  switch (actionType) {
    case FormActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_FORM_ENTITY,
      };
    case FormActionBuilder.buildClearActionType(section):
    case FormActionBuilder.buildChangeActionType(section):
      const changes = defValuesFilter({
        ...state.changes,
        ...fromPayload(actionData),
      });
      return {
        ...state,
        changes,
        dirty: !R.isEmpty(changes) || !R.isEmpty(state.defaultChanges),
        error: null,
        touched: true,
      };
    case FormActionBuilder.buildDefaultChangeActionType(section):
      /**
       * @stable [23.04.2020]
       */
      const defaultChanges = defValuesFilter({
        ...state.defaultChanges,
        ...fromPayload(actionData),
      });
      return {
        ...state,
        defaultChanges,
        dirty: !R.isEmpty(defaultChanges) || !R.isEmpty(state.changes),
      };
    case FormActionBuilder.buildValidActionType(section):
      /**
       * @stable [23.04.2020]
       */
      return {
        ...state,
        valid: (actionData as IValidFluxEntity).valid,
      };
    case FormActionBuilder.buildActiveValueActionType(section):
      /**
       * @stable [14.08.2018]
       */
      const activeValuePayload: IPayloadWrapper<number> = actionData;
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
