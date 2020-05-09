import {
  EffectsAction,
  EffectsActionBuilder,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  applySection,
  toActionPrefix,
} from '../util';
import {
  DICTIONARY_DESTROY_ACTION_TYPE,
  DICTIONARY_LOAD_ACTION_TYPE,
  DICTIONARY_SET_ACTION_TYPE,
} from '../definition';

/**
 * @action-builder
 * @stable [09.05.2020]
 */
export class DictionariesActionBuilder {

  /**
   * @stable [09.05.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadActionType(section: string): string {
    return `${toActionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [09.05.2020]
   * @returns {string}
   */
  public static buildDestroyActionType(): string {
    return `${toActionPrefix('all')}.${DICTIONARY_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [09.05.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadDoneActionType(section: string): string {
    return EffectsActionBuilder.buildDoneActionType(`${toActionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`);
  }

  /**
   * @stable [09.05.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadErrorActionType(section: string): string {
    return EffectsActionBuilder.buildErrorActionType(`${toActionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`);
  }

  /**
   * @stable [09.05.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildSetActionType(section: string): string {
    return `${toActionPrefix(section)}.${DICTIONARY_SET_ACTION_TYPE}`;
  }

  /**
   * @stable [09.05.2020]
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(): IEffectsAction {
    return EffectsAction.create(DictionariesActionBuilder.buildDestroyActionType());
  }

  /**
   * @stable [09.05.2020]
   * @param {string} section
   * @param {TData} data
   * @returns {IEffectsAction}
   */
  public static buildLoadAction<TData = {}>(section: string, data?: TData): IEffectsAction {
    const plainAction = this.buildLoadPlainAction(section, data);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [09.05.2020]
   * @param {string} section
   * @param {TData[] | TData} data
   * @returns {IEffectsAction}
   */
  public static buildSetAction<TData = {}>(section: string, data?: TData | TData[]): IEffectsAction {
    const plainAction = this.buildSetPlainAction(section, data);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [30.03.2020]
   * @param {string} section
   * @param {TData} data
   * @returns {IEffectsAction}
   */
  public static buildLoadPlainAction<TData = {}>(section: string, data?: TData): IEffectsAction {
    return {
      type: this.buildLoadActionType(section),
      data: applySection(section, data),
    };
  }

  /**
   * @stable [09.05.2020]
   * @param {string} section
   * @param {TData[] | TData} data
   * @returns {IEffectsAction}
   */
  public static buildSetPlainAction<TData = {}>(section: string, data?: TData | TData[]): IEffectsAction {
    return {
      type: this.buildSetActionType(section),
      data: applySection(section, data),
    };
  }
}
