import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import {
  asErrorMessage,
  defValuesFilter,
  isDef,
  toSection,
} from '../../util';
import {
  IActiveValueFluxEntity,
  IFieldsChangesFluxEntity,
  IGenericEditableEntity,
  INITIAL_FORM_ENTITY,
  IValidFluxEntity,
} from '../../definition';
import { FormActionBuilder } from '../../action';

/**
 * @stable [23.04.2020]
 * @param {IFieldsChangesFluxEntity} payload
 * @returns {{}}
 */
const asChanges = (payload: IFieldsChangesFluxEntity): {} => payload.fields;

/**
 * @stable [24.04.2020]
 * @param changes
 * @param defaultChanges
 * @returns {boolean}
 */
const isDirty = (changes, defaultChanges) => !R.isEmpty(changes) || !R.isEmpty(defaultChanges);

/**
 * @reducer
 * @stable [23.04.2020]
 *
 * @param {IGenericEditableEntity} state
 * @param {IEffectsAction} action
 * @returns {IGenericEditableEntity}
 */
export const formReducer = (state: IGenericEditableEntity = INITIAL_FORM_ENTITY,
                            action: IEffectsAction): IGenericEditableEntity => {
  const section = toSection(action);
  const actionType = action.type;
  const actionData = action.data;
  let defaultChanges;

  switch (actionType) {
    case FormActionBuilder.buildDestroyActionType(section):
      /**
       * @stable [24.04.2020]
       */
      return {
        ...INITIAL_FORM_ENTITY,
      };
    case FormActionBuilder.buildClearActionType(section):
    case FormActionBuilder.buildChangeActionType(section):
      /**
       * @stable [24.04.2020]
       */
      const changes = defValuesFilter({...state.changes, ...asChanges(actionData)});
      return {
        ...state,
        changes,
        dirty: isDirty(changes, state.defaultChanges),
        error: null,
        touched: true,
      };
    case FormActionBuilder.buildDefaultChangeActionType(section):
      /**
       * @stable [23.04.2020]
       */
      defaultChanges = defValuesFilter({...state.defaultChanges, ...asChanges(actionData)});
      return {
        ...state,
        defaultChanges,
        dirty: isDirty(state.changes, defaultChanges),
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
       * @stable [24.04.2020]
       */
      return {
        ...state,
        activeValue: (actionData as IActiveValueFluxEntity).payload,
      };
    case FormActionBuilder.buildProgressActionType(section):
    case FormActionBuilder.buildSubmitActionType(section):
      /**
       * @stable [24.04.2020]
       */
      return {
        ...state,
        error: null,
        progress: true,
      };
    case FormActionBuilder.buildSubmitErrorActionType(section):
      return {
        ...state,
        progress: false,
        error: asErrorMessage(action.error).message,
      };
    case FormActionBuilder.buildSubmitFinishActionType(section):
      /**
       * @stable [24.04.2020]
       */
      return {
        ...state,
        progress: false,
      };
    case FormActionBuilder.buildResetActionType(section):
    case FormActionBuilder.buildSubmitDoneActionType(section):
      /**
       * @stable [23.04.2020]
       */
      defaultChanges = state.defaultChanges;
      const activeValue = state.activeValue;

      return {
        ...INITIAL_FORM_ENTITY,
        ...(
          actionType === FormActionBuilder.buildResetActionType(section)
            ? {
              defaultChanges,
              ...(
                R.isEmpty(defaultChanges) ? {} : {dirty: true}
              ),
            }
            : {}
        ),
        ...(isDef(activeValue) ? {activeValue} : {}),
      };
  }
  return state;
};
