import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/list/list-action.builder';
import { IToolbarToolsMiddlewareConfig } from './middleware.interface';

/**
 * @stable [11.03.2019]
 * @param {IToolbarToolsMiddlewareConfig} config
 * @returns {IEffectsAction}
 */
export const makeToolbarToolsRefreshMiddleware = (config: IToolbarToolsMiddlewareConfig): IEffectsAction =>
  ListActionBuilder.buildLoadAction(config.listSection);
