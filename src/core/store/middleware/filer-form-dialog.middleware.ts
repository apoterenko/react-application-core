import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/list/list-action.builder';
import { FormActionBuilder } from '../../action';
import { IFilterFormDialogMiddlewareConfigEntity } from '../../definition';
import {
  toFormSection,
  toListSection,
} from '../../util';

/**
 * @stable [23.04.2020]
 * @param {IFilterFormDialogMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction[]}
 */
export const makeFilterFormDialogClearMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      FormActionBuilder.buildResetAction(toFormSection(cfg)),
      ListActionBuilder.buildLoadAction(toListSection(cfg))
    ];

/**
 * @stable [23.04.2020]
 * @param {IFilterFormDialogMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction}
 */
export const makeFilterFormDialogResetMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction =>
    FormActionBuilder.buildResetAction(toFormSection(cfg));

/**
 * @stable [23.04.2020]
 * @param {IFilterFormDialogMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction}
 */
export const makeFilterFormDialogAcceptMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction =>
    ListActionBuilder.buildLoadAction(toListSection(cfg));
