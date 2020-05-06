import {
  IEffectsAction,
} from 'redux-effects-promise';

import {
  NEXT_PAGE_ACTION_TYPE,
  PREVIOUS_PAGE_ACTION_TYPE,
  LAST_PAGE_ACTION_TYPE,
  FIRST_PAGE_ACTION_TYPE,
} from '../definition';
import {
  applySection,
  toActionPrefix,
} from '../util';

export class PageToolbarActionBuilder {

  /**
   * @stable [06.05.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildNextPageActionType(section: string): string {
    return `${toActionPrefix(section)}.${NEXT_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [06.05.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildPreviousPageActionType(section: string): string {
    return `${toActionPrefix(section)}.${PREVIOUS_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [06.05.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildFirstPageActionType(section: string): string {
    return `${toActionPrefix(section)}.${FIRST_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [06.05.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildLastPageActionType(section: string): string {
    return `${toActionPrefix(section)}.${LAST_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [06.05.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildFirstPagePlainAction(section: string): IEffectsAction {
    return {type: this.buildFirstPageActionType(section), data: applySection(section)};
  }

  /**
   * @stable [06.05.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildLastPagePlainAction(section: string): IEffectsAction {
    return {type: this.buildLastPageActionType(section), data: applySection(section)};
  }

  /**
   * @stable [06.05.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildPreviousPagePlainAction(section: string): IEffectsAction {
    return {type: this.buildPreviousPageActionType(section), data: applySection(section)};
  }

  /**
   * @stable [06.05.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildNextPagePlainAction(section: string): IEffectsAction {
    return {type: this.buildNextPageActionType(section), data: applySection(section)};
  }
}
