import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/list';
import { IFormFilterMiddlewareConfig } from './middleware.interface';
import { StackActionBuilder } from '../stack';
import { FormActionBuilder } from '../../component/form';
import { RouterActionBuilder } from '../../router';

/* @stable - 01.04.2018 */
export const makeFormFilterSubmitMiddleware = (config: IFormFilterMiddlewareConfig): IEffectsAction[] =>
  [
    StackActionBuilder.buildLockAction(config.listSection),
    FormActionBuilder.buildSubmitFinishedAction(config.formFilterSection),
    RouterActionBuilder.buildNavigateAction(config.listRoutePath),
    ListActionBuilder.buildLoadAction(config.listSection)
  ];

/* @stable - 01.04.2018 */
export const makeFormFilterResetMiddleware = (config: IFormFilterMiddlewareConfig): IEffectsAction[] =>
  [
    RouterActionBuilder.buildNavigateAction(config.listRoutePath),
    ListActionBuilder.buildLoadAction(config.listSection)
  ];
