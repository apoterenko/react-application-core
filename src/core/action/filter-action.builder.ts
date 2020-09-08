import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import { SectionUtils } from '../util';
import {
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_APPLY_ACTION_TYPE,
  FILTER_CHANGE_ACTION_TYPE,
  FILTER_DEACTIVATE_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
  IFluxQueryEntity,
} from '../definition';

/**
 * @action-builder
 * @stable [08.09.2020]
 */
export class FilterActionBuilder {

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildApplyActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FILTER_APPLY_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildChangeActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FILTER_CHANGE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDeactivateActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FILTER_DEACTIVATE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildActivateActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FILTER_ACTIVATE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDestroyActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${FILTER_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildApplyPlainAction(section: string): IEffectsAction {
    return {type: this.buildApplyActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildActivatePlainAction(section: string): IEffectsAction {
    return {type: this.buildActivateActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildDeactivatePlainAction(section: string): IEffectsAction {
    return {type: this.buildDeactivateActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param query
   */
  public static buildChangePlainAction(section: string, query: string): IEffectsAction {
    const fluxEntity: IFluxQueryEntity = {query};
    return {type: this.buildChangeActionType(section), data: SectionUtils.applySection(section, fluxEntity)};
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
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    const plainAction = this.buildDestroyPlainAction(section);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }
}
