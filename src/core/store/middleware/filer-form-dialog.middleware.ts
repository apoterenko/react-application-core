import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/list/list-action.builder';
import { FormActionBuilder } from '../../action';
import { IFilterFormDialogMiddlewareConfig } from './middleware.interface';

/**
 * @stable [11.03.2019]
 * @param {IFilterFormDialogMiddlewareConfig} config
 * @returns {IEffectsAction[]}
 */
export const makeFilterFormDialogClearMiddleware = (config: IFilterFormDialogMiddlewareConfig): IEffectsAction[] =>
  [
    FormActionBuilder.buildResetAction(config.formSection),
    ListActionBuilder.buildLoadAction(config.listSection)
  ];

/**
 * @stable [12.03.2019]
 * @param {IFilterFormDialogMiddlewareConfig} config
 * @returns {IEffectsAction}
 */
export const makeFilterFormDialogResetMiddleware = (config: IFilterFormDialogMiddlewareConfig): IEffectsAction =>
  FormActionBuilder.buildResetAction(config.formSection);

/**
 * @stable [11.03.2019]
 * @param {IFilterFormDialogMiddlewareConfig} config
 * @returns {IEffectsAction}
 */
export const makeFilterFormDialogAcceptMiddleware = (config: IFilterFormDialogMiddlewareConfig): IEffectsAction =>
  ListActionBuilder.buildLoadAction(config.listSection);
