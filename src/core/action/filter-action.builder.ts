import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  applySection,
  toActionPrefix,
} from '../util';
import {
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_APPLY_ACTION_TYPE,
  FILTER_CHANGE_ACTION_TYPE,
  FILTER_DEACTIVATE_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
  IQueryFluxEntity,
} from '../definition';

/**
 * @action-builder
 * @stable [27.04.2020]
 */
export class FilterActionBuilder {

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildApplyActionType(section: string): string {
    return `${toActionPrefix(section)}.${FILTER_APPLY_ACTION_TYPE}`;
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildChangeActionType(section: string): string {
    return `${toActionPrefix(section)}.${FILTER_CHANGE_ACTION_TYPE}`;
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildDeactivateActionType(section: string): string {
    return `${toActionPrefix(section)}.${FILTER_DEACTIVATE_ACTION_TYPE}`;
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildActivateActionType(section: string): string {
    return `${toActionPrefix(section)}.${FILTER_ACTIVATE_ACTION_TYPE}`;
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildDestroyActionType(section: string): string {
    return `${toActionPrefix(section)}.${FILTER_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildApplyPlainAction(section: string): IEffectsAction {
    return {type: this.buildApplyActionType(section), data: applySection(section)};
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildActivatePlainAction(section: string): IEffectsAction {
    return {type: this.buildActivateActionType(section), data: applySection(section)};
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDeactivatePlainAction(section: string): IEffectsAction {
    return {type: this.buildDeactivateActionType(section), data: applySection(section)};
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @param {string} query
   * @returns {IEffectsAction}
   */
  public static buildChangePlainAction(section: string, query: string): IEffectsAction {
    const fluxEntity: IQueryFluxEntity = {query};
    return {type: this.buildChangeActionType(section), data: applySection(section, fluxEntity)};
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyPlainAction(section: string): IEffectsAction {
    return {type: this.buildDestroyActionType(section), data: applySection(section)};
  }

  /**
   * @stable [27.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    const plainAction = this.buildDestroyPlainAction(section);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }
}
