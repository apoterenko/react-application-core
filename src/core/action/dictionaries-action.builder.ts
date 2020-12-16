import {
  EffectsAction,
  EffectsActionBuilder,
  IEffectsAction,
} from 'redux-effects-promise';

import { SectionUtils } from '../util';
import {
  DICTIONARY_DESTROY_ACTION_TYPE,
  DICTIONARY_LOAD_ACTION_TYPE,
  DICTIONARY_SET_ACTION_TYPE,
} from '../definition';

/**
 * @action-builder
 * @stable [08.09.2020]
 */
export class DictionariesActionBuilder {

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildLoadActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   */
  public static buildDestroyActionType(): string {
    return `${SectionUtils.actionPrefix('all')}.${DICTIONARY_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildLoadDoneActionType(section: string): string {
    return EffectsActionBuilder.buildDoneActionType(`${SectionUtils.actionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildLoadErrorActionType(section: string): string {
    return EffectsActionBuilder.buildErrorActionType(`${SectionUtils.actionPrefix(section)}.${DICTIONARY_LOAD_ACTION_TYPE}`);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildSetActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${DICTIONARY_SET_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   */
  public static buildDestroyAction(): IEffectsAction {
    return EffectsAction.create(DictionariesActionBuilder.buildDestroyActionType());
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param data
   */
  public static buildLoadAction<TData = {}>(section: string, data?: TData): IEffectsAction {
    const plainAction = this.buildLoadPlainAction(section, data);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param data
   */
  public static buildSetAction<TData = {}>(section: string, data?: TData | TData[]): IEffectsAction {
    const plainAction = this.buildSetPlainAction(section, data);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param fluxEntity
   */
  public static buildLoadPlainAction<TData = {}>(section: string, fluxEntity?: TData): IEffectsAction {
    return {
      type: this.buildLoadActionType(section),
      data: SectionUtils.applySection(section, fluxEntity),
    };
  }

  /**
   * @stable [08.09.2020]
   * @param section
   * @param data
   */
  public static buildSetPlainAction<TData = {}>(section: string, data?: TData | TData[]): IEffectsAction {
    return {
      type: this.buildSetActionType(section),
      data: SectionUtils.applySection(section, data),
    };
  }
}
