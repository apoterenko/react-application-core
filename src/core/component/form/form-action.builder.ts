import { AnyAction } from 'redux';
import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { applySection, toActionPrefix } from '../../util';
import {
  AnyT,
  IKeyValue,
  UNDEF,
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
  FORM_ACTIVE_VALUE_ACTION_TYPE,
  FORM_CLEAR_ACTION_TYPE,
  FORM_DEACTIVATED_VALUE_ACTION_TYPE,
} from './form.interface';

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

  public static buildValidActionType(section: string): string {
    return `${section}.${FORM_VALID_ACTION_TYPE}`;
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

  /**
   * @stable - 25.04.2018
   * @param {string} section
   * @param {string} name
   * @param {AnyT} value
   * @returns {AnyAction}
   */
  public static buildChangeSimpleAction(section: string, name: string, value?: AnyT): AnyAction {
    return {
      type: this.buildChangeActionType(section),
      data: applySection(section, { name, value }),
    };
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
