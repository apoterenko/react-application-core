import { AnyAction } from 'redux';
import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { applySection, toActionPrefix } from '../../util';
import {
  AnyT,
  IKeyValue,
  UNDEF,
} from '../../definitions.interface';
import {
  FORM_ACTIVE_VALUE_ACTION_TYPE,
  FORM_CHANGE_ACTION_TYPE,
  FORM_CLEAR_ACTION_TYPE,
  FORM_DEACTIVATED_VALUE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_PROGRESS_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_SUBMIT_FINISHED_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
} from './form.interface';
import {
  FieldChangeEntityT,
  IApiEntity,
  IFieldChangeEntity,
} from '../../definition';

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
   * @stable [02.09.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildDeactivatedValueActionType(section: string): string {
    return `${toActionPrefix(section)}.${FORM_DEACTIVATED_VALUE_ACTION_TYPE}`;
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
   * @stable [03.04.2019]
   * @param {string} section
   * @param {boolean} valid
   * @returns {IEffectsAction}
   */
  public static buildValidAction(section: string, valid: boolean): IEffectsAction {
    return EffectsAction.create(this.buildValidActionType(section), applySection(section, {valid}));
  }

  /**
   * @stable [11.04.2019]
   * @param {string} section
   * @param {IApiEntity<TData>} apiEntity
   * @returns {IEffectsAction}
   */
  public static buildSubmitAction<TData>(section: string, apiEntity: IApiEntity<TData>): IEffectsAction {
    return EffectsAction.create(this.buildSubmitActionType(section), applySection(section, apiEntity));
  }

  public static buildSubmitFinishedAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildSubmitFinishedActionType(section), applySection(section));
  }

  /**
   * @stable [21.01.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), applySection(section));
  }

  public static buildChangeAction(section: string, data: FieldChangeEntityT): IEffectsAction {
    return EffectsAction.create(this.buildChangeActionType(section), applySection(section, data));
  }

  /**
   * @stable [26.08.2018]
   * @param {string} section
   * @param {string} fieldName
   * @returns {IEffectsAction}
   */
  public static buildClearSimpleAction(section: string, fieldName: string): IEffectsAction {
    return {
      type: this.buildClearActionType(section),
      data: applySection(section, this.buildChangesPayload({[fieldName]: UNDEF})),
    };
  }

  /**
   * @stable [18.04.2019]
   * @param {string} section
   * @param {string} fieldName
   * @returns {IEffectsAction}
   */
  public static buildClearAction(section: string, fieldName: string): IEffectsAction {
    const simpleAction = this.buildClearSimpleAction(section, fieldName);
    return EffectsAction.create(simpleAction.type, simpleAction.data);
  }

  /**
   * @stable - 10.04.2018
   * @param {string} section
   * @param {IKeyValue} changes
   * @returns {IEffectsAction}
   */
  public static buildChangesAction<TData extends IKeyValue = IKeyValue>(section: string, changes: TData): IEffectsAction {
    return EffectsAction.create(
      this.buildChangeActionType(section),
      applySection(section, this.buildChangesPayload(changes))
    );
  }

  /**
   * @stable [09.10.2019]
   * @param {string} section
   * @param {TData} changes
   * @returns {AnyAction}
   */
  public static buildChangesPlainAction<TData extends IKeyValue = IKeyValue>(section: string, changes: TData): AnyAction {
    return {
      type: this.buildChangeActionType(section),
      data: applySection(section, this.buildChangesPayload(changes)),
    };
  }

  /**
   * @stable [09.10.2019]
   * @param {string} section
   * @param {string} name
   * @param {AnyT} value
   * @returns {AnyAction}
   */
  public static buildChangePlainAction(section: string, name: string, value?: AnyT): AnyAction {
    const payload: IFieldChangeEntity = {name, value};
    return {type: this.buildChangeActionType(section), data: applySection(section, payload)};
  }

  /**
   * @stable [11.09.2019]
   * @param {string} section
   * @returns {AnyAction}
   */
  public static buildResetPlainAction(section: string): AnyAction {
    return {type: this.buildResetActionType(section), data: applySection(section)};
  }

  /**
   * @stable [26.08.2018]
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
