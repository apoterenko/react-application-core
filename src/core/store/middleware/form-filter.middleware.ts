import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder, FormActionBuilder } from '../../component/action.builder';
import {
  IFormFilterSubmitMiddlewareConfig,
  IFormFilterResetMiddlewareConfig,
  IFormFilterClearMiddlewareConfig,
} from './middleware.interface';
import { StackActionBuilder } from '../stack';
import { RouterActionBuilder } from '../../router';

/**
 * @stable [26.08.2018]
 */
export const makeFormFilterSubmitMiddleware = (config: IFormFilterSubmitMiddlewareConfig): IEffectsAction[] =>
  [
    StackActionBuilder.buildLockAction(config.listSection),
    FormActionBuilder.buildSubmitFinishedAction(config.filterSection),
    RouterActionBuilder.buildNavigateBackAction(),
    ListActionBuilder.buildLoadAction(config.listSection)
  ];

/**
 * @stable [26.08.2018]
 */
export const makeFormFilterResetMiddleware = (config: IFormFilterResetMiddlewareConfig): IEffectsAction[] =>
  [
    RouterActionBuilder.buildNavigateBackAction(),
    ListActionBuilder.buildLoadAction(config.listSection)
  ];

/**
 * @stable [26.08.2018]
 */
export const makeFormFilterClearMiddleware = (config: IFormFilterClearMiddlewareConfig): IEffectsAction =>
  ListActionBuilder.buildLoadAction(config.listSection);
