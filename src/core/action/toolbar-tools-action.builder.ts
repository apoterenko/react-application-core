import {
  IEffectsAction,
} from 'redux-effects-promise';

import { toActionPrefix } from '../util';
import {
  TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE,
  TOOLBAR_TOOLS_FILTER_ACTION_TYPE,
  TOOLBAR_TOOLS_REFRESH_ACTION_TYPE,
} from '../definition';

export class ToolbarToolsActionBuilder {

  /**
   * @stable [16.04.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildDownloadFileActionType(section: string): string {
    return `${toActionPrefix(section)}.${TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE}`;
  }

  /**
   * @stable [11.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildRefreshActionType(section: string): string {
    return `${toActionPrefix(section)}.${TOOLBAR_TOOLS_REFRESH_ACTION_TYPE}`;
  }

  /**
   * @stable [11.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildFilterActionType(section: string): string {
    return `${toActionPrefix(section)}.${TOOLBAR_TOOLS_FILTER_ACTION_TYPE}`;
  }

  /**
   * @stable [11.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildRefreshPlainAction(section: string): IEffectsAction {
    return {type: this.buildRefreshActionType(section)};
  }

  /**
   * @stable [11.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildFilterPlainAction(section: string): IEffectsAction {
    return {type: this.buildFilterActionType(section)};
  }

  /**
   * @stable [11.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDownloadFilePlainAction(section: string): IEffectsAction {
    return {type: this.buildDownloadFileActionType(section)};
  }
}
