import { ACTION_PREFIX } from '../../definitions.interface';
import {
  TOOLBAR_TOOLS_FILTER_ACTION_TYPE,
  TOOLBAR_TOOLS_REFRESH_ACTION_TYPE,
} from './toolbar-tools.interface';

export class ToolbarToolsActionBuilder {

  /**
   * @stable [11.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildRefreshActionType(section: string): string {
    return `${ACTION_PREFIX}${section}.${TOOLBAR_TOOLS_REFRESH_ACTION_TYPE}`;
  }

  /**
   * @stable [11.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildFilterActionType(section: string): string {
    return `${ACTION_PREFIX}${section}.${TOOLBAR_TOOLS_FILTER_ACTION_TYPE}`;
  }
}
