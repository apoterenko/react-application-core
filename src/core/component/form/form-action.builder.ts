import { AnyAction } from 'redux';
import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { applySection } from '../../util';
import {
  AnyT,
  IKeyValue,
} from '../../definitions.interface';
import {
  FieldChangeEntityT,
  IFieldChangeEntity,
} from '../../entities-definitions.interface';
import {
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_SUBMIT_FINISHED_ACTION_TYPE,
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
} from './form-reducer.interface';

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

  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), applySection(section));
  }

  public static buildChangeAction(section: string, data: FieldChangeEntityT): IEffectsAction {
    return EffectsAction.create(this.buildChangeActionType(section), applySection(section, data));
  }

  /**
   * @stable - 10.04.2018
   * @param {string} section
   * @param {IKeyValue} changes
   * @returns {IEffectsAction}
   */
  public static buildChangesAction(section: string, changes: IKeyValue): IEffectsAction {
    return EffectsAction.create(
      this.buildChangeActionType(section),
      applySection(section, this.buildChangesPayload(changes))
    );
  }

  /**
   * @stable - 11.04.2018
   * @param {string} section
   * @param {IKeyValue} changes
   * @returns {AnyAction}
   */
  public static buildChangesSimpleAction(section: string, changes: IKeyValue): AnyAction {
    return {
      type: this.buildChangeActionType(section),
      data: applySection(section, this.buildChangesPayload(changes)),
    };
  }

  public static buildChangeSimpleAction(section: string, name: string, value?: AnyT): AnyAction {
    return {
      type: this.buildChangeActionType(section),
      data: applySection(section, { name, value }),
    };
  }

  /**
   * @stable - 10.04.2018
   * @param {IKeyValue} changes
   * @returns {FieldChangeEntityT}
   */
  private static buildChangesPayload(changes: IKeyValue): FieldChangeEntityT {
    return {
      fields: Object
        .keys(changes)
        .map((name): IFieldChangeEntity => ({name, value: Reflect.get(changes, name)})),
    };
  }
}
