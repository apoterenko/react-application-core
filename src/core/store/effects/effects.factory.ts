import { makeEditedListEffectsProxy } from './edited-list-effects.proxy';
import { makeLoadedListOnFormValidEffectsProxy } from './loaded-list-on-form-valid-effects.proxy';
import { makePaginatedListEffectsProxy } from './paginated-list-effects.proxy';
import { makeUntouchedListEffectsProxy } from './untouched-list-effects.proxy';

/**
 * @stable [07.06.2020]
 */
export class EffectsFactories {
  public static readonly editedListEffectsProxy = makeEditedListEffectsProxy;
  public static readonly loadedListOnFormValidEffectsProxy = makeLoadedListOnFormValidEffectsProxy;
  public static readonly paginatedListEffectsProxy = makePaginatedListEffectsProxy;
  public static readonly untouchedListEffectsProxy = makeUntouchedListEffectsProxy;
}
