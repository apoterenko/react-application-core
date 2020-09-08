import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  IFluxActiveValueEntity,
  TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE,
  TAB_PANEL_DESTROY_ACTION_TYPE,
  TAB_PANEL_INACTIVE_VALUE_ACTION_TYPE,
} from '../definition';
import { SectionUtils } from '../util';

/**
 * @action-builder
 * @stable [08.09.2020]
 */
export class TabPanelActionBuilder {

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildActiveValueActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildInactiveValueActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${TAB_PANEL_INACTIVE_VALUE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDestroyActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${TAB_PANEL_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDestroyPlainAction(section: string): IEffectsAction {
    return {type: this.buildDestroyActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param payload
   */
  public static buildActiveValuePlainAction(section: string, payload: IFluxActiveValueEntity): IEffectsAction {
    return {type: this.buildActiveValueActionType(section), data: SectionUtils.applySection(section, payload)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param payload
   */
  public static buildInactiveValuePlainAction(section: string, payload: IFluxActiveValueEntity): IEffectsAction {
    return {type: this.buildInactiveValueActionType(section), data: SectionUtils.applySection(section, payload)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    const plainAction = this.buildDestroyPlainAction(section);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }
}
