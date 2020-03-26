import { IEffectsAction, EffectsAction, EffectsActionBuilder } from 'redux-effects-promise';

import {
  IChainedMiddlewareConfigEntity,
  IEditedListMiddlewareConfigEntity,
  ISelectEntityPayloadEntity,
} from '../../definition';
import { IEntity } from '../../definitions.interface';
import {
  ListActionBuilder,
} from '../../component/action.builder';
import { makeChainedMiddleware } from './chained.middleware';
import {
  defValuesFilter,
  ifNotNilThanValue,
  isObjectNotEmpty,
  orNull,
  selectPreventEffectsFromAction,
  selectPreviousActionFromAction,
  selectPreviousActionTypeFromAction,
  selectSelectedEntityFromAction,
} from '../../util';
import { makeDefaultFormChangesMiddleware } from './default-form-changes.middleware';

/**
 * @stable [20.10.2019]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IChainedMiddlewareConfigEntity<TState, TEntity extends IEntity>}
 */
const toChainedConfigEntity = <TEntity extends IEntity, TState>(
    config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IChainedMiddlewareConfigEntity<TState, TEntity> =>
  ({
    action: config.action,
    nextSection: config.formSection,
    path: config.path,
    payload: null,
    state: config.state,
  });

/**
 * @stable [20.10.2019]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeCreateEntityMiddleware =
  <TEntity extends IEntity, TState>(config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IEffectsAction[] =>
    ifNotNilThanValue(
      makeChainedMiddleware(toChainedConfigEntity(config)),
      (actions) => [...actions, ...makeDefaultFormChangesMiddleware(config)]
    );

/**
 * @stable [19.10.2019]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeSelectEntityMiddleware = <TEntity extends IEntity, TState>(
  config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IEffectsAction[] => {
  const action = config.action;
  const selected = selectSelectedEntityFromAction(action);

  return config.lazyLoading
    ? [
      ListActionBuilder.buildLazyLoadAction(
        config.listSection,
        defValuesFilter<ISelectEntityPayloadEntity, ISelectEntityPayloadEntity>({
          selected,
          preventEffects: selectPreventEffectsFromAction(action),
          previousAction: selectPreviousActionFromAction(action),
        })
      )
    ]
    : makeChainedMiddleware({
        action,
        nextSection: config.formSection,
        path: config.path,
        payload: selected,
        state: config.state,
      });
};

/**
 * @stable [20.10.2019]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeLazyLoadedEntityMiddleware = <TEntity extends IEntity, TState>(
  config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IEffectsAction[] => {
  const action = config.action;
  const result = [
    ...ifNotNilThanValue(
      selectPreviousActionTypeFromAction(action),
      (previousActionType) => [EffectsAction.create(EffectsActionBuilder.buildDoneActionType(previousActionType))],
      []
    ),
    ...ifNotNilThanValue(
      makeChainedMiddleware({
        ...toChainedConfigEntity(config),
        ...defValuesFilter<IChainedMiddlewareConfigEntity<TState>, IChainedMiddlewareConfigEntity<TState>>({
          payload: action.data,
        }),
      }),
      (actions) => actions,
      []
    )
  ];
  return orNull(isObjectNotEmpty(result), result);
};
