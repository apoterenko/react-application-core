import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { DICTIONARY_LOAD_ACTION_TYPE, DICTIONARIES_DESTROY_ACTION_TYPE } from './dictionaries.interface';

export class DictionariesActionBuilder {
  public static buildLoadActionType(section: string): string {
    return `${section}.${DICTIONARY_LOAD_ACTION_TYPE}`;
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
}
