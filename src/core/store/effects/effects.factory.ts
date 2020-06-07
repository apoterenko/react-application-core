import { makeLoadedListOnFormValidEffectsProxy } from './loaded-list-on-form-valid-effects.proxy';
import { makeUntouchedListEffectsProxy } from './untouched-list-effects.proxy';

/**
 * @stable [07.06.2020]
 */
export class EffectsFactories {
  public static readonly loadedListOnFormValidEffectsProxy = makeLoadedListOnFormValidEffectsProxy;
  public static readonly untouchedListEffectsProxy = makeUntouchedListEffectsProxy;
}
