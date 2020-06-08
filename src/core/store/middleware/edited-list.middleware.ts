import {
  EffectsAction,
  EffectsActionBuilder,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  IChainedMiddlewareConfigEntity,
  IEditedListMiddlewareConfigEntity,
  IFluxSelectedEntity,
} from '../../definition';
import {
  ListActionBuilder,
} from '../../component/action.builder';
import { makeChainedMiddleware } from './chained.middleware';
import {
  ConditionUtils,
  defValuesFilter,
  FilterUtils,
  ObjectUtils,
  Selectors,
  selectSelectedEntityFromAction,
  toFormSection,
  toListSection,
} from '../../util';
import { makeDefaultFormChangesMiddleware } from './default-form-changes.middleware';

/**
 * @stable [03.04.2020]
 * @param {IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>} cfg
 * @returns {IChainedMiddlewareConfigEntity<TState, TPayload>}
 */
const asChainedConfigEntity = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  cfg: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>
): IChainedMiddlewareConfigEntity<TState, TPayload> =>
  ({
    action: cfg.action,
    nextSection: toFormSection(cfg),
    path: cfg.path,
    state: cfg.state,
  });

/**
 * @stable [03.04.2020]
 * @param {IEditedListMiddlewareConfigEntity<TState, TDefaultChanges>} config
 * @returns {IEffectsAction[]}
 */
export const makeCreateEntityMiddleware = <TState = {}, TDefaultChanges = {}>(
  config: IEditedListMiddlewareConfigEntity<{}, TState, TDefaultChanges>): IEffectsAction[] =>
  ConditionUtils.ifNotNilThanValue(
    makeChainedMiddleware(asChainedConfigEntity(config)),
    (actions) => FilterUtils.notNilValuesArrayFilter(...actions, makeDefaultFormChangesMiddleware(config))
  );

/**
 * @stable [03.04.2020]
 * @param {IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>} cfg
 * @returns {IEffectsAction[]}
 */
export const makeSelectEntityMiddleware = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  cfg: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>): IEffectsAction[] => {

  const action = cfg.action;
  const selected = selectSelectedEntityFromAction<TPayload>(action);

  return cfg.lazyLoading
    ? [
      ListActionBuilder.buildLazyLoadAction(
        toListSection(cfg),
        defValuesFilter<IFluxSelectedEntity, IFluxSelectedEntity>({
          selected,
          preventEffects: Selectors.preventEffectsFromAction(action),
          previousAction: Selectors.previousActionFromAction(action),
        })
      )
    ]
    : makeChainedMiddleware({...asChainedConfigEntity(cfg), payload: selected});
};

/**
 * @stable [03.04.2020]
 * @param {IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>} config
 * @returns {IEffectsAction[]}
 */
export const makeLazyLoadedEntityMiddleware = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  config: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>
): IEffectsAction[] => {
  const {action} = config;
  const result = [
    ...ConditionUtils.ifNotNilThanValue(
      Selectors.previousActionTypeFromAction(action),
      (previousActionType) => [EffectsAction.create(EffectsActionBuilder.buildDoneActionType(previousActionType))],
      []
    ),
    ...makeChainedMiddleware({...asChainedConfigEntity(config), payload: action.data}) || []
  ];
  return ConditionUtils.orNull(ObjectUtils.isObjectNotEmpty(result), result);
};
