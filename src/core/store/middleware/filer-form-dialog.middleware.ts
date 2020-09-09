import { IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../action';
import { IFilterFormDialogMiddlewareConfigEntity } from '../../definition';
import { LoadedListMiddlewareFactories } from './loaded-list.middleware';
import { SectionUtils } from '../../util';

/**
 * @stable [09.09.2020]
 * @param cfg
 */
const makeFilterFormDialogClearMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction[] =>
    [
      FormActionBuilder.buildResetAction(SectionUtils.asFormSection(cfg)),
      LoadedListMiddlewareFactories.loadedListMiddleware(cfg)
    ];

/**
 * @stable [09.09.2020]
 * @param cfg
 */
const makeFilterFormDialogResetMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction =>
    FormActionBuilder.buildResetAction(SectionUtils.asFormSection(cfg));

/**
 * @stable [09.09.2020]
 * @param cfg
 */
const makeFilterFormDialogAcceptMiddleware =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity<TState>): IEffectsAction =>
    LoadedListMiddlewareFactories.loadedListMiddleware(cfg);

/**
 * @stable [09.09.2020]
 */
export class FilterFormDialogMiddlewareFactories {
  public static readonly filterFormDialogAcceptMiddleware = makeFilterFormDialogAcceptMiddleware;
  public static readonly filterFormDialogClearMiddleware = makeFilterFormDialogClearMiddleware;
  public static readonly filterFormDialogResetMiddleware = makeFilterFormDialogResetMiddleware;
}
