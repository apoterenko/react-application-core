import { makeEditedListEffectsProxy } from './edited-list-effects.proxy';
import {
  makeErrorEffectsProxy,
  makeFormSubmitErrorEffectsProxy,
  makeListLazyLoadErrorEffectsProxy,
  makeListLoadErrorEffectsProxy,
} from './failed-effects.proxy';
import { makeDestroyedContainerEffectsProxy } from './destroyed-container-effects.proxy';
import { makeLoadedListOnFormValidEffectsProxy } from './loaded-list-on-form-valid-effects.proxy';
import { makePaginatedListEffectsProxy } from './paginated-list-effects.proxy';
import { makeSucceedEditedListEffectsProxy } from './succeed-edited-list-effects.proxy';
import { makeToolbarToolsEffectsProxy } from './toolbar-tools-effects.proxy';
import { makeUntouchedListEffectsProxy } from './untouched-list-effects.proxy';

/**
 * @stable [07.06.2020]
 */
export class EffectsFactories {
  public static readonly destroyedContainerEffectsProxy = makeDestroyedContainerEffectsProxy;
  public static readonly editedListEffectsProxy = makeEditedListEffectsProxy;
  public static readonly errorEffectsProxy = makeErrorEffectsProxy;
  public static readonly formSubmitErrorEffectsProxy = makeFormSubmitErrorEffectsProxy;
  public static readonly listLazyLoadErrorEffectsProxy = makeListLazyLoadErrorEffectsProxy;
  public static readonly listLoadErrorEffectsProxy = makeListLoadErrorEffectsProxy;
  public static readonly loadedListOnFormValidEffectsProxy = makeLoadedListOnFormValidEffectsProxy;
  public static readonly paginatedListEffectsProxy = makePaginatedListEffectsProxy;
  public static readonly succeedEditedListEffectsProxy = makeSucceedEditedListEffectsProxy;
  public static readonly toolbarToolsEffectsProxy = makeToolbarToolsEffectsProxy;
  public static readonly untouchedListEffectsProxy = makeUntouchedListEffectsProxy;
}
