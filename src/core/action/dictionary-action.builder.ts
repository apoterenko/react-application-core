import {
  EffectsAction,
  EffectsActionBuilder,
  IEffectsAction,
} from 'redux-effects-promise';

import { IKeyValue } from '../definitions.interface';
import {
  applySection,
  toActionPrefix,
} from '../util';
import {
  $RAC_DICTIONARIES_DESTROY_ACTION_TYPE,
  DICTIONARY_LOAD_ACTION_TYPE,
  DICTIONARY_SET_ACTION_TYPE,
} from '../definition';

export class DictionariesActionBuilder {

  /**
   * @stable [09.10.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadActionType(section: string): string {
    return `${toActionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [05.12.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadDoneActionType(section: string): string {
    return EffectsActionBuilder.buildDoneActionType(`${toActionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`);
  }

  /**
   * @stable [05.12.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadErrorActionType(section: string): string {
    return EffectsActionBuilder.buildErrorActionType(`${toActionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`);
  }

  /**
   * @stable [04.12.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildSetActionType(section: string): string {
    return `${toActionPrefix(section)}.${DICTIONARY_SET_ACTION_TYPE}`;
  }

  /**
   * @stable [05.12.2019]
   * @returns {IEffectsAction}
   */
  public static buildDestroyAllAction(): IEffectsAction {
    return EffectsAction.create($RAC_DICTIONARIES_DESTROY_ACTION_TYPE);
  }

  /**
   * @stable [04.12.2019]
   * @param {string} section
   * @param {TData} data
   * @returns {IEffectsAction}
   */
  public static buildLoadAction<TData = IKeyValue>(section: string, data?: TData): IEffectsAction {
    const plainAction = this.buildLoadPlainAction(section, data);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [11.01.2020]
   * @param {string} section
   * @param {TData} data
   * @returns {IEffectsAction}
   */
  public static buildLoadPlainAction<TData = IKeyValue>(section: string, data?: TData): IEffectsAction {
    return {
      type: this.buildLoadActionType(section),
      data: applySection(section, data),
    };
  }

  /**
   * @stable [04.12.2019]
   * @param {string} section
   * @param {TData[] | TData} data
   * @returns {IEffectsAction}
   */
  public static buildSetAction<TData = IKeyValue>(section: string, data?: TData | TData[]): IEffectsAction {
    return EffectsAction.create(this.buildSetActionType(section), applySection(section, data));
  }
}
