import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import {
  TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE,
  TAB_PANEL_DESTROY_ACTION_TYPE
} from './tabpanel.interface';
import { applySection, toActionPrefix } from '../../util';
import { ACTION_PREFIX } from '../../definitions.interface';

export class TabPanelActionBuilder {

  /**
   * @stable [30.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildActivateActionType(section: string): string {
    return `${toActionPrefix(section)}.${TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [30.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildDestroyActionType(section: string): string {
    return `${toActionPrefix(section)}.${TAB_PANEL_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [30.08.2018]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), applySection(section));
  }
}
