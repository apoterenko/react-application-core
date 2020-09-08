import { IEffectsAction } from 'redux-effects-promise';

import {
  FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE,
  FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE,
  FILTER_FORM_DIALOG_RESET_ACTION_TYPE,
} from '../definition';
import { SectionUtils } from '../util';

/**
 * @action-builder
 * @stable [08.09.2020]
 */
export class FilterFormDialogActionBuilder {

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildResetActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FILTER_FORM_DIALOG_RESET_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildAcceptActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FILTER_FORM_DIALOG_ACCEPT_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildClearActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FILTER_FORM_DIALOG_CLEAR_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildResetPlainAction(section: string): IEffectsAction {
    return {type: this.buildResetActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildAcceptPlainAction(section: string): IEffectsAction {
    return {type: this.buildAcceptActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildClearPlainAction(section: string): IEffectsAction {
    return {type: this.buildClearActionType(section), data: SectionUtils.applySection(section)};
  }
}
