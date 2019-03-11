import { ACTION_PREFIX } from '../../../definitions.interface';
import {
  FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE,
  FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE,
  FILTER_FORM_DIALOG_RESET_ACTION_TYPE,
} from './filter-form-dialog.interface';

export class FilterFormDialogActionBuilder {

  /**
   * @stable [12.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildResetActionType(section: string): string {
    return `${ACTION_PREFIX}${section}.${FILTER_FORM_DIALOG_RESET_ACTION_TYPE}`;
  }

  /**
   * @stable [10.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildAcceptActionType(section: string): string {
    return `${ACTION_PREFIX}${section}.${FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE}`;
  }

  /**
   * @stable [10.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildClearActionType(section: string): string {
    return `${ACTION_PREFIX}${section}.${FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE}`;
  }
}
