import { IEffectsAction } from 'redux-effects-promise';

import { isDef, isFn } from '../../util';
import { RouterActionBuilder } from '../../router';
import { StackActionBuilder } from '../stack';
import { ISelectedWrapper, IEntity } from '../../definitions.interface';
import { IEditedListMiddlewareConfig } from './middleware.interface';

/**
 * @stable [11.06.2018]
 * @param {IEditedListMiddlewareConfig<TEntity extends IEntity, TApplicationState>} config
 * @returns {IEffectsAction[]}
 */
export const makeSelectEntityMiddleware = <TEntity extends IEntity, TApplicationState>(
  config: IEditedListMiddlewareConfig<TEntity, TApplicationState>): IEffectsAction[] => {
    const isChainExist = isDef(config.action.initialData);
    const payloadWrapper: ISelectedWrapper<TEntity> = config.action.initialData || config.action.data;
    const selected = payloadWrapper.selected;
    return [
      StackActionBuilder.buildLockAction(
        isFn(config.formSection)
          ? (config.formSection as (...args) => string)(selected, config.state, isChainExist)
          : config.formSection as string
      ),
      RouterActionBuilder.buildNavigateAction(
        isFn(config.path)
          ? (config.path as (...args) => string)(selected, config.state, isChainExist)
          : config.path as string
      )
    ];
  };
