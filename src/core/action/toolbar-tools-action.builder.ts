import { IEffectsAction } from 'redux-effects-promise';

import { SectionUtils } from '../util';
import {
  TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE,
  TOOLBAR_TOOLS_FILTER_ACTION_TYPE,
  TOOLBAR_TOOLS_REFRESH_ACTION_TYPE,
} from '../definition';

/**
 * @action-builder
 * @stable [08.09.2020]
 */
export class ToolbarToolsActionBuilder {

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDownloadFileActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildRefreshActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${TOOLBAR_TOOLS_REFRESH_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildFilterActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${TOOLBAR_TOOLS_FILTER_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildRefreshPlainAction(section: string): IEffectsAction {
    return {type: this.buildRefreshActionType(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildFilterPlainAction(section: string): IEffectsAction {
    return {type: this.buildFilterActionType(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDownloadFilePlainAction(section: string): IEffectsAction {
    return {type: this.buildDownloadFileActionType(section)};
  }
}
