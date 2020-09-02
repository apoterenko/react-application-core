import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import {
  asErrorMessage,
  FilterUtils,
  toSection,
  TypeUtils,
} from '../../util';
import {
  IFluxActiveValueEntity,
  IFluxFieldsChangesEntity,
  IFluxValidEntity,
  INITIAL_REDUX_FORM_ENTITY,
  IReduxFormEntity,
} from '../../definition';
import { FormActionBuilder } from '../../action';

/**
 * @stable [24.04.2020]
 * @param changes
 * @param defaultChanges
 * @returns {boolean}
 */
const isDirty = (changes, defaultChanges) => !R.isEmpty(changes) || !R.isEmpty(defaultChanges);

/**
 * @reducer
 * @stable [08.05.2020]
 *
 * @param {IReduxFormEntity} state
 * @param {IEffectsAction} action
 * @returns {IReduxFormEntity}
 */
export const formReducer = (state: IReduxFormEntity = INITIAL_REDUX_FORM_ENTITY,
                            action: IEffectsAction): IReduxFormEntity => {
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
        ...INITIAL_REDUX_FORM_ENTITY,
      };
    case FormActionBuilder.buildClearActionType(section):
    case FormActionBuilder.buildChangeActionType(section):
      /**
       * @stable [24.04.2020]
       */
      const changes = FilterUtils.defValuesFilter({...state.changes, ...(actionData as IFluxFieldsChangesEntity).fields});
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
      defaultChanges = FilterUtils.defValuesFilter({...state.defaultChanges, ...(actionData as IFluxFieldsChangesEntity).fields});
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
        validateAfterReset: false,
        valid: (actionData as IFluxValidEntity).valid,
      };
    case FormActionBuilder.buildActiveValueActionType(section):
      /**
       * @stable [24.04.2020]
       */
      return {
        ...state,
        activeValue: (actionData as IFluxActiveValueEntity).payload,
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
        ...INITIAL_REDUX_FORM_ENTITY,
        ...(
          actionType === FormActionBuilder.buildResetActionType(section)
            ? {
              defaultChanges,
              validateAfterReset: true,
              ...(
                R.isEmpty(defaultChanges) ? {} : {dirty: true}
              ),
            }
            : {}
        ),
        ...(TypeUtils.isDef(activeValue) ? {activeValue} : {}),
      };
  }
  return state;
};
