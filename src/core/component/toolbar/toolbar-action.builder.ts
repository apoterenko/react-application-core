import { toActionPrefix } from '../../util';
import {
  PAGER_NEXT_ACTION_TYPE,
  PAGER_PREVIOUS_ACTION_TYPE,
  PAGER_LAST_ACTION_TYPE,
  PAGER_FIRST_ACTION_TYPE,
} from './page';
import { TOOLBAR_CUSTOM_ACTION_ACTION_TYPE } from './toolbar.interface';

export class ToolbarActionBuilder {

  /**
   * @stable [13.09.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildCustomActionActionType(section: string): string {
    return `${toActionPrefix(section)}.${TOOLBAR_CUSTOM_ACTION_ACTION_TYPE}`;
  }

  public static buildPagerPreviousActionType(section: string): string {
    return `${section}.${PAGER_PREVIOUS_ACTION_TYPE}`;
  }

  public static buildPagerNextActionType(section: string): string {
    return `${section}.${PAGER_NEXT_ACTION_TYPE}`;
  }

  public static buildPagerFirstActionType(section: string): string {
    return `${section}.${PAGER_FIRST_ACTION_TYPE}`;
  }

  public static buildPagerLastActionType(section: string): string {
    return `${section}.${PAGER_LAST_ACTION_TYPE}`;
  }
}
