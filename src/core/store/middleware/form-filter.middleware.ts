import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/list';
import { IFormFilterMiddlewareConfig } from './middleware.interface';
import { StackActionBuilder } from '../stack';
import { FormActionBuilder } from '../../component/form';
import { RouterActionBuilder } from '../../router';

/**
 * @stable [02.06.2018]
 */
export const makeFormFilterSubmitMiddleware = (config: IFormFilterMiddlewareConfig): IEffectsAction[] =>
  [
    StackActionBuilder.buildLockAction(config.listSection),
    FormActionBuilder.buildSubmitFinishedAction(config.filterSection),
    RouterActionBuilder.buildNavigateAction(config.listRoutePath),
    ListActionBuilder.buildLoadAction(config.listSection)
  ];

/**
 * @stable [02.06.2018]
 */
export const makeFormFilterResetMiddleware = (config: IFormFilterMiddlewareConfig): IEffectsAction[] =>
  [
    RouterActionBuilder.buildNavigateAction(config.listRoutePath),
    ListActionBuilder.buildLoadAction(config.listSection)
  ];
