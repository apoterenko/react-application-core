import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/action.builder';
import {
  IActionStateEntity,
  ILoadedListMiddlewareConfigEntity,
  ILoadedListOnFormValidMiddlewareConfigEntity,
  ILoadedListOnTabActivateMiddlewareConfigEntity,
  ILoadedListOnToolbarToolsRefreshConfigEntity,
  IRefreshedListMiddlewareConfigEntity,
  IUntouchedListMiddlewareConfigEntity,
  ToolbarToolsEnum,
} from '../../definition';
import {
  $isValid,
  calc,
  defValuesFilter,
  ifNotEmptyThanValue,
  isTouched,
  notNilValuesArrayFilter,
  orNull,
  selectDataPayloadFromAction,
  selectValidFromAction,
} from '../../util';
import { makeDefaultFormChangesMiddleware } from './default-form-changes.middleware';

/**
 * @stable [29.03.2020]
 * @param {ILoadedListMiddlewareConfigEntity<TState>} config
 * @returns {IEffectsAction}
 */
export const makeLoadedListMiddleware =
  <TState = {}>(config: ILoadedListMiddlewareConfigEntity<TState>): IEffectsAction =>
    ListActionBuilder.buildLoadAction(
      calc(
        config.listSection,
        defValuesFilter<IActionStateEntity<TState>, IActionStateEntity<TState>>({action: config.action, state: config.state})
      )
    );

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
      notNilValuesArrayFilter(
        makeDefaultFormChangesMiddleware(config),
        orNull(
          !isTouched(config.listAccessor(config.state)),
          () => makeLoadedListMiddleware(config)
        )
      ),
      (actions) => actions
    );

/**
 * @stable [30.03.2020]
 * @param {IRefreshedListMiddlewareConfigEntity<TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeRefreshedListMiddleware =
  <TState = {}>(config: IRefreshedListMiddlewareConfigEntity<TState>): IEffectsAction[] => {
    const payload = selectDataPayloadFromAction<ToolbarToolsEnum>(config.action);
    switch (payload) {
      case ToolbarToolsEnum.REFRESH:
        return [makeLoadedListMiddleware(config)];
    }
    return null;
  };
