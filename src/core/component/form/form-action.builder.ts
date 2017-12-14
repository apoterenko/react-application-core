import { AnyAction } from 'redux';
import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { applySection } from '../../util';
import { AnyT, IKeyValue } from '../../definition.interface';
import {
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_LOCK_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_SUBMIT_FINISHED_ACTION_TYPE,
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
  FormModifyPayloadT,
  IFormFieldModifyPayload,
} from './form.interface';

export class FormActionBuilder {

  public static buildDestroyActionType(section: string): string {
    return `${section}.${FORM_DESTROY_ACTION_TYPE}`;
  }

  public static buildChangeActionType(section: string): string {
    return `${section}.${FORM_CHANGE_ACTION_TYPE}`;
  }

  public static buildResetActionType(section: string): string {
    return `${section}.${FORM_RESET_ACTION_TYPE}`;
  }

  public static buildValidActionType(section: string): string {
    return `${section}.${FORM_VALID_ACTION_TYPE}`;
  }

  public static buildLockActionType(section: string): string {
    return `${section}.${FORM_LOCK_ACTION_TYPE}`;
  }

  public static buildSubmitActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_ACTION_TYPE}`;
  }

  public static buildSubmitDoneActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_DONE_ACTION_TYPE}`;
  }

  public static buildSubmitFinishedActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_FINISHED_ACTION_TYPE}`;
  }

  public static buildSubmitErrorActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_ERROR_ACTION_TYPE}`;
  }

  public static buildSubmitDoneAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildSubmitDoneActionType(section), applySection(section));
  }

  public static buildSubmitFinishedAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildSubmitFinishedActionType(section), applySection(section));
  }

  public static buildLockAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildLockActionType(section), applySection(section));
  }

  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), applySection(section));
  }

  public static buildChangeAction(section: string, data: FormModifyPayloadT): IEffectsAction {
    return EffectsAction.create(this.buildChangeActionType(section), applySection(section, data));
  }

  public static buildChangesSimpleAction(section: string, changes: IKeyValue): AnyAction {
    return {
      type: this.buildChangeActionType(section),
      data: applySection(section, this.buildFieldsChangesPayload(changes)),
    };
  }

  public static buildChangeSimpleAction(section: string, field: string, value?: AnyT): AnyAction {
    return {
      type: this.buildChangeActionType(section),
      data: applySection(section, this.buildChangePayload(field, value)),
    };
  }

  public static buildFieldsChangesPayload(changes: IKeyValue): FormModifyPayloadT {
    return {
      fields: Object.keys(changes).map((fieldName) => this.buildChangePayload(
          fieldName,
          Reflect.get(changes, fieldName)
      )),
    };
  }

  private static buildChangePayload(fieldName: string, fieldValue?: AnyT): IFormFieldModifyPayload {
    return {
      field: fieldName,
      value: fieldValue,
    };
  }
}
