import {
  IEffectsAction,
} from 'redux-effects-promise';

import {
  FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE,
  FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE,
  FILTER_FORM_DIALOG_RESET_ACTION_TYPE,
} from '../definition';
import {
  toActionPrefix,
  applySection
} from '../util';

export class FilterFormDialogActionBuilder {

  /**
   * @stable [12.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildResetActionType(section: string): string {
    return `${toActionPrefix(section)}.${FILTER_FORM_DIALOG_RESET_ACTION_TYPE}`;
  }

  /**
   * @stable [10.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildAcceptActionType(section: string): string {
    return `${toActionPrefix(section)}.${FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE}`;
  }

  /**
   * @stable [10.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildClearActionType(section: string): string {
    return `${toActionPrefix(section)}.${FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE}`;
  }

  /**
   * @stable [23.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildResetPlainAction(section: string): IEffectsAction {
    return {type: this.buildResetActionType(section), data: applySection(section)};
  }

  /**
   * @stable [23.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildAcceptPlainAction(section: string): IEffectsAction {
    return {type: this.buildAcceptActionType(section), data: applySection(section)};
  }

  /**
   * @stable [23.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildClearPlainAction(section: string): IEffectsAction {
    return {type: this.buildClearActionType(section), data: applySection(section)};
  }
}
