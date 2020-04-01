import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  applySection,
  toActionPrefix,
} from '../../util';
import {
  FORM_ACTIVE_VALUE_ACTION_TYPE,
  FORM_INACTIVE_VALUE_ACTION_TYPE,
  FORM_PROGRESS_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_SUBMIT_FINISHED_ACTION_TYPE,
} from './form.interface';
import {
  FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES,
  FieldChangeEntityT,
  FORM_CHANGE_ACTION_TYPE,
  FORM_CLEAR_ACTION_TYPE,
  FORM_DEFAULT_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  IApiEntity,
  IFieldChangeEntity,
  IFormValidEntity,
} from '../../definition';

// TODO Move
export class FormActionBuilder {

  /**
   * @stable [21.01.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildDestroyActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [26.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildClearActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_CLEAR_ACTION_TYPE}`;
  }

  /**
   * @stable [02.10.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildChangeActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_CHANGE_ACTION_TYPE}`;
  }

  /**
   * @stable [20.12.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildDefaultChangeActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_DEFAULT_CHANGE_ACTION_TYPE}`;
  }

  /**
   * @stable [24.02.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildResetActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_RESET_ACTION_TYPE}`;
  }

  /**
   * @stable [03.04.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildValidActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_VALID_ACTION_TYPE}`;
  }

  /**
   * @stable [14.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildActiveValueActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_ACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [01.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildInactiveValueActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_INACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [02.04.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildSubmitActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_SUBMIT_ACTION_TYPE}`;
  }

  /**
   * @stable [17.04.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildProgressActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_PROGRESS_ACTION_TYPE}`;
  }

  /**
   * @stable [02.04.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildSubmitDoneActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_SUBMIT_DONE_ACTION_TYPE}`;
  }

  /**
   * @stable [03.04.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildSubmitFinishedActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_SUBMIT_FINISHED_ACTION_TYPE}`;
  }

  /**
   * @stable [03.04.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildSubmitErrorActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_SUBMIT_ERROR_ACTION_TYPE}`;
  }

  /**
   * @stable [02.04.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildSubmitDoneAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildSubmitDoneActionType(section), applySection(section));
  }

  /**
   * @stable [24.02.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildResetAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildResetActionType(section), applySection(section));
  }

  /**
   * @stable [17.04.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildProgressAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildProgressActionType(section), applySection(section));
  }

  /**
   * @stable [03.02.2020]
   * @param {string} section
   * @param {boolean} valid
   * @returns {IEffectsAction}
   */
  public static buildValidAction(section: string, valid: boolean): IEffectsAction {
    const plainAction = this.buildValidPlainAction(section, valid);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [01.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildSubmitFinishedAction(section: string): IEffectsAction {
    const plainAction = this.buildSubmitFinishedPlainAction(section);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [21.01.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), applySection(section));
  }

  /**
   * @stable [03.02.2020]
   * @param {string} section
   * @param {string} fieldName
   * @returns {IEffectsAction}
   */
  public static buildClearAction(section: string, fieldName: string): IEffectsAction {
    const plainAction = this.buildClearPlainAction(section, fieldName);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [01.04.2020]
   * @param {string} section
   * @param {TData} changes
   * @returns {IEffectsAction}
   */
  public static buildChangesAction<TData = {}>(section: string, changes: TData): IEffectsAction {
    const plainAction = this.buildChangesPlainAction(section, changes);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [01.04.2020]
   * @param {string} section
   * @param {TData} changes
   * @returns {IEffectsAction}
   */
  public static buildDefaultChangesAction<TData = {}>(section: string,
                                                      changes: TData): IEffectsAction {
    const plainAction = this.buildDefaultChangesPlainAction(section, changes);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [01.04.2020]
   * @param {string} section
   * @param {string} fieldName
   * @returns {IEffectsAction}
   */
  public static buildClearPlainAction(section: string, fieldName: string): IEffectsAction {
    return {
      type: this.buildClearActionType(section),
      data: applySection(section, this.buildChangesPayload({[fieldName]: FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES})),
    };
  }

  /**
   * @stable [01.04.2020]
   * @param {string} section
   * @param {TData} changes
   * @returns {IEffectsAction}
   */
  public static buildChangesPlainAction<TData = {}>(section: string, changes: TData): IEffectsAction {
    return {
      type: this.buildChangeActionType(section),
      data: applySection(section, this.buildChangesPayload(changes)),
    };
  }

  /**
   * @stable [01.04.2020]
   * @param {string} section
   * @param {TData} changes
   * @returns {IEffectsAction}
   */
  public static buildDefaultChangesPlainAction<TData = {}>(section: string, changes: TData): IEffectsAction {
    return {
      type: this.buildDefaultChangeActionType(section),
      data: applySection(section, this.buildChangesPayload(changes)),
    };
  }

  /**
   * @stable [03.02.2020]
   * @param {string} section
   * @param {FieldChangeEntityT} payload
   * @returns {IEffectsAction}
   */
  public static buildChangePlainAction(section: string, payload: FieldChangeEntityT): IEffectsAction {
    return {type: this.buildChangeActionType(section), data: applySection(section, payload)};
  }

  /**
   * @stable [11.09.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildResetPlainAction(section: string): IEffectsAction {
    return {type: this.buildResetActionType(section), data: applySection(section)};
  }

  /**
   * @stable [01.03.2020]
   * @param {string} section
   * @param {IApiEntity} apiEntity
   * @returns {IEffectsAction}
   */
  public static buildSubmitPlainAction(section: string, apiEntity: IApiEntity): IEffectsAction {
    return {type: this.buildSubmitActionType(section), data: applySection(section, apiEntity)};
  }

  /***
   * @stable [03.02.2020]
   * @param {string} section
   * @param {boolean} valid
   * @returns {IEffectsAction}
   */
  public static buildValidPlainAction(section: string, valid: boolean): IEffectsAction {
    const payload: IFormValidEntity = {valid};
    return {type: this.buildValidActionType(section), data: applySection(section, payload)};
  }

  /**
   * @stable [01.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildSubmitFinishedPlainAction(section: string): IEffectsAction {
    return {type: this.buildSubmitFinishedActionType(section), data: applySection(section)};
  }

  /**
   * @stable [03.02.2020]
   * @param {{}} changes
   * @returns {FieldChangeEntityT}
   */
  private static buildChangesPayload(changes: {}): FieldChangeEntityT {
    return {
      fields: Object
        .keys(changes)
        .map((name): IFieldChangeEntity => ({name, value: Reflect.get(changes, name)})),
    };
  }
}
