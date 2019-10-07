import { IEffectsAction } from 'redux-effects-promise';

import { isFn } from '../../util';
import { RouterActionBuilder } from '../../router';
import { StackActionBuilder } from '../stack';
import { ISelectedWrapper, IEntity } from '../../definitions.interface';
import { IEditedListMiddlewareConfig } from './middleware.interface';
import { ListActionBuilder } from '../../component/action.builder';

/**
 * @stable [02.07.2018]
 * @param {IEditedListMiddlewareConfig<TEntity extends IEntity, TApplicationState>} config
 * @returns {IEffectsAction[]}
 */
export const makeCreateEntityMiddleware = <TEntity extends IEntity, TApplicationState>(
  config: IEditedListMiddlewareConfig<TEntity, TApplicationState>): IEffectsAction[] => [
  StackActionBuilder.buildLockAction(config.formSection),
  RouterActionBuilder.buildNavigateAction(
    isFn(config.path)
      ? (config.path as (...args) => string)(null, config.state, config.action)
      : config.path as string
  )
];

/**
 * @stable [06.10.2019]
 * @param {IEditedListMiddlewareConfig<TEntity extends IEntity, TApplicationState>} config
 * @returns {IEffectsAction[]}
 */
export const makeSelectEntityMiddleware = <TEntity extends IEntity, TApplicationState>(
  config: IEditedListMiddlewareConfig<TEntity, TApplicationState>): IEffectsAction[] => {
  const action = config.action;
  const payloadWrapper: ISelectedWrapper<TEntity> = action.initialData || action.data;
  const selected = payloadWrapper.selected;

  return config.lazyLoading
    ? [
      ListActionBuilder.buildLazyLoadAction(config.listSection, {selected})
    ]
    : [
      StackActionBuilder.buildLockAction(config.formSection),
      RouterActionBuilder.buildNavigateAction(
        isFn(config.path)
          ? (config.path as (...args) => string)(selected, config.state, action)
          : config.path as string
      )
    ];
};

/**
 * @stable [27.12.2018]
 * @param {IEditedListMiddlewareConfig<TEntity extends IEntity, TApplicationState>} config
 * @returns {IEffectsAction[]}
 */
export const makeUpdateEntityMiddleware = <TEntity extends IEntity, TApplicationState>(
  config: IEditedListMiddlewareConfig<TEntity, TApplicationState>): IEffectsAction[] => {
  return [
    ListActionBuilder.buildUpdateItemAction(config.listSection, config.entity.id, config.entity),
    RouterActionBuilder.buildRewriteAction(config.path as string)
  ];
};
