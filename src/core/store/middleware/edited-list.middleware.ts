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
import {
  ConditionUtils,
  FilterUtils,
  SectionUtils,
  Selectors,
} from '../../util';
import { ChainedMiddlewareFactories } from './chained.middleware';
import { DefaultFormChangesMiddlewareFactories } from './default-form-changes.middleware';
import { NullableT } from '../../definitions.interface';

/**
 * @stable [20.01.2021]
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
 * @middleware
 * @stable [20.01.2021]
 *
 * @param config
 */
const makeCreateEntityMiddleware = <TState = {}, TDefaultChanges = {}>(
  config: IEditedListMiddlewareConfigEntity<{}, TState, TDefaultChanges>): IEffectsAction[] =>
  ConditionUtils.ifNotEmptyThanValue(
    FilterUtils.notNilValuesArrayFilter<IEffectsAction>(
      ...ChainedMiddlewareFactories.chainedMiddleware(asChainedConfigEntity(config)) || [],
      DefaultFormChangesMiddlewareFactories.defaultFormChangesMiddleware(config)
    ),
    (actions) => actions
  );

/**
 * @middleware
 * @stable [20.01.2021]
 *
 * @param cfg
 */
const makeSelectEntityMiddleware = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  cfg: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>): IEffectsAction[] => {

  const action = cfg.action;
  const payload = Selectors.selectedEntityFromAction(action);

  return cfg.lazyLoading
    ? [
      ListActionBuilder.buildLazyLoadAction(
        SectionUtils.asListSection(cfg),
        FilterUtils.defValuesFilter<IFluxSelectedEntity, IFluxSelectedEntity>({
          preventEffects: Selectors.preventEffectsFromAction(action),
          previousAction: Selectors.previousActionFromAction(action),
          selected: payload,
        })
      )
    ]
    : ChainedMiddlewareFactories.chainedMiddleware({...asChainedConfigEntity(cfg), payload});
};

/**
 * @middleware
 * @nullable
 * @stable [08.07.2021]
 *
 * @param config
 */
const makeLazyLoadedEntityMiddleware = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  config: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>
): NullableT<IEffectsAction[]> =>
  ConditionUtils.ifNotEmptyThanValue(
    FilterUtils.notNilValuesArrayFilter<IEffectsAction>(
      ...ConditionUtils.ifNotNilThanValue(
        Selectors.previousActionTypeFromAction(config.action),
        (previousActionType) => [
          EffectsAction.create(EffectsActionBuilder.buildDoneActionType(previousActionType))
        ],
        []
      ),
      ...(
        ConditionUtils.ifNotNilThanValue(
          config.action.data, // Because a request may be canceled
          (payload) => (
            ChainedMiddlewareFactories.chainedMiddleware({
              ...asChainedConfigEntity(config),
              payload,
            })
          )
        ) || []
      )
    ),
    (actions) => actions
  );

/**
 * @stable [20.01.2021]
 */
export class EditedListMiddlewareFactories {
  public static readonly createEntityMiddleware = makeCreateEntityMiddleware;
  public static readonly lazyLoadedEntityMiddleware = makeLazyLoadedEntityMiddleware;
  public static readonly selectEntityMiddleware = makeSelectEntityMiddleware;
}
