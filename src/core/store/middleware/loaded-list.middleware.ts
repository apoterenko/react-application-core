import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/action.builder';
import {
  ILoadedListMiddlewareConfigEntity,
  ILoadedListOnFormValidMiddlewareConfigEntity,
  ILoadedListOnNavigateToPageMiddlewareConfigEntity,
  ILoadedListOnTabActivateMiddlewareConfigEntity,
  ILoadedListOnToolbarToolsRefreshConfigEntity,
  IUntouchedListMiddlewareConfigEntity,
} from '../../definition';
import {
  ConditionUtils,
  FilterUtils,
  SectionUtils,
  selectValidFromAction,
  ValueUtils,
  WrapperUtils,
} from '../../util';
import { makeDefaultFormChangesMiddleware } from './default-form-changes.middleware';

/**
 * @stable [09.09.2020]
 * @param cfg
 */
export const makeLoadedListMiddleware = <TState = {}>(cfg: ILoadedListMiddlewareConfigEntity<TState>): IEffectsAction =>
  ListActionBuilder.buildLoadAction(SectionUtils.asListSection(cfg));

/**
 * @stable [09.09.2020]
 * @param config
 */
export const makeLoadedListOnFormValidMiddleware =
  <TState = {}>(config: ILoadedListOnFormValidMiddlewareConfigEntity<TState>): IEffectsAction =>
    ConditionUtils.orNull(
      ValueUtils.isValueValid(selectValidFromAction(config.action)),
      () => makeLoadedListMiddleware(config)
    );

/**
 * @stable [09.09.2020]
 * @param config
 */
export const makeLoadedListOnTabActivateMiddleware =
  <TState = {}>(config: ILoadedListOnTabActivateMiddlewareConfigEntity<TState>): IEffectsAction =>
    makeLoadedListMiddleware(config);

/**
 * @stable [09.09.2020]
 * @param config
 */
export const makeLoadedListOnToolbarToolsRefreshMiddleware =
  <TState = {}>(config: ILoadedListOnToolbarToolsRefreshConfigEntity<TState>): IEffectsAction =>
    makeLoadedListMiddleware(config);

/**
 * @stable [09.09.2020]
 * @param config
 */
export const makeUntouchedListMiddleware =
  <TState = {}>(config: IUntouchedListMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    ConditionUtils.ifNotEmptyThanValue(
      FilterUtils.notNilValuesArrayFilter(
        makeDefaultFormChangesMiddleware(config),
        ConditionUtils.orNull(
          !WrapperUtils.isTouched(config.listAccessor(config.state)),
          () => makeLoadedListMiddleware(config)
        )
      ),
      (actions) => actions
    );

/**
 * @stable [09.09.2020]
 * @param cfg
 */
export const makeLoadedListOnNavigateToPreviousPageMiddleware =
  <TState = {}>(cfg: ILoadedListOnNavigateToPageMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      ListActionBuilder.buildPreviousPageAction(SectionUtils.asListSection(cfg)),
      makeLoadedListMiddleware(cfg)
    ];

/**
 * @stable [09.09.2020]
 * @param cfg
 */
export const makeLoadedListOnNavigateToNextPageMiddleware =
  <TState = {}>(cfg: ILoadedListOnNavigateToPageMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      ListActionBuilder.buildNextPageAction(SectionUtils.asListSection(cfg)),
      makeLoadedListMiddleware(cfg)
    ];

/**
 * @stable [09.09.2020]
 * @param cfg
 */
export const makeLoadedListOnNavigateToFirstPageMiddleware =
  <TState = {}>(cfg: ILoadedListOnNavigateToPageMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      ListActionBuilder.buildFirstPageAction(SectionUtils.asListSection(cfg)),
      makeLoadedListMiddleware(cfg)
    ];

/**
 * @stable [09.09.2020]
 * @param cfg
 */
export const makeLoadedListOnNavigateToLastPageMiddleware =
  <TState = {}>(cfg: ILoadedListOnNavigateToPageMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      ListActionBuilder.buildLastPageAction(SectionUtils.asListSection(cfg)),
      makeLoadedListMiddleware(cfg)
    ];
