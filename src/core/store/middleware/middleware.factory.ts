import { makeChainedMiddleware } from './chained.middleware';
import {
  EditedListMiddlewareFactories,
  makeCreateEntityMiddleware,
  makeLazyLoadedEntityMiddleware,
} from './edited-list.middleware';
import {
  makeLoadedListOnNavigateToFirstPageMiddleware,
  makeLoadedListOnNavigateToLastPageMiddleware,
  makeLoadedListOnNavigateToNextPageMiddleware,
  makeLoadedListOnNavigateToPreviousPageMiddleware,
  makeUntouchedListMiddleware,
} from './loaded-list.middleware';
import { makeSucceedFormMiddleware } from './succeed-form.middleware';
import { FilterFormDialogMiddlewareFactories } from './filer-form-dialog.middleware';
import { FilteredListMiddlewareFactories } from './filtered-list.middleware';
import { DestroyedContainerMiddlewareFactories } from './destroyed-container.middleware';

/**
 * @stable [07.06.2020]
 */
export class MiddlewareFactories {
  public static readonly chainedMiddleware = makeChainedMiddleware;
  public static readonly createEntityMiddleware = makeCreateEntityMiddleware;
  public static readonly destroyedContainerMiddleware = DestroyedContainerMiddlewareFactories.destroyedContainerMiddleware;
  public static readonly filteredListApplyMiddleware = FilteredListMiddlewareFactories.filteredListApplyMiddleware;
  public static readonly filteredListDeactivateMiddleware = FilteredListMiddlewareFactories.filteredListDeactivateMiddleware;
  public static readonly filterFormDialogAcceptMiddleware = FilterFormDialogMiddlewareFactories.filterFormDialogAcceptMiddleware;
  public static readonly filterFormDialogClearMiddleware = FilterFormDialogMiddlewareFactories.filterFormDialogClearMiddleware;
  public static readonly filterFormDialogResetMiddleware = FilterFormDialogMiddlewareFactories.filterFormDialogResetMiddleware;
  public static readonly lazyLoadedEntityMiddleware = makeLazyLoadedEntityMiddleware;
  public static readonly loadedListOnNavigateToFirstPageMiddleware = makeLoadedListOnNavigateToFirstPageMiddleware;
  public static readonly loadedListOnNavigateToLastPageMiddleware = makeLoadedListOnNavigateToLastPageMiddleware;
  public static readonly loadedListOnNavigateToNextPageMiddleware = makeLoadedListOnNavigateToNextPageMiddleware;
  public static readonly loadedListOnNavigateToPreviousPageMiddleware = makeLoadedListOnNavigateToPreviousPageMiddleware;
  public static readonly selectEntityMiddleware = EditedListMiddlewareFactories.selectEntityMiddleware;
  public static readonly succeedFormMiddleware = makeSucceedFormMiddleware;
  public static readonly untouchedListMiddleware = makeUntouchedListMiddleware;
}
