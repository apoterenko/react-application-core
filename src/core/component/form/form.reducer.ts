import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';

import { isDef, toSection, defValuesFilter } from '../../util';
import { convertError } from '../../error';
import { IPayloadWrapper, IKeyValue } from '../../definitions.interface';
import { IFieldChangeEntity, IFieldsChangesEntity } from '../../entities-definitions.interface';
import { IEditableEntity } from '../../definition';
import { INITIAL_APPLICATION_FORM_STATE } from './form.interface';
import { FormActionBuilder } from './form-action.builder';

export function formReducer(state: IEditableEntity = INITIAL_APPLICATION_FORM_STATE,
                            action: IEffectsAction): IEditableEntity {
  const section = toSection(action);
  switch (action.type) {
    case FormActionBuilder.buildDestroyActionType(section):
      return {
        ...INITIAL_APPLICATION_FORM_STATE,
      };
    case FormActionBuilder.buildClearActionType(section):
    case FormActionBuilder.buildChangeActionType(section):
      const fieldChangeEntity: IFieldChangeEntity = action.data;
      const fieldsChangesEntity: IFieldsChangesEntity = action.data;
      const changes = defValuesFilter<IKeyValue, IKeyValue>({
        ...state.changes,
        ...(
          Array.isArray(fieldsChangesEntity.fields)
            ? R.mergeAll<IKeyValue>(fieldsChangesEntity.fields.map((elem) => ({[elem.name]: elem.value})))
            : {[fieldChangeEntity.name]: fieldChangeEntity.value}
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
        error: convertError(action.error).message,
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
      const activeValueState: IEditableEntity = {activeValue: state.activeValue};
      return {
        ...INITIAL_APPLICATION_FORM_STATE,
        ...(isDef(activeValueState.activeValue) ? activeValueState : {}),
      };
  }
  return state;
}
