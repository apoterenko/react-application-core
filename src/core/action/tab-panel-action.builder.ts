import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  IActiveValueFluxEntity,
  TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE,
  TAB_PANEL_DESTROY_ACTION_TYPE,
  TAB_PANEL_INACTIVE_VALUE_ACTION_TYPE,
} from '../definition';
import {
  applySection,
  toActionPrefix,
} from '../util';

export class TabPanelActionBuilder {

  /**
   * @stable [12.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildActiveValueActionType(section: string): string {
    return `${toActionPrefix(section)}.${TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [12.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildInactiveValueActionType(section: string): string {
    return `${toActionPrefix(section)}.${TAB_PANEL_INACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [12.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildDestroyActionType(section: string): string {
    return `${toActionPrefix(section)}.${TAB_PANEL_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [12.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyPlainAction(section: string): IEffectsAction {
    return {type: this.buildDestroyActionType(section), data: applySection(section)};
  }

  /**
   * @stable [12.04.2020]
   * @param {string} section
   * @param {IActiveValueFluxEntity} payload
   * @returns {IEffectsAction}
   */
  public static buildActiveValuePlainAction(section: string, payload: IActiveValueFluxEntity): IEffectsAction {
    return {type: this.buildActiveValueActionType(section), data: applySection(section, payload)};
  }

  /**
   * @stable [12.04.2020]
   * @param {string} section
   * @param {IActiveValueFluxEntity} payload
   * @returns {IEffectsAction}
   */
  public static buildInactiveValuePlainAction(section: string, payload: IActiveValueFluxEntity): IEffectsAction {
    return {type: this.buildInactiveValueActionType(section), data: applySection(section, payload)};
  }

  /**
   * @stable [12.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    const plainAction = this.buildDestroyPlainAction(section);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }
}
