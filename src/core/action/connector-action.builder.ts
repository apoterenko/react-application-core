import {
  EffectsActionBuilder,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $RAC_CONNECTED_CONTAINER_DESTROY_ACTION_TYPE,
  $RAC_CONNECTED_CONTAINER_INIT_ACTION_TYPE,
} from '../definition';
import { SectionUtils } from '../util';

export class ConnectorActionBuilder {

  /**
   * @stable [19.12.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildInitPlainAction(section: string): IEffectsAction {
    return {type: this.buildInitActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [19.12.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyPlainAction(section: string): IEffectsAction {
    return {type: this.buildDestroyActionType(section)};
  }

  /**
   * @stable [20.10.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildInitActionType(section: string): string {
    return `${$RAC_CONNECTED_CONTAINER_INIT_ACTION_TYPE}.${section}`;
  }

  /**
   * @stable [25.11.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildInitErrorActionType(section: string): string {
    return EffectsActionBuilder.buildErrorActionType(this.buildInitActionType(section));
  }

  /**
   * @stable [20.10.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildDestroyActionType(section: string): string {
    return `${$RAC_CONNECTED_CONTAINER_DESTROY_ACTION_TYPE}.${section}`;
  }
}
