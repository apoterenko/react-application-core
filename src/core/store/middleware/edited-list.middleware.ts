import { IEffectsAction } from 'redux-effects-promise';

import { isFn } from '../../util';
import { RouterActionBuilder } from '../../router';
import { StackActionBuilder } from '../stack';
import { ISelectedWrapper, IEntity } from '../../definitions.interface';
import { IEditedListMiddlewareConfig } from './middleware.interface';
import { ListActionBuilder } from '../../component/list';

/**
 * @stable [02.07.2018]
 * @param {IEditedListMiddlewareConfig<TEntity extends IEntity, TApplicationState>} config
 * @returns {IEffectsAction[]}
 */
export const makeCreateEntityMiddleware = <TEntity extends IEntity, TApplicationState>(
  config: IEditedListMiddlewareConfig<TEntity, TApplicationState>): IEffectsAction[] => {
  const action = config.action;
  return [
    StackActionBuilder.buildLockAction(
      isFn(config.formSection)
        ? (config.formSection as (...args) => string)(null, config.state, action)
        : config.formSection as string
    ),
    RouterActionBuilder.buildNavigateAction(
      isFn(config.path)
        ? (config.path as (...args) => string)(null, config.state, action)
        : config.path as string
    )
  ];
};

/**
 * @stable [02.07.2018]
 * @param {IEditedListMiddlewareConfig<TEntity extends IEntity, TApplicationState>} config
 * @returns {IEffectsAction[]}
 */
export const makeSelectEntityMiddleware = <TEntity extends IEntity, TApplicationState>(
  config: IEditedListMiddlewareConfig<TEntity, TApplicationState>): IEffectsAction[] => {
  const action = config.action;
  const payloadWrapper: ISelectedWrapper<TEntity> = action.initialData || action.data;
  const selected = payloadWrapper.selected;

  if (config.useLazyLoading) {
    return [
      ListActionBuilder.buildLazyLoadAction(config.listSection, {selected})
    ];
  }
  return [
    StackActionBuilder.buildLockAction(
      isFn(config.formSection)
        ? (config.formSection as (...args) => string)(selected, config.state, action)
        : config.formSection as string
    ),
    RouterActionBuilder.buildNavigateAction(
      isFn(config.path)
        ? (config.path as (...args) => string)(selected, config.state, action)
        : config.path as string
    )
  ];
};
