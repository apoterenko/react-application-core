import { IEffectsAction } from 'redux-effects-promise';

import { IListEmptyMessageActionFormFilterMiddlewareConfig } from './middleware.interface';
import { StackActionBuilder } from '../stack';
import { RouterActionBuilder } from '../../router';
import { FilterActionBuilder } from '../../component/filter';

/**
 * @stable [06.07.2018]
 */
export const makeListEmptyMessageActionMiddleware =
  (config: IListEmptyMessageActionFormFilterMiddlewareConfig): IEffectsAction[] =>
    config.activateQueryFilter
      ? [
        FilterActionBuilder.buildActivateAction(config.listSection)
      ]
      : [
        StackActionBuilder.buildLockAction(config.listSection),
        RouterActionBuilder.buildNavigateAction(config.filterRoutePath)
      ];
