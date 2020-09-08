import {
  IEffectsAction,
} from 'redux-effects-promise';

import {
  FIRST_PAGE_ACTION_TYPE,
  LAST_PAGE_ACTION_TYPE,
  NEXT_PAGE_ACTION_TYPE,
  PREVIOUS_PAGE_ACTION_TYPE,
} from '../definition';
import { SectionUtils } from '../util';

/**
 * @action-builder
 * @stable [08.09.2020]
 */
export class PageToolbarActionBuilder {

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildNextPageActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${NEXT_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildPreviousPageActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${PREVIOUS_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildFirstPageActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FIRST_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildLastPageActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LAST_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildFirstPagePlainAction(section: string): IEffectsAction {
    return {type: this.buildFirstPageActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildLastPagePlainAction(section: string): IEffectsAction {
    return {type: this.buildLastPageActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildPreviousPagePlainAction(section: string): IEffectsAction {
    return {type: this.buildPreviousPageActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildNextPagePlainAction(section: string): IEffectsAction {
    return {type: this.buildNextPageActionType(section), data: SectionUtils.applySection(section)};
  }
}
