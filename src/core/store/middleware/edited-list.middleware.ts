import { IEffectsAction } from 'redux-effects-promise';

import { RouterActionBuilder } from '../../router';
import { StackActionBuilder } from '../stack';
import { ISelectedWrapper, IEntity } from '../../definitions.interface';
import { IEditedListMiddlewareConfig } from './middleware.interface';

/**
 * @stable [03.06.2018]
 * @param {IEditedListMiddlewareConfig<TEntity extends IEntity>} config
 * @returns {IEffectsAction[]}
 */
export const makeSelectEntityMiddleware =
  <TEntity extends IEntity>(config: IEditedListMiddlewareConfig<TEntity>): IEffectsAction[] => {
    const payloadWrapper: ISelectedWrapper<TEntity> = config.action.data;
    const selected = payloadWrapper.selected;
    return [
      StackActionBuilder.buildLockAction(config.formSection),
      RouterActionBuilder.buildNavigateAction(config.path(selected))
    ];
  };
