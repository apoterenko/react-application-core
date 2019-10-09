import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { IKeyValue } from '../definitions.interface';
import { applySection } from '../util';
import {
  DICTIONARY_LOAD_ACTION_TYPE,
  DICTIONARIES_DESTROY_ACTION_TYPE,
  DICTIONARY_CLEAR_ACTION_TYPE,
} from './dictionaries.interface';

export class DictionariesActionBuilder {

  /**
   * @stable [09.10.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadActionType(section: string): string {
    return `${section}.${DICTIONARY_LOAD_ACTION_TYPE}`;
  }

  public static buildClearActionType(section: string): string {
    return `${section}.${DICTIONARY_CLEAR_ACTION_TYPE}`;
  }

  public static buildLoadDoneActionType(section: string): string {
    return `${section}.${DICTIONARY_LOAD_ACTION_TYPE}.done`;
  }

  public static buildLoadErrorActionType(section: string): string {
    return `${section}.${DICTIONARY_LOAD_ACTION_TYPE}.error`;
  }

  public static buildDestroyAction(): IEffectsAction {
    return EffectsAction.create(DICTIONARIES_DESTROY_ACTION_TYPE);
  }

  /**
   * @stable [09.10.2019]
   * @param {string} section
   * @param {IKeyValue} data
   * @returns {IEffectsAction}
   */
  public static buildLoadAction(section: string, data?: IKeyValue): IEffectsAction {
    return EffectsAction.create(this.buildLoadActionType(section), applySection(section, data));
  }
}
