import { orNull } from '../../util';

import {
  CUSTOM_ACTION_CLONE_ACTION_TYPE,
  CUSTOM_ACTION_DISABLE_ACTION_TYPE,
  CUSTOM_ACTION_DELETE_ACTION_TYPE,
} from './custom-action.interface';
import { ACTION_PREFIX } from '../../definitions.interface';

export class CustomActionBuilder {

  /**
   * @stable [22.10.2018]
   * @param {string} section
   * @param {string} type
   * @returns {string}
   */
  public static buildCustomActionType(section: string, type: string): string {
    return orNull<string>(section, `${ACTION_PREFIX}${section}.${type}`);
  }

  /**
   * @stable [22.10.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildCustomCloneActionType(section: string): string {
    return this.buildCustomActionType(section, CUSTOM_ACTION_CLONE_ACTION_TYPE);
  }

  /**
   * @stable [22.10.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildCustomDisableActionType(section: string): string {
    return this.buildCustomActionType(section, CUSTOM_ACTION_DISABLE_ACTION_TYPE);
  }

  /**
   * @stable [22.10.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildCustomDeleteActionType(section: string): string {
    return this.buildCustomActionType(section, CUSTOM_ACTION_DELETE_ACTION_TYPE);
  }
}
