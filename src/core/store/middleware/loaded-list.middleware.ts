import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/action.builder';
import {
  ILoadedListMiddlewareConfigEntity,
  ILoadedListOnFormValidMiddlewareConfigEntity,
  ILoadedListOnTabActivateMiddlewareConfigEntity,
  ILoadedListOnToolbarToolsRefreshConfigEntity,
  IUntouchedListMiddlewareConfigEntity,
} from '../../definition';
import {
  $isValid,
  FilterUtils,
  ifNotEmptyThanValue,
  orNull,
  selectValidFromAction,
  toListSection,
  WrapperUtils,
} from '../../util';
import { makeDefaultFormChangesMiddleware } from './default-form-changes.middleware';

/**
 * @stable [29.03.2020]
 * @param {ILoadedListMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction}
 */
export const makeLoadedListMiddleware = <TState = {}>(cfg: ILoadedListMiddlewareConfigEntity<TState>): IEffectsAction =>
  ListActionBuilder.buildLoadAction(toListSection(cfg));

/**
 * @stable [29.03.2020]
 * @param {ILoadedListOnFormValidMiddlewareConfigEntity<TState>} config
 * @returns {IEffectsAction}
 */
export const makeLoadedListOnFormValidMiddleware =
  <TState = {}>(config: ILoadedListOnFormValidMiddlewareConfigEntity<TState>): IEffectsAction =>
    orNull(
      $isValid(selectValidFromAction(config.action)),
      () => makeLoadedListMiddleware(config)
    );

/**
 * @stable [29.03.2020]
 * @param {ILoadedListOnTabActivateMiddlewareConfigEntity<TState>} config
 * @returns {IEffectsAction}
 */
export const makeLoadedListOnTabActivateMiddleware =
  <TState = {}>(config: ILoadedListOnTabActivateMiddlewareConfigEntity<TState>): IEffectsAction =>
    makeLoadedListMiddleware(config);

/**
 * @stable [11.04.2020]
 * @param {ILoadedListOnToolbarToolsRefreshConfigEntity<TState>} config
 * @returns {IEffectsAction}
 */
export const makeLoadedListOnToolbarToolsRefreshMiddleware =
  <TState = {}>(config: ILoadedListOnToolbarToolsRefreshConfigEntity<TState>): IEffectsAction =>
    makeLoadedListMiddleware(config);

/**
 * @stable [29.03.2020]
 * @param {IUntouchedListMiddlewareConfigEntity<TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeUntouchedListMiddleware =
  <TState = {}>(config: IUntouchedListMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    ifNotEmptyThanValue(
      FilterUtils.notNilValuesArrayFilter(
        makeDefaultFormChangesMiddleware(config),
        orNull(
          !WrapperUtils.isTouched(config.listAccessor(config.state)),
          () => makeLoadedListMiddleware(config)
        )
      ),
      (actions) => actions
    );
