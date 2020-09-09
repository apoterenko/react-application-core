import { IEffectsAction } from 'redux-effects-promise';

import { FilterActionBuilder } from '../../action';
import { IFilteredListMiddlewareConfigEntity } from '../../definition';
import { LoadedListMiddlewareFactories } from './loaded-list.middleware';
import { SectionUtils } from '../../util';

/**
 * @stable [09.09.2020]
 * @middleware
 *
 * @param cfg
 */
const makeFilteredListApplyMiddleware =
  <TState = {}>(cfg: IFilteredListMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [LoadedListMiddlewareFactories.loadedListMiddleware(cfg)];

/**
 * @stable [09.09.2020]
 * @middleware
 *
 * @param cfg
 */
const makeFilteredListDeactivateMiddleware =
  <TState = {}>(cfg: IFilteredListMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      FilterActionBuilder.buildDestroyAction(SectionUtils.asFormOrListSection(cfg)),
      LoadedListMiddlewareFactories.loadedListMiddleware(cfg)
    ];

/**
 * @stable [09.09.2020]
 */
export class FilteredListMiddlewareFactories {
  public static readonly filteredListApplyMiddleware = makeFilteredListApplyMiddleware;
  public static readonly filteredListDeactivateMiddleware = makeFilteredListDeactivateMiddleware;
}
