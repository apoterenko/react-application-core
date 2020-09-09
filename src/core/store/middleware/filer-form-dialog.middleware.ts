import { IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../action';
import { IFilterFormDialogMiddlewareConfigEntity } from '../../definition';
import { ListActionBuilder } from '../../component/list/list-action.builder';
import { SectionUtils } from '../../util';

/**
 * @stable [23.04.2020]
 * @param {IFilterFormDialogMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction[]}
 */
export const makeFilterFormDialogClearMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      FormActionBuilder.buildResetAction(SectionUtils.asFormSection(cfg)),
      ListActionBuilder.buildLoadAction(SectionUtils.asListSection(cfg))
    ];

/**
 * @stable [23.04.2020]
 * @param {IFilterFormDialogMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction}
 */
export const makeFilterFormDialogResetMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction =>
    FormActionBuilder.buildResetAction(SectionUtils.asFormSection(cfg));

/**
 * @stable [09.09.2020]
 * @param cfg
 */
export const makeFilterFormDialogAcceptMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction =>
    ListActionBuilder.buildLoadAction(SectionUtils.asListSection(cfg));
