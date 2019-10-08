import { IEffectsAction } from 'redux-effects-promise';

import { isFn } from '../../util';
import { RouterActionBuilder } from '../../router';
import { StackActionBuilder } from '../stack';
import { ISelectedWrapper, IEntity } from '../../definitions.interface';
import { IEditedListMiddlewareConfigEntity } from '../../definition';
import { ListActionBuilder } from '../../component/action.builder';

/**
 * @stable [02.07.2018]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeCreateEntityMiddleware = <TEntity extends IEntity, TState>(
  config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IEffectsAction[] => [
  StackActionBuilder.buildLockAction(
    isFn(config.formSection)
      ? (config.formSection as (...args) => string)(null, config.state, config.action)
      : config.formSection as string
  ),
  RouterActionBuilder.buildNavigateAction(
    isFn(config.path)
      ? (config.path as (...args) => string)(null, config.state, config.action)
      : config.path as string
  )
];

/**
 * @stable [06.10.2019]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeSelectEntityMiddleware = <TEntity extends IEntity, TState>(
  config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IEffectsAction[] => {
  const action = config.action;
  const payloadWrapper: ISelectedWrapper<TEntity> = action.initialData || action.data;
  const selected = payloadWrapper.selected;

  return config.lazyLoading
    ? [
      ListActionBuilder.buildLazyLoadAction(config.listSection, {selected})
    ]
    : [
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
