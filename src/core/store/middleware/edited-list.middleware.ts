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
  FilterUtils,
  ObjectUtils,
  SectionUtils,
  Selectors,
} from '../../util';
import { DefaultFormChangesMiddlewareFactories } from './default-form-changes.middleware';

/**
 * @stable [19.09.2020]
 * @param cfg
 */
const asChainedConfigEntity = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  cfg: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>
): IChainedMiddlewareConfigEntity<TState, TPayload> =>
  FilterUtils.defValuesFilter<IChainedMiddlewareConfigEntity<TState, TPayload>, IChainedMiddlewareConfigEntity<TState, TPayload>>({
    action: cfg.action,
    nextSection: SectionUtils.asFormSection(cfg),
    path: cfg.path,
    state: cfg.state,
  });

/**
 * @stable [04.09.2020]
 * @param config
 */
export const makeCreateEntityMiddleware = <TState = {}, TDefaultChanges = {}>(
  config: IEditedListMiddlewareConfigEntity<{}, TState, TDefaultChanges>): IEffectsAction[] =>
  ConditionUtils.ifNotNilThanValue(
    makeChainedMiddleware(asChainedConfigEntity(config)),
    (actions) => FilterUtils.notNilValuesArrayFilter(
      ...actions,
      DefaultFormChangesMiddlewareFactories.defaultFormChangesMiddleware(config)
    )
  );

/**
 * @stable [09.09.2020]
 * @param cfg
 */
const makeSelectEntityMiddleware = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  cfg: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>): IEffectsAction[] => {

  const action = cfg.action;
  const selected = Selectors.selectedEntityFromAction<TPayload>(action);

  return cfg.lazyLoading
    ? [
      ListActionBuilder.buildLazyLoadAction(
        SectionUtils.asListSection(cfg),
        FilterUtils.defValuesFilter<IFluxSelectedEntity, IFluxSelectedEntity>({
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

/**
 * @stable [09.09.2020]
 */
export class EditedListMiddlewareFactories {
  public static readonly selectEntityMiddleware = makeSelectEntityMiddleware;
}
