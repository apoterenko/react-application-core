import { IEffectsAction } from 'redux-effects-promise';

import {
  nvl,
  toFormSection,
  toListSection,
} from '../../util';
import { IFilteredListMiddlewareConfigEntity } from '../../definition';
import { FilterActionBuilder } from '../../action';
import { makeLoadedListMiddleware } from './loaded-list.middleware';

/**
 * @stable [27.04.2020]
 * @middleware
 *
 * @param {IFilteredListMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction[]}
 */
export const makeFilteredListApplyMiddleware =
  <TState = {}>(cfg: IFilteredListMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [makeLoadedListMiddleware(cfg)];

/**
 * @stable [27.04.2020]
 * @middleware
 *
 * @param {IFilteredListMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction[]}
 */
export const makeFilteredListDeactivateMiddleware =
  <TState = {}>(cfg: IFilteredListMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      FilterActionBuilder.buildDestroyAction(nvl(toFormSection(cfg), toListSection(cfg))),
      makeLoadedListMiddleware(cfg)
    ];
