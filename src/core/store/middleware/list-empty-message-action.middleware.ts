import { IEffectsAction } from 'redux-effects-promise';

import { IListEmptyMessageActionFormFilterMiddlewareConfig } from './middleware.interface';
import { StackActionBuilder } from '../stack';
import { RouterActionBuilder } from '../../router';

/**
 * @stable [09.06.2018]
 */
export const makeListEmptyMessageActionFormFilterMiddleware =
  (config: IListEmptyMessageActionFormFilterMiddlewareConfig): IEffectsAction[] =>
  [
    StackActionBuilder.buildLockAction(config.listSection),
    RouterActionBuilder.buildNavigateAction(config.filterRoutePath)
  ];
