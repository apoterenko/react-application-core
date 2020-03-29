import {
  EffectsAction,
  EffectsActionBuilder,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  IChainedMiddlewareConfigEntity,
  IEditedListMiddlewareConfigEntity,
  ISelectedFluxEntity,
} from '../../definition';
import { IEntity } from '../../definitions.interface';
import {
  ListActionBuilder,
} from '../../component/action.builder';
import { makeChainedMiddleware } from './chained.middleware';
import {
  calc,
  defValuesFilter,
  ifNotNilThanValue,
  isObjectNotEmpty,
  notNilValuesArrayFilter,
  orNull,
  selectPreventEffectsFromAction,
  selectPreviousActionFromAction,
  selectPreviousActionTypeFromAction,
  selectSelectedEntityFromAction,
} from '../../util';
import { makeDefaultFormChangesMiddleware } from './default-form-changes.middleware';

/**
 * @stable [27.03.2020]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IChainedMiddlewareConfigEntity<TState, TEntity extends IEntity>}
 */
const asChainedConfigEntity =
  <TEntity extends IEntity, TState>(
    config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IChainedMiddlewareConfigEntity<TState, TEntity> =>
  ({
    action: config.action,
    nextSection: calc(config.formSection, config),
    path: config.path,
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
      makeChainedMiddleware(asChainedConfigEntity(config)),
      (actions) => notNilValuesArrayFilter(...actions, makeDefaultFormChangesMiddleware(config))
    );

/**
 * @stable [27.03.2020]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeSelectEntityMiddleware =
  <TEntity extends IEntity, TState>(config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IEffectsAction[] => {
    const action = config.action;
    const selected = selectSelectedEntityFromAction(action);

    return config.lazyLoading
      ? [
        ListActionBuilder.buildLazyLoadAction(
          calc(config.listSection, config),
          defValuesFilter<ISelectedFluxEntity, ISelectedFluxEntity>({
            selected,
            preventEffects: selectPreventEffectsFromAction(action),
            previousAction: selectPreviousActionFromAction(action),
          })
        )
      ]
      : makeChainedMiddleware({...asChainedConfigEntity(config), payload: selected});
  };

/**
 * @stable [27.03.2020]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {IEffectsAction[]}
 */
export const makeLazyLoadedEntityMiddleware =
  <TEntity extends IEntity, TState>(config: IEditedListMiddlewareConfigEntity<TEntity, TState>): IEffectsAction[] => {
    const action = config.action;
    const result = [
      ...ifNotNilThanValue(
        selectPreviousActionTypeFromAction(action),
        (previousActionType) => [EffectsAction.create(EffectsActionBuilder.buildDoneActionType(previousActionType))],
        []
      ),
      ...makeChainedMiddleware({...asChainedConfigEntity(config), payload: action.data}) || []
    ];
    return orNull(isObjectNotEmpty(result), result);
  };
